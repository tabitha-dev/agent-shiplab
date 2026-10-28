"use client";

import {useEffect,useMemo,useRef,useState,type FormEvent} from "react";
import {
  Activity,ArrowRight,ArrowUpRight,BarChart3,CalendarDays,Check,CheckCircle2,
  Circle,Clock3,Columns3,ExternalLink,Github,LayoutDashboard,ListFilter,Plus,
  Search,ShieldCheck,Sparkles,Trash2,X
} from "lucide-react";
import {calculateStats,filterTasks,sortTasks,isOverdue,type DueFilter,type TaskSort,PRIORITIES,PROJECTS,STATUSES,statusCounts,type TaskDTO,type TaskPriority,type TaskStatus} from "@/lib/task-logic";

type View="overview"|"board";
type CreateFields={title:string;description:string;project:string;assignee:string;priority:TaskPriority;status:TaskStatus;dueDate:string};
const emptyForm:CreateFields={title:"",description:"",project:"Aurora",assignee:"You",priority:"Medium",status:"Backlog",dueDate:""};

const initials=(name:string)=>name.split(" ").map(part=>part[0]).slice(0,2).join("").toUpperCase();
const dateLabel=(value:string|null)=>value
  ? new Date(value).toLocaleDateString("en-US",{month:"short",day:"numeric",timeZone:"UTC"})
  : "No due date";

export default function Dashboard({initialTasks}:{initialTasks:TaskDTO[]}){
  const [tasks,setTasks]=useState(initialTasks);
  const [view,setView]=useState<View>("overview");
  const [due,setDue]=useState<DueFilter>("All");
  const [sort,setSort]=useState<TaskSort>("Due soonest");
  const [today,setToday]=useState(()=>new Date());
  useEffect(()=>{const timer=setInterval(()=>setToday(new Date()),30000);return()=>clearInterval(timer);},[]);
  const [query,setQuery]=useState("");
  const [priority,setPriority]=useState<TaskPriority|"All">("All");
  const [project,setProject]=useState("All");
  const [status,setStatus]=useState<TaskStatus|"All">("All");
  const [form,setForm]=useState<CreateFields>(emptyForm);
  const [busy,setBusy]=useState(false);
  const [notice,setNotice]=useState("");
  const [menuOpen,setMenuOpen]=useState(false);
  const dialog=useRef<HTMLDialogElement>(null);
  const stats=useMemo(()=>calculateStats(tasks),[tasks]);
  const counts=useMemo(()=>statusCounts(tasks),[tasks]);
  const filtered=useMemo(()=>sortTasks(filterTasks(tasks,{query,priority,project,status,due},today),sort),[tasks,query,priority,project,status,due,sort,today]);
  useEffect(()=>{if(!notice)return;const timer=setTimeout(()=>setNotice(""),5000);return()=>clearTimeout(timer);},[notice]);

  function openNew(){setForm(emptyForm);dialog.current?.showModal();}
  function closeNew(){dialog.current?.close();}
  function setField<K extends keyof CreateFields>(key:K,value:CreateFields[K]){
    setForm(previous=>({...previous,[key]:value}));
  }
  async function createTask(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    if(!form.title.trim())return;
    setBusy(true);
    try{
      const response=await fetch("/api/tasks",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
      const data=await response.json();
      if(!response.ok)throw new Error(data.error||"Unable to create task");
      setTasks(previous=>[data as TaskDTO,...previous]);
      setDue("All");setStatus("All");setPriority("All");setProject("All");setQuery("");
      closeNew();setNotice("Task created successfully.");
    }catch(error){setNotice(error instanceof Error?error.message:"Create failed.");}
    finally{setBusy(false);}
  }
  async function updateStatus(task:TaskDTO,next:TaskStatus){
    setBusy(true);
    try{
      const response=await fetch("/api/tasks/"+encodeURIComponent(task.id),{
        method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:next})
      });
      const data=await response.json();
      if(!response.ok)throw new Error(data.error||"Update failed");
      setTasks(previous=>previous.map(t=>t.id===task.id?data as TaskDTO:t));
      setNotice("Moved to "+next+".");
    }catch(error){setNotice(error instanceof Error?error.message:"Update failed.");}
    finally{setBusy(false);}
  }
  async function deleteTask(task:TaskDTO){
    if(!window.confirm("Delete '"+task.title+"' permanently?"))return;
    setBusy(true);
    try{
      const response=await fetch("/api/tasks/"+encodeURIComponent(task.id),{method:"DELETE"});
      if(!response.ok)throw new Error("Delete failed.");
      setTasks(previous=>previous.filter(t=>t.id!==task.id));setNotice("Task deleted.");
    }catch(error){setNotice(error instanceof Error?error.message:"Delete failed.");}
    finally{setBusy(false);}
  }
  function clearFilters(){setDue("All");setQuery("");setPriority("All");setProject("All");setStatus("All");}
  const filterActive=due!=="All"||Boolean(query)||priority!=="All"||project!=="All"||status!=="All";
  const completionSegments=STATUSES.map(key=>({key,count:counts[key],pct:stats.total?counts[key]/stats.total*100:0}));

  return <div className="shell">
    <aside className={"sidebar "+(menuOpen?"sidebar-open":"")} aria-label="Workspace navigation">
      <div className="brand"><div className="brand-mark"><Sparkles size={22}/></div><div><strong>ShipLab<span className="brand-dot">.</span></strong><small>AGENT WORKSPACE</small></div></div>
      <div className="workspace-switch"><div className="workspace-avatar">S</div><span><strong>Studio workspace</strong><small>Personal project</small></span><Check size={16}/></div>
      <div className="sidebar-section-title">WORKSPACE</div>
      <nav className="side-nav" aria-label="Main menu">
        <button type="button" onClick={()=>{setView("overview");setMenuOpen(false);}} className={view==="overview"?"nav-active":""} aria-current={view==="overview"?"page":undefined}><LayoutDashboard size={18}/> Overview</button>
        <button type="button" onClick={()=>{setView("board");setMenuOpen(false);}} className={view==="board"?"nav-active":""} aria-current={view==="board"?"page":undefined}><Columns3 size={18}/> Project board <span className="nav-count">{stats.total}</span></button>
      </nav>
      <div className="sidebar-section-title">YOUR PIPELINE</div>
      <nav className="side-nav" aria-label="Task status filters">
        {STATUSES.map(name=><button key={name} type="button" onClick={()=>{setStatus(name);setView("board");setMenuOpen(false);}} className={status===name?"nav-soft-active":""}><span className={"status-dot dot-"+name.replaceAll(" ","-").toLowerCase()}/>{name}<span className="nav-count">{counts[name]}</span></button>)}
      </nav>
      <div className="sidebar-spacer"/>
      <div className="sidebar-callout"><div className="callout-icon"><ShieldCheck size={20}/></div><strong>Built to be tested.</strong><p>Real code. Real pull requests. Measurable results.</p><a href="https://github.com/tabitha-dev/agent-shiplab" target="_blank" rel="noreferrer">View GitHub repo <ArrowUpRight size={14}/></a></div>
      <div className="sidebar-footer"><div className="user-avatar">T</div><div><strong>Creator workspace</strong><small>Open-source demo</small></div><Github size={17}/></div>
    </aside>
    <div className="main-region">
      <header className="topbar">
        <button type="button" className="mobile-menu" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={()=>setMenuOpen(!menuOpen)}><Columns3 size={20}/></button>
        <div className="breadcrumb">Workspace <span>/</span> <strong>{view==="overview"?"Overview":"Project board"}</strong></div>
        <div className="top-actions"><span className="live-pill"><span className="live-dot"/> LOCAL DEMO</span><a href="https://github.com/tabitha-dev/agent-shiplab" target="_blank" rel="noreferrer" className="top-github" aria-label="View repository on GitHub"><Github size={19}/></a><button className="btn btn-primary" onClick={openNew} type="button"><Plus size={17}/> New task</button></div>
      </header>
      <main className="content">
        <div className="eyebrow"><span className="eyebrow-star">✦</span> YOUR MISSION CONTROL <span className="eyebrow-line"/></div>
        <div className="heading-row"><div><h1>Ship better work<span className="title-period">.</span></h1><p>One workspace to plan, build, test, and ship with confidence.</p></div><div className="release-label"><span className="release-icon"><Activity size={17}/></span><span><small>WORKSPACE HEALTH</small><strong>All systems ready</strong></span></div></div>
        {view==="overview" && <>
          <section className="stats-grid" aria-label="Project statistics">
            <div className="stat-card"><div className="stat-top"><span>Total tasks</span><span className="stat-icon icon-purple"><LayoutDashboard size={19}/></span></div><strong>{stats.total.toString().padStart(2,"0")}</strong><div className="stat-sub"><span className="sub-pill purple">ALL PROJECTS</span> Across your workspace</div></div>
            <div className="stat-card"><div className="stat-top"><span>In progress</span><span className="stat-icon icon-blue"><Clock3 size={19}/></span></div><strong>{stats.inProgress.toString().padStart(2,"0")}</strong><div className="stat-sub"><span className="sub-pill blue">ACTIVE</span> Being worked on</div></div>
            <div className="stat-card"><div className="stat-top"><span>In review</span><span className="stat-icon icon-orange"><ListFilter size={19}/></span></div><strong>{stats.inReview.toString().padStart(2,"0")}</strong><div className="stat-sub"><span className="sub-pill orange">QA READY</span> Awaiting verification</div></div>
            <div className="stat-card"><div className="stat-top"><span>Completed</span><span className="stat-icon icon-green"><CheckCircle2 size={19}/></span></div><strong>{stats.done.toString().padStart(2,"0")}</strong><div className="stat-sub"><span className="sub-pill green">{stats.completion}% DONE</span> Of total work</div></div>
          </section>
          <section className="insights-row" aria-label="Delivery insights">
            <div className="insight-primary"><div className="insight-text"><span className="insight-kicker">✦ THE BIG PICTURE</span><h2>Great things take<br/><em>great teamwork.</em></h2><p>Every task is a step closer to shipping something exceptional.</p><button type="button" onClick={()=>setView("board")}>Explore project board <ArrowRight size={17}/></button></div><div className="orb orb-one"/><div className="orb orb-two"/><div className="orb-ring"/></div>
            <div className="progress-panel"><div className="progress-top"><span>Delivery progress</span><BarChart3 size={20}/></div><div className="progress-head"><strong>{stats.completion}%</strong><span>of tasks completed</span></div><div className="progress-track"><span style={{width:stats.completion+"%"}}/></div><div className="progress-legend">{completionSegments.map(({key,count})=><div key={key}><span className={"status-dot dot-"+key.replaceAll(" ","-").toLowerCase()}/><span>{key}</span><strong>{count}</strong></div>)}</div></div>
          </section>
        </>}
        <section className="board-section" aria-label="Project board">
          <div className="board-header"><div><div className="section-kicker">PROJECTS / TASK MANAGER</div><h2>{view==="board"?"Project board":"Your project board"}<span className="board-total">{stats.total}</span></h2><p>Move tasks through your workflow and keep every project on track.</p></div><button className="btn btn-outline" onClick={openNew} type="button"><Plus size={16}/> Add task</button></div>
          <div className="filterbar"><label className="search-field"><Search size={17}/><input aria-label="Search tasks" type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search tasks, owners, projects..."/></label>
          <div className="filters"><label className="select-wrap deadline-control"><span>Due date</span><select value={due} onChange={e=>setDue(e.target.value as DueFilter)}>{["All","Overdue","Due in next 7 days"].map(value=><option key={value}>{value}</option>)}</select></label><label className="select-wrap deadline-control"><span>Sort by</span><select value={sort} onChange={e=>setSort(e.target.value as TaskSort)}>{["Due soonest","Newest first"].map(value=><option key={value}>{value}</option>)}</select></label><label className="select-wrap"><span className="sr-only">Filter by project</span><select value={project} onChange={e=>setProject(e.target.value)} aria-label="Filter by project"><option value="All">All projects</option>{PROJECTS.map(p=><option key={p}>{p}</option>)}</select></label>
          <label className="select-wrap"><span className="sr-only">Filter by priority</span><select value={priority} onChange={e=>setPriority(e.target.value as TaskPriority|"All")} aria-label="Filter by priority"><option value="All">All priorities</option>{PRIORITIES.map(p=><option key={p}>{p}</option>)}</select></label>
          {status!=="All"&&<button className="filter-chip" onClick={()=>setStatus("All")} type="button">{status} <X size={14}/></button>}
          {filterActive&&<button className="clear-filters" type="button" onClick={clearFilters}>Clear filters</button>}
          </div></div>
          <div className="board" role="region" aria-label="Kanban board">
            {STATUSES.map(name=>{
              const items=filtered.filter(task=>task.status===name);
              return <div className="column" key={name}>
                <div className="column-head"><div><span className={"status-dot dot-"+name.replaceAll(" ","-").toLowerCase()}/><h3>{name}</h3><span className="column-count">{items.length}</span></div>{name==="Backlog"&&<button type="button" className="column-plus" aria-label="Add backlog task" onClick={openNew}><Plus size={17}/></button>}</div>
                <div className="column-body">
                  {items.map(task=><article key={task.id} className="task-card" data-testid="task-card">
                    <div className="card-eyebrow"><span className={"project-marker project-"+task.project.toLowerCase()}/>{task.project}<span className={"priority priority-"+task.priority.toLowerCase()}>{task.priority}</span></div>
                    <h4>{task.title}</h4><p>{task.description||"No description provided."}</p>
                    <div className="card-meta"><span className={isOverdue(task,today)?"due-overdue":""}><CalendarDays size={14}/>{dateLabel(task.dueDate)}</span><span title={task.assignee} className="assignee">{initials(task.assignee)}</span></div>
                    <div className="card-actions"><label className="sr-only" htmlFor={"status-"+task.id}>Status</label><select id={"status-"+task.id} aria-label="Status" disabled={busy} value={task.status} onChange={e=>updateStatus(task,e.target.value as TaskStatus)}>{STATUSES.map(s=><option key={s}>{s}</option>)}</select><button type="button" disabled={busy} className="delete-btn" aria-label="Delete task" title="Delete task" onClick={()=>deleteTask(task)}><Trash2 size={15}/></button></div>
                  </article>)}
                  {items.length===0&&<div className="empty-column"><Circle size={19}/><span>No tasks here</span></div>}
                </div>
              </div>;
            })}
          </div>
          <div className="board-foot"><span><Check size={15}/> Changes persist in your local SQLite database</span><span>Showing {filtered.length} of {tasks.length} tasks</span></div>
        </section>
        <footer className="content-footer"><span>© {new Date().getFullYear()} ShipLab · An open-source agent experiment</span><a href="https://github.com/tabitha-dev/agent-shiplab" rel="noreferrer" target="_blank">Explore the source <ExternalLink size={13}/></a></footer>
      </main>
    </div>
    <dialog ref={dialog} className="create-dialog" onClose={()=>setForm(emptyForm)} aria-labelledby="dialog-title">
      <div className="modal-head"><div><span className="section-kicker">NEW WORK ITEM</span><h2 id="dialog-title">Create a task</h2><p>Make a clear plan for what gets shipped next.</p></div><button type="button" aria-label="Close task dialog" className="close-dialog" onClick={closeNew}><X size={21}/></button></div>
      <form onSubmit={createTask} className="task-form">
        <label>Task title <span className="required">*</span><input autoFocus required maxLength={120} value={form.title} onChange={e=>setField("title",e.target.value)} aria-label="Task title" placeholder="e.g. Fix mobile navigation"/></label>
        <label>Description <textarea maxLength={500} rows={3} value={form.description} onChange={e=>setField("description",e.target.value)} placeholder="What should this task accomplish?"/></label>
        <div className="form-grid"><label>Project <select value={form.project} onChange={e=>setField("project",e.target.value)}>{PROJECTS.map(p=><option key={p}>{p}</option>)}</select></label><label>Priority <select value={form.priority} onChange={e=>setField("priority",e.target.value as TaskPriority)}>{PRIORITIES.map(p=><option key={p}>{p}</option>)}</select></label></div>
        <div className="form-grid"><label>Assignee <input value={form.assignee} maxLength={60} onChange={e=>setField("assignee",e.target.value)}/></label><label>Due date <input type="date" value={form.dueDate} onChange={e=>setField("dueDate",e.target.value)}/></label></div>
        <div className="modal-actions"><button type="button" onClick={closeNew} className="btn btn-outline">Cancel</button><button type="submit" disabled={busy||!form.title.trim()} className="btn btn-primary"><Plus size={17}/> {busy?"Creating...":"Create task"}</button></div>
      </form>
    </dialog>
    <div className="toast" role="status" aria-live="polite">{notice&&<span><CheckCircle2 size={18}/>{notice}</span>}</div>
  </div>;
}
