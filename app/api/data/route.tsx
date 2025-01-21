import { TaskObj } from "@/app/project/TaskObj";
import { NoteObj } from "@/app/project/NoteObj";
import { supabase } from "./supabase";






const Notes: NoteObj[] = [];

for (let i = 0; i < 10; i++) {
  Notes.push(new NoteObj(`I am note ${i}`, "Personal"));
}




export async function GET() {
  const { data } = await supabase.from('tasks').select('*')
  const moreTasks : TaskObj[] = [];
  data?.map((tasks) => {
    moreTasks.push(new TaskObj(tasks.title, tasks.priority, tasks.tags, tasks.dueDate))
  })

  const rdata = {
    allTasks: moreTasks,
    allHabits: Notes,
  };
  return new Response(JSON.stringify(rdata), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}