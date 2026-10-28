import {describe,it,expect} from "vitest";
import {calculateStats,statusCounts,STATUSES,type TaskDTO} from "../../src/lib/task-logic";
const tasks=(statuses:TaskDTO["status"][])=>statuses.map((status,id)=>({id:String(id),status} as TaskDTO));
describe("analytics snapshot",()=>{
  it("reconciles every status and rounds completion",()=>{
    const data=tasks(["Backlog","In Progress","In Review","Done","Done","Backlog"]);
    expect(statusCounts(data)).toEqual({"Backlog":2,"In Progress":1,"In Review":1,"Done":2});
    expect(Object.values(statusCounts(data)).reduce((a,b)=>a+b,0)).toBe(data.length);
    expect(calculateStats(data).completion).toBe(33);
  });
  it("handles empty data without NaN",()=>{
    expect(calculateStats([])).toMatchObject({total:0,done:0,completion:0});
    expect(Object.values(statusCounts([]))).toEqual([0,0,0,0]);
  });
  it.each(STATUSES)("handles a single %s group",status=>{
    const data=tasks([status,status]);
    expect(statusCounts(data)[status]).toBe(2);
    expect(calculateStats(data).completion).toBe(status==="Done"?100:0);
  });
});
