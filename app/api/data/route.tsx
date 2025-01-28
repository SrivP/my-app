import { TaskObj } from "@/app/project/TaskObj";
import { NoteObj } from "@/app/project/NoteObj";
import { supabase } from "./supabase";
import { User } from "@supabase/supabase-js";
import { getUserId } from "@/app/login/page";
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server'


const Notes: NoteObj[] = [];

for (let i = 0; i < 10; i++) {
  Notes.push(new NoteObj(`I am note ${i}`, "Personal"));
}


export async function GET() {
  const userId = await getUserId();
  if (!userId) {
    return new Response(JSON.stringify({ error: "User not authenticated" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const { data } = await supabase.from('tasks').select().eq('user_id', userId);
  const moreTasks : TaskObj[] = [];
  data?.map((tasks) => {
    moreTasks.push(new TaskObj(userId, tasks.title, tasks.priority, tasks.tags, tasks.dueDate))
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

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { title, priority, tags, dueDate, user_id } = await request.json();

  const { error } = await supabase.from('tasks').insert({
    title,
    priority,
    tags: tags ? tags.split(',') : [],
    dueDate: dueDate ? new Date(dueDate).toISOString() : null,
    user_id,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Task added successfully' }, { status: 200 });
}