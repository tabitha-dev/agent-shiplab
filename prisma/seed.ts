import "dotenv/config";
import { PrismaClient } from "@prisma/client";
const db=new PrismaClient();
const due=(offset:number)=>{const d=new Date();d.setUTCHours(12,0,0,0);d.setUTCDate(d.getUTCDate()+offset);return d;};
async function main(){
  if(await db.task.count()){console.log("Tasks already exist; preserving data.");return;}
  const rows=[
    ["Design onboarding experience","Plan accessible first-run screens","Aurora","Maya Chen","Backlog","High",5],
    ["Write interview questions","Learn how developers review AI changes","Orbit","Jordan Lee","Backlog","Low",8],
    ["Investigate navigation overflow","Small-screen project navigation clips","Aurora","You","Backlog","Critical",2],
    ["Draft notification system","Notify owners about task changes","Atlas","Sam Rivera","Backlog","Medium",11],
    ["Implement task creation API","Validate input for new tasks","Aurora","You","In Progress","High",3],
    ["Polish responsive dashboard","Check desktop and mobile cards","Aurora","Maya Chen","In Progress","Medium",4],
    ["Build integration test plan","Document critical user journeys","Orbit","Jordan Lee","In Progress","High",7],
    ["Review form accessibility","Audit keyboard and screen-reader use","Aurora","Sam Rivera","In Review","Critical",1],
    ["Audit GitHub workflow","Require evidence with pull requests","Atlas","You","In Review","Medium",6],
    ["Create design tokens","Establish reusable colors and spacing","Aurora","Maya Chen","Done","High",-3],
    ["Define release checklist","Document required release checks","Orbit","You","Done","Medium",-1],
    ["Document local setup","Write contributor quick-start guide","Atlas","Jordan Lee","Done","Low",-2]
  ] as const;
  for(const [title,description,project,assignee,status,priority,days] of rows){
    await db.task.create({data:{title,description,project,assignee,status,priority,dueDate:due(days)}});
  }
  console.log("Seeded 12 sample tasks.");
}
main().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>db.$disconnect());
