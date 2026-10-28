import {test,expect} from '@playwright/test';
import {readFile,mkdir} from 'node:fs/promises';
test('downloads precisely the searched, project and deadline filtered sorted tasks',async({page,request})=>{
 const ids:string[]=[];
 await page.clock.setFixedTime(new Date('2026-03-07T12:00:00Z'));
 try{
 for(const [title,project,dueDate] of [['CSV later','Atlas','2026-03-12'],['CSV today','Atlas','2026-03-07'],['CSV excluded','Orbit','2026-03-07'],['CSV overdue','Atlas','2026-03-06']]){
 const r=await request.post('/api/tasks',{data:{title,project,dueDate}});expect(r.ok()).toBeTruthy();ids.push((await r.json()).id);
 }
 await page.goto('/');await page.getByRole('searchbox').fill('CSV');
 await page.getByLabel('Filter by project').selectOption('Atlas');
 await page.getByRole('combobox',{name:'Due date',exact:true}).selectOption('Due in next 7 days');
 await expect(page.getByTestId('task-card').locator('h4')).toHaveText(['CSV today','CSV later']);
 for(const sort of ['Due soonest','Newest first']){
 await page.getByRole('combobox',{name:'Sort by',exact:true}).selectOption(sort);
 const downloadPromise=page.waitForEvent('download');await page.getByRole('button',{name:'Export CSV',exact:true}).click();
 const download=await downloadPromise;expect(download.suggestedFilename()).toBe('shiplab-filtered-tasks.csv');
 const csv=await readFile((await download.path())!,'utf8');
 expect(csv.split('\r\n').slice(1,-1).map(row=>row.split(',')[0])).toEqual(['CSV today','CSV later']);
 await mkdir('/tmp/kosuke-artifacts',{recursive:true});await download.saveAs('/tmp/kosuke-artifacts/filtered-tasks.csv');
 }
 await page.screenshot({path:'/tmp/kosuke-artifacts/csv-desktop.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:'/tmp/kosuke-artifacts/csv-mobile.png',fullPage:true});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 await page.getByRole('searchbox').fill('no-matches-xyz');
 const pending=page.waitForEvent('download');await page.getByRole('button',{name:'Export CSV',exact:true}).click();
 expect(await readFile((await (await pending).path())!,'utf8')).toBe('Title,Description,Project,Assignee,Status,Priority,Due date,Created at\r\n');
 await expect(page.getByRole('status')).toContainText('headers only');
 }finally{for(const id of ids)await request.delete('/api/tasks/'+id);}
});
