import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const sourceRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = resolve(process.env.ARM_STATIC_OUTPUT || join(sourceRoot, ".rendered-static"));
const origin = (process.env.ARM_SITE_ORIGIN || "http://localhost:4173").replace(/\/$/, "");
const indexing = process.env.ARM_ALLOW_INDEXING === "true";
const publicNames = new Set(["robots.txt", "sitemap.xml", "site.webmanifest"]);
const publicExtensions = new Set([".html", ".css", ".js", ".svg", ".webp"]);

if (!/^https?:\/\/[^/]+$/i.test(origin)) {
  throw new Error("ARM_SITE_ORIGIN must be an absolute origin without a path, for example https://preview.pages.dev");
}

const deployable = (path) => publicNames.has(path) || publicExtensions.has(extname(path).toLowerCase());

async function copyPublicFiles(directory = sourceRoot) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const absolutePath = join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "scripts" && entry.name !== ".git" && entry.name !== ".rendered-static") {
        await copyPublicFiles(absolutePath);
      }
      continue;
    }

    const relativePath = relative(sourceRoot, absolutePath).split("\\").join("/");
    if (!deployable(relativePath)) continue;

    const destinationPath = join(outputRoot, relativePath);
    await mkdir(dirname(destinationPath), { recursive: true });
    if (!relativePath.endsWith(".html") && relativePath !== "robots.txt" && relativePath !== "sitemap.xml") {
      await cp(absolutePath, destinationPath);
      continue;
    }

    let content = await readFile(absolutePath, "utf8");
    content = content.replaceAll("https://autonomousresourcemanagement.xyz", origin);
    if (relativePath.endsWith(".html") && !indexing) {
      content = content.replace('name="robots" content="index,follow"', 'name="robots" content="noindex,nofollow"');
    }
    if (relativePath === "robots.txt" && !indexing) {
      content = "User-agent: *\nDisallow: /\n";
    }
    await writeFile(destinationPath, content);
  }
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
await copyPublicFiles();
await writeFile(
  join(outputRoot, ".arm-deployment-manifest.json"),
  JSON.stringify({ origin, indexing, source: "flagship", generatedAt: new Date().toISOString() }, null, 2),
);
console.log(JSON.stringify({ outputRoot, origin, indexing }, null, 2));
