import { PRIORITIES, STATUSES } from "./task-logic";
type Data={title?:string;description?:string;project?:string;assignee?:string;status?:string;priority?:string;dueDate?:Date|null};
type Result={ok:true;data:Data}|{ok:false;error:string};
export function parseTaskPayload(body:unknown,partial=false):Result {
  if(!body || typeof body!=="object" || Array.isArray(body)) return {ok:false,error:"Expected a JSON object."};
  const raw=body as Record<string,unknown>, data:Data={};
  const fields={title:120,description:500,project:40,assignee:60} as const;
  for(const [field,max] of Object.entries(fields)) {
    if(raw[field]===undefined) continue;
    if(typeof raw[field]!=="string" || raw[field].length>max) return {ok:false,error:field+" must be a string of at most "+max+" characters."};
    const value=raw[field].trim();
    if(field==="title"&&!value) return {ok:false,error:"Task title cannot be empty."};
    Object.assign(data,{[field]:value});
  }
  if(!partial&&!data.title) return {ok:false,error:"Task title is required."};
  if(raw.status!==undefined) {
    if(!STATUSES.includes(raw.status as typeof STATUSES[number])) return {ok:false,error:"Invalid task status."};
    data.status=raw.status as string;
  }
  if(raw.priority!==undefined) {
    if(!PRIORITIES.includes(raw.priority as typeof PRIORITIES[number])) return {ok:false,error:"Invalid priority."};
    data.priority=raw.priority as string;
  }
  if(raw.dueDate!==undefined) {
    if(raw.dueDate===null||raw.dueDate==="") data.dueDate=null;
    else if(typeof raw.dueDate==="string" && /^\d{4}-\d{2}-\d{2}$/.test(raw.dueDate)) {
      const date=new Date(raw.dueDate+"T12:00:00.000Z");
      if(Number.isNaN(date.getTime())||date.toISOString().slice(0,10)!==raw.dueDate) return {ok:false,error:"Invalid calendar date."};
      data.dueDate=date;
    } else return {ok:false,error:"dueDate must be YYYY-MM-DD or null."};
  }
  if(partial&&!Object.keys(data).length) return {ok:false,error:"No supported fields provided."};
  return {ok:true,data};
}
