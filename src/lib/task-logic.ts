export const STATUSES = ["Backlog","In Progress","In Review","Done"] as const;
export const PRIORITIES = ["Critical","High","Medium","Low"] as const;
export const PROJECTS = ["Aurora","Atlas","Orbit"] as const;
export type TaskStatus = typeof STATUSES[number];
export type TaskPriority = typeof PRIORITIES[number];
export interface TaskDTO {
  id:string; title:string; description:string; project:string; assignee:string;
  status:TaskStatus; priority:TaskPriority; dueDate:string|null; createdAt:string; updatedAt:string;
}
export type DueFilter = "All"|"Overdue"|"Due in next 7 days";
export type TaskSort = "Due soonest"|"Newest first";
export function localDate(date:Date):string {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
}
// The API stores calendar dates at UTC noon; retain their written date.
export const dueDay=(task:TaskDTO)=>task.dueDate?.slice(0,10)??null;
export function isOverdue(task:TaskDTO,now=new Date()):boolean {
  return task.status!=="Done" && dueDay(task)!==null && dueDay(task)!<localDate(now);
}
export function sortTasks(tasks:TaskDTO[],sort:TaskSort):TaskDTO[] {
  const compare=(a:string,b:string)=>a<b?-1:a>b?1:0;
  return [...tasks].sort((a,b)=>
    (sort==="Due soonest"?compare(dueDay(a)??"9999-99-99",dueDay(b)??"9999-99-99"):0) ||
    (Date.parse(b.createdAt)-Date.parse(a.createdAt)) || compare(a.id,b.id));
}
export interface TaskFilters {
  due?:DueFilter;
  query?:string; status?:TaskStatus|"All"; priority?:TaskPriority|"All"; project?:string|"All";
}
export function filterTasks(tasks:TaskDTO[],filters:TaskFilters,now=new Date()):TaskDTO[] {
  const end=new Date(now); end.setDate(end.getDate()+6);
  const today=localDate(now), last=localDate(end);
  const q=(filters.query??"").trim().toLocaleLowerCase();
  return tasks.filter(task=>
    (!filters.due || filters.due==="All" || (task.status!=="Done" && dueDay(task)!==null &&
      (filters.due==="Overdue"?dueDay(task)!<today:dueDay(task)!>=today && dueDay(task)!<=last))) &&
    (!q || [task.title,task.description,task.assignee,task.project].join(" ").toLocaleLowerCase().includes(q)) &&
    (!filters.status || filters.status==="All" || task.status===filters.status) &&
    (!filters.priority || filters.priority==="All" || task.priority===filters.priority) &&
    (!filters.project || filters.project==="All" || task.project===filters.project)
  );
}
export function calculateStats(tasks:TaskDTO[]) {
  const total=tasks.length, done=tasks.filter(t=>t.status==="Done").length;
  return {total,done,open:total-done,
    inProgress:tasks.filter(t=>t.status==="In Progress").length,
    inReview:tasks.filter(t=>t.status==="In Review").length,
    completion:total?Math.round(done/total*100):0};
}
export function statusCounts(tasks:TaskDTO[]):Record<TaskStatus,number> {
  return Object.fromEntries(STATUSES.map(s=>[s,tasks.filter(t=>t.status===s).length])) as Record<TaskStatus,number>;
}
