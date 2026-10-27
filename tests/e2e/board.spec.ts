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
