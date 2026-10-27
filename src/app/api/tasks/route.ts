import { NextRequest,NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toTaskDTO } from "@/lib/tasks";
import { parseTaskPayload } from "@/lib/validate";
export const runtime="nodejs";
export const dynamic="force-dynamic";
export async function GET(){
  try {
    const tasks=await prisma.task.findMany({orderBy:{createdAt:"desc"}});
    return NextResponse.json(tasks.map(toTaskDTO),{headers:{"Cache-Control":"no-store"}});
  } catch(err){console.error("Read tasks",err);return NextResponse.json({error:"Unable to read tasks."},{status:500});}
}
export async function POST(request:NextRequest){
  let body:unknown;
  try{body=await request.json();}catch{return NextResponse.json({error:"Invalid JSON."},{status:400});}
  const parsed=parseTaskPayload(body);
  if(!parsed.ok)return NextResponse.json({error:parsed.error},{status:400});
  try {
    const d=parsed.data;
    const task=await prisma.task.create({data:{
      title:d.title!,description:d.description??"",project:d.project??"Aurora",
      assignee:d.assignee??"You",status:d.status??"Backlog",
      priority:d.priority??"Medium",dueDate:d.dueDate??null
    }});
    return NextResponse.json(toTaskDTO(task),{status:201});
  }catch(err){console.error("Create task",err);return NextResponse.json({error:"Unable to create task."},{status:500});}
}
