import {test,expect} from '@playwright/test';
for(const width of [390,768,1440])test(`navigation and contained board scrolling at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:1000});await page.goto('/');
 await expect(page.getByRole('searchbox')).toBeVisible();
 if(width===390){
 const toggle=page.getByRole('button',{name:'Toggle navigation'});
 await toggle.focus();await page.keyboard.press('Enter');
 const close=page.getByRole('button',{name:'Close navigation'});
 await expect(close).toBeFocused();await expect(toggle).toHaveAttribute('aria-expanded','true');
 await page.keyboard.press('Escape');await expect(toggle).toBeFocused();await expect(toggle).toHaveAttribute('aria-expanded','false');
 await page.keyboard.press('Enter');await close.click();await expect(toggle).toBeFocused();
 await page.keyboard.press('Enter');await page.getByRole('button',{name:/Project board \d/}).click();
 await expect(toggle).toHaveAttribute('aria-expanded','false');
 await page.screenshot({path:'/tmp/kosuke-artifacts/csv-fixed-mobile-closed.png',fullPage:true});
 await toggle.click();await page.screenshot({path:'/tmp/kosuke-artifacts/csv-fixed-mobile-open.png',fullPage:true});await close.click();
 }
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 const board=page.getByRole('region',{name:'Kanban board'});
 await board.evaluate(el=>el.scrollLeft=el.scrollWidth);
 await expect.poll(()=>board.evaluate(el=>el.scrollLeft>0)).toBe(width<1440);
 // Reach Export CSV from the search field with keyboard only.
 await page.getByRole('searchbox').focus();await page.keyboard.press('Tab');
 await expect(page.getByRole('button',{name:'Export CSV',exact:true})).toBeFocused();
 const pending=page.waitForEvent('download');await page.keyboard.press('Enter');expect((await pending).suggestedFilename()).toBe('shiplab-filtered-tasks.csv');
 await page.screenshot({path:`/tmp/kosuke-artifacts/csv-fixed-${width}.png`,fullPage:true});
});
