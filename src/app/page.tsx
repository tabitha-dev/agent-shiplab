import Dashboard from "@/components/dashboard";
import {prisma} from "@/lib/prisma";
import {toTaskDTO} from "@/lib/tasks";
export const dynamic="force-dynamic";
export const runtime="nodejs";
export default async function Home(){
  const tasks=await prisma.task.findMany({orderBy:{createdAt:"desc"}});
  return <Dashboard initialTasks={tasks.map(toTaskDTO)}/>;
}
