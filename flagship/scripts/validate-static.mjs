/* ARM flagship validator: validates static package integrity, metadata, property boundaries, assets, structured data, and local-only interaction safeguards without making network calls or changing external state. */
import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const origin = "https://autonomousresourcemanagement.xyz";
const routes = [
  ["index.html", "/"],
  ["decision-rights/index.html", "/decision-rights/"],
  ["resource-observability/index.html", "/resource-observability/"],
  ["traceable-records/index.html", "/traceable-records/"],
  ["governed-autonomy/index.html", "/governed-autonomy/"],
  ["accountable-escalation/index.html", "/accountable-escalation/"],
  ["capability-system/index.html", "/capability-system/"],
  ["faq/index.html", "/faq/"]
];
const failures = [];
const notes = [];
const fail = (message) => failures.push(message);
const requireText = (source, test, message) => { if (!test.test(source)) fail(message); };
const localFile = (from, path) => resolve(dirname(from), path.split("?")[0].split("#")[0]);

for (const [routeFile, urlPath] of routes) {
  const absolute = resolve(root, routeFile);
  if (!existsSync(absolute)) { fail(`Missing route source: ${routeFile}`); continue; }
  const html = readFileSync(absolute, "utf8");
  const expectedCanonical = `${origin}${urlPath}`;
  requireText(html, /<title>[^<]{12,}<[\/]{1}title>/i, `${routeFile}: missing meaningful title`);
  requireText(html, /<meta\s+name="description"\s+content="[^"]{40,}"/i, `${routeFile}: missing meaningful description`);
  requireText(html, new RegExp(`<link\\s+rel="canonical"\\s+href="${expectedCanonical.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`, "i"), `${routeFile}: canonical must self-reference ${expectedCanonical}`);
  requireText(html, /<a\s+class="skip-link"\s+href="#main">/i, `${routeFile}: missing skip link`);
  requireText(html, /<main\s+id="main"/i, `${routeFile}: missing main landmark`);
  requireText(html, /<script\s+type="application\/ld\+json">/i, `${routeFile}: missing JSON-LD`);
  if (/(?:vite|react|webpack|next\.js|node_modules)/i.test(html)) fail(`${routeFile}: prohibited build/runtime marker found`);
  if (/rel="canonical"[^>]+https?:\/\/(?!autonomousresourcemanagement\.xyz)/i.test(html)) fail(`${routeFile}: cross-domain canonical found`);

  for (const match of html.matchAll(/<(?:img|script|link)\b[^>]+?(?:src|href)="([^"]+)"/gi)) {
    const assetPath = match[1];
    if (/^(?:https?:|mailto:|tel:|#|data:)/i.test(assetPath)) continue;
    const asset = localFile(absolute, assetPath);
    if (!existsSync(asset) || !statSync(asset).isFile()) fail(`${routeFile}: missing local asset ${assetPath}`);
  }

  for (const match of html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(match[1]); } catch { fail(`${routeFile}: malformed JSON-LD`); }
  }
  notes.push(`✓ ${routeFile} (${urlPath})`);
}

const robots = readFileSync(resolve(root, "robots.txt"), "utf8");
if (!robots.includes(`Sitemap: ${origin}/sitemap.xml`)) fail("robots.txt: missing flagship sitemap declaration");
const sitemap = readFileSync(resolve(root, "sitemap.xml"), "utf8");
for (const [, urlPath] of routes) if (!sitemap.includes(`${origin}${urlPath}`)) fail(`sitemap.xml: missing ${urlPath}`);
const notFound = readFileSync(resolve(root, "404.html"), "utf8");
requireText(notFound, /<meta\s+name="robots"\s+content="noindex"/i, "404.html: must be noindex");

for (const assetName of ["assets/arm-mark.svg", "assets/resource-field.svg", "assets/decision-threshold.svg", "assets/record-chain.svg"]) {
  const asset = resolve(root, assetName);
  if (!existsSync(asset)) { fail(`Missing explanatory asset: ${assetName}`); continue; }
  const svg = readFileSync(asset, "utf8");
  requireText(svg, /<title\b[^>]*>[^<]+<\/title>/i, `${assetName}: missing SVG title`);
  if (assetName !== "assets/arm-mark.svg") requireText(svg, /<desc\b[^>]*>[^<]+<\/desc>/i, `${assetName}: missing SVG description`);
}

const js = readFileSync(resolve(root, "site.js"), "utf8");
if (/(?:fetch\(|XMLHttpRequest|navigator\.sendBeacon|localStorage|sessionStorage|document\.cookie|innerHTML)/.test(js)) fail("site.js: prohibited network, storage, or unsafe DOM pattern found");
requireText(js, /textContent/, "site.js: expected textContent-based result updates are missing");
requireText(js, /aria-pressed/, "site.js: expected accessible verifier state is missing");

if (failures.length) {
  console.error("ARM static validation failed:\n" + failures.map((x) => ` - ${x}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log("ARM static validation passed:\n" + notes.join("\n"));
  console.log(`✓ ${relative(root, resolve(root, "robots.txt"))}, sitemap.xml, 404.html, SVG alternatives, and local-only interaction boundary`);
}
