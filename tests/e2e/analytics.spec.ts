import {test,expect} from "@playwright/test";
test("Analytics reconciles the real task dataset",async({page,request})=>{
  const response=await request.get("/api/tasks");
  const tasks=await response.json();
  await page.goto("/");
  await page.getByRole("button",{name:"Analytics",exact:true}).click();
  await expect(page.getByRole("heading",{name:"Analytics",exact:true})).toBeVisible();
  await expect(page.getByTestId("analytics-total")).toHaveText(String(tasks.length));
  const table=page.getByRole("table",{name:"Task counts by current status"});
  for(const status of ["Backlog","In Progress","In Review","Done"]){
    await expect(table.getByRole("row").filter({has:page.getByRole("rowheader",{name:status,exact:true})}).getByRole("cell")).toHaveText(String(tasks.filter((t:{status:string})=>t.status===status).length));
  }
  await expect(page.getByText("Completion:",{exact:false})).toContainText(tasks.length?Math.round(tasks.filter((t:{status:string})=>t.status==="Done").length/tasks.length*100)+"%":"0%");
});
