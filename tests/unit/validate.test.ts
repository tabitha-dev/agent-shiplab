import {describe,it,expect} from "vitest";
import {parseTaskPayload} from "../../src/lib/validate";
describe("task validation",()=>{
  it("requires a title",()=>expect(parseTaskPayload({})).toMatchObject({ok:false,error:"Task title is required."}));
  it("rejects impossible date and unknown status",()=>{
    expect(parseTaskPayload({title:"Test",dueDate:"2026-02-30"}).ok).toBe(false);
    expect(parseTaskPayload({title:"Test",status:"Shipped"}).ok).toBe(false);
  });
  it("normalizes accepted data",()=>{
    const result=parseTaskPayload({title:"  Ship it  ",priority:"High"});
    expect(result.ok).toBe(true);
    if(result.ok)expect(result.data.title).toBe("Ship it");
  });
  it("rejects no-op updates",()=>expect(parseTaskPayload({},true).ok).toBe(false));
});
