import {test,expect} from "@playwright/test";
test("create, search, move, and delete a task",async({page})=>{
  await page.goto("/");
  await expect(page.getByRole("heading",{name:"Ship better work."})).toBeVisible();
  await page.getByRole("button",{name:"New task"}).click();
  const modal=page.getByRole("dialog");
  await modal.getByLabel("Task title").fill("Playwright agent demo");
  await modal.getByRole("button",{name:"Create task"}).click();
  const card=page.getByTestId("task-card").filter({hasText:"Playwright agent demo"});
  await expect(card).toBeVisible();
  await page.getByRole("searchbox",{name:"Search tasks"}).fill("playwright AGENT");
  await expect(card).toBeVisible();
  await card.getByLabel("Status").selectOption("Done");
  await expect(card.getByLabel("Status")).toHaveValue("Done");
  page.once("dialog",dialog=>dialog.accept());
  await card.getByRole("button",{name:"Delete task"}).click();
  await expect(card).toHaveCount(0);
});

test('calendar deadline filters and ordering compose with search',async({page,request})=>{
  await page.clock.setFixedTime(new Date('2026-03-07T12:00:00Z'));
  const ids:string[]=[];
  try {
    for(const [title,dueDate] of [['Deadline later','2026-03-13'],['Deadline today','2026-03-07'],['Deadline overdue','2026-03-06'],['Deadline undated',null]]){
      const response=await request.post('/api/tasks',{data:{title,dueDate}});
      expect(response.ok()).toBeTruthy();ids.push((await response.json()).id);
    }
    await page.goto('/');
    await page.getByRole('searchbox').fill('Deadline');
    await page.getByRole('combobox',{name:'Due date',exact:true}).selectOption('Due in next 7 days');
    await expect(page.getByTestId('task-card').locator('h4')).toHaveText(['Deadline today','Deadline later']);
    await page.getByRole('combobox',{name:'Sort by',exact:true}).selectOption('Newest first');
    await expect(page.getByTestId('task-card').locator('h4')).toHaveText(['Deadline today','Deadline later']);
    await page.getByRole('combobox',{name:'Due date',exact:true}).selectOption('Overdue');
    await expect(page.getByTestId('task-card').locator('h4')).toHaveText(['Deadline overdue']);
    await page.getByRole('button',{name:'Clear filters'}).click();
    await expect(page.getByRole('combobox',{name:'Due date',exact:true})).toHaveValue('All');
  } finally {for(const id of ids) await request.delete('/api/tasks/'+id);}
});
