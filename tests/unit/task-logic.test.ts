import {describe,it,expect} from "vitest";
import {calculateStats,filterTasks,statusCounts,type TaskDTO} from "../../src/lib/task-logic";
const make=(id:string,title:string,status:TaskDTO["status"]="Backlog"):TaskDTO=>({
  id,title,status,description:"",project:"Aurora",assignee:"You",priority:"Medium",dueDate:null,createdAt:new Date(0).toISOString(),updatedAt:new Date(0).toISOString()
});
describe("task filtering regression test",()=>{
  const rows=[make("a","Fix Navigation Overflow"),make("b","Add billing chart","Done")];
  it("matches regardless of letter case",()=>expect(filterTasks(rows,{query:"navigation"}).map(x=>x.id)).toEqual(["a"]));
  it("trims whitespace",()=>expect(filterTasks(rows,{query:"  BILLING "}).map(x=>x.id)).toEqual(["b"]));
  it("combines status and text",()=>{
    expect(filterTasks(rows,{query:"chart",status:"Done"})).toHaveLength(1);
    expect(filterTasks(rows,{query:"chart",status:"Backlog"})).toHaveLength(0);
  });
  it("searches project and assignee",()=>expect(filterTasks(rows,{query:"aurora"})).toHaveLength(2));
});
describe("statistics",()=>{
  it("handles empty board",()=>expect(calculateStats([])).toMatchObject({total:0,done:0,completion:0}));
  it("computes completion",()=>{
    const rows=[make("a","A","Done"),make("b","B","Done"),make("c","C","In Progress")];
    expect(calculateStats(rows)).toMatchObject({total:3,done:2,open:1,completion:67});
    expect(statusCounts(rows)).toMatchObject({Done:2,"In Progress":1,Backlog:0});
  });
});
