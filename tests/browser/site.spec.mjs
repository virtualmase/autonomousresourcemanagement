import {test,expect} from '@playwright/test';
for(const width of [375,768,1440]){
  test(`reference is readable and navigable at ${width}px`,async({page})=>{
    await page.setViewportSize({width,height:900});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    for(const route of ['/','/wiki/','/wiki/autonomous-resource-management/','/framework/','/news/','/news/kubernetes-136-resource-allocation/','/editorial-policy/']){
      await page.goto(route);
      await expect(page.locator('h1')).toHaveCount(1);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
      await expect(page.getByRole('navigation',{name:'Main navigation'})).toBeVisible();
    }
    expect(errors).toEqual([]);
  });
}
test('search supports query links, results, no matches, and safe text',async({page})=>{
  await page.goto('/search/?q=autoscaling');
  await expect(page.locator('#search')).toBeEnabled();
  await expect(page.locator('#results')).toContainText('Autoscaling and feedback loops');
  await page.locator('#search').fill('zzzz-no-match');
  await expect(page.getByRole('status')).toContainText('No matches');
  await page.locator('#search').fill('<img src=x onerror=alert(1)>');
  await expect(page.locator('#results img')).toHaveCount(0);
  await page.locator('#search').fill('audit');
  await page.locator('#results').getByRole('link',{name:'Audit trails and decision provenance'}).click();
  await expect(page.locator('h1')).toHaveText('Audit trails and decision provenance');
});
test('content remains usable without JavaScript',async({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false});
  const page=await context.newPage();await page.goto('http://127.0.0.1:4173/wiki/');
  await page.getByRole('link',{name:'Human oversight and decision rights'}).click();
  await expect(page.getByRole('heading',{name:'Oversight needs an operational meaning'})).toBeVisible();
  await context.close();
});
test('keyboard users can skip navigation',async({page})=>{
  await page.goto('/');await page.keyboard.press('Tab');
  await expect(page.getByRole('link',{name:'Skip to content'})).toBeFocused();
  await page.keyboard.press('Enter');expect(page.url()).toContain('#main');
});
