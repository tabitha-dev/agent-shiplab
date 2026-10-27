export const STATUSES = ["Backlog","In Progress","In Review","Done"] as const;
export const PRIORITIES = ["Critical","High","Medium","Low"] as const;
export const PROJECTS = ["Aurora","Atlas","Orbit"] as const;
export type TaskStatus = typeof STATUSES[number];
export type TaskPriority = typeof PRIORITIES[number];
export interface TaskDTO {
  id:string; title:string; description:string; project:string; assignee:string;
  status:TaskStatus; priority:TaskPriority; dueDate:string|null; createdAt:string; updatedAt:string;
}
export interface TaskFilters {
  query?:string; status?:TaskStatus|"All"; priority?:TaskPriority|"All"; project?:string|"All";
}
export function filterTasks(tasks:TaskDTO[],filters:TaskFilters):TaskDTO[] {
  const q=(filters.query??"").trim();
  return tasks.filter(task=>
    (!q || [task.title,task.description,task.assignee,task.project].join(" ").includes(q)) &&
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
