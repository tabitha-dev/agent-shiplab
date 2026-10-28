import type {TaskDTO} from './task-logic';
export const CSV_HEADERS=['Title','Description','Project','Assignee','Status','Priority','Due date','Created at'] as const;
export const CSV_FILENAME='shiplab-filtered-tasks.csv';
export function csvCell(value:string):string {
  const safe=/^[\s\x00-\x1f\x7f-\x9f]*[=+@-]/u.test(value)?"'"+value:value;
  return /[",\r\n]/.test(safe)?'"'+safe.replaceAll('"','""')+'"':safe;
}
export function tasksToCsv(tasks:readonly TaskDTO[]):string {
  return [CSV_HEADERS,...tasks.map(t=>[t.title,t.description,t.project,t.assignee,t.status,t.priority,t.dueDate??'',t.createdAt])]
    .map(row=>row.map(csvCell).join(',')).join('\r\n')+'\r\n';
}
