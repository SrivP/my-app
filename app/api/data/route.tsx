import { TaskObj } from "@/app/project/TaskObj";
import { NoteObj } from "@/app/project/NoteObj";
import { supabase } from "./supabase";
import { User } from "@supabase/supabase-js";



const Notes: NoteObj[] = [];

for (let i = 0; i < 10; i++) {
  Notes.push(new NoteObj(`I am note ${i}`, "Personal"));
}





export async function GET() {
  const { data } = await supabase.from('tasks').select().eq('user_id', "8a06959d-477f-45a0-bd87-f9191618de99");
  const moreTasks : TaskObj[] = [];
  data?.map((tasks) => {
    moreTasks.push(new TaskObj("8a06959d-477f-45a0-bd87-f9191618de99", tasks.title, tasks.priority, tasks.tags, tasks.dueDate))
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