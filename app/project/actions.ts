"use server"

import { Todo } from "@/custom";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { TaskObj } from "./TaskObj";

export async function addTodo(task: TaskObj) {
    const supabase = await createClient();

    

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User is not logged in")
    }

    const { error } = await supabase.from("todos").insert({
        title: task.getTitle(),
        user_id: user.id
    })

    if (error) {
        throw new Error("Error adding task")
    }

    revalidatePath("/todos")
}