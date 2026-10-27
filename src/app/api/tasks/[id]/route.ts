import { NextRequest,NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toTaskDTO } from "@/lib/tasks";
import { parseTaskPayload } from "@/lib/validate";
export const runtime="nodejs";
type Context={params:Promise<{id:string}>};
export async function PATCH(request:NextRequest,{params}:Context){
  const {id}=await params;
  let body:unknown;
  try{body=await request.json();}catch{return NextResponse.json({error:"Invalid JSON."},{status:400});}
  const parsed=parseTaskPayload(body,true);
  if(!parsed.ok)return NextResponse.json({error:parsed.error},{status:400});
  try{
    const exists=await prisma.task.findUnique({where:{id},select:{id:true}});
    if(!exists)return NextResponse.json({error:"Task not found."},{status:404});
    const task=await prisma.task.update({where:{id},data:parsed.data});
    return NextResponse.json(toTaskDTO(task));
  }catch(err){console.error("Update task",err);return NextResponse.json({error:"Unable to update task."},{status:500});}
}
export async function DELETE(_request:NextRequest,{params}:Context){
  const {id}=await params;
  try{
    const exists=await prisma.task.findUnique({where:{id},select:{id:true}});
    if(!exists)return NextResponse.json({error:"Task not found."},{status:404});
    await prisma.task.delete({where:{id}});
    return new NextResponse(null,{status:204});
  }catch(err){console.error("Delete task",err);return NextResponse.json({error:"Unable to delete task."},{status:500});}
}
