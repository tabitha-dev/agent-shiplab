import {describe,it,expect} from "vitest";
import {calculateStats,filterTasks,statusCounts,sortTasks,localDate,type TaskDTO} from "../../src/lib/task-logic";
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

describe("deadline calendar semantics",()=>{
  const now=new Date(2026,2,7,23,30);
  const task=(id:string,date:string|null,status:TaskDTO['status']='Backlog')=>({...make(id,id,status),dueDate:date});
  const rows=[task('past','2026-03-06T12:00:00Z'),task('today','2026-03-07'),task('six','2026-03-13'),task('seven','2026-03-14'),task('none',null),task('done','2026-03-06','Done')];
  it('excludes completed and undated overdue tasks',()=>expect(filterTasks(rows,{due:'Overdue'},now).map(t=>t.id)).toEqual(['past']));
  it('includes today through six calendar days across DST',()=>expect(filterTasks(rows,{due:'Due in next 7 days'},now).map(t=>t.id)).toEqual(['today','six']));
  it('keeps all tasks and composes filters',()=>{
    expect(filterTasks(rows,{due:'All'},now)).toHaveLength(6);
    expect(filterTasks(rows,{due:'Overdue',query:'PAST',project:'Aurora',priority:'Medium',status:'Backlog'},now)).toHaveLength(1);
  });
  it('uses local dates on either side of UTC midnight',()=>{
    const original=process.env.TZ;
    try {process.env.TZ='America/Los_Angeles';expect(localDate(new Date('2026-03-08T01:00:00Z'))).toBe('2026-03-07');
      process.env.TZ='Pacific/Kiritimati';expect(localDate(new Date('2026-03-07T15:00:00Z'))).toBe('2026-03-08');
    } finally {process.env.TZ=original;}
  });
  it('sorts dates with undated last and deterministic timestamp and ID ties without mutation',()=>{
    const items=[task('z',null),task('b','2026-03-07'),task('a','2026-03-07'),{...task('new','2026-03-07'),createdAt:'2026-01-01T00:00:00Z'}];
    expect(sortTasks(items,'Due soonest').map(t=>t.id)).toEqual(['new','a','b','z']);
    expect(sortTasks(items,'Newest first').map(t=>t.id)).toEqual(['new','a','b','z']);
    expect(items[0].id).toBe('z');
  });
});
