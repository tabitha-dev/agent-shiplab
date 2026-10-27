import type { Task } from "@prisma/client";
import type { TaskDTO,TaskStatus,TaskPriority } from "./task-logic";
export function toTaskDTO(task:Task):TaskDTO {
  return {id:task.id,title:task.title,description:task.description,project:task.project,
    assignee:task.assignee,status:task.status as TaskStatus,priority:task.priority as TaskPriority,
    dueDate:task.dueDate?.toISOString()??null,createdAt:task.createdAt.toISOString(),updatedAt:task.updatedAt.toISOString()};
}
