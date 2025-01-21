"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TaskObj } from "@/app/project/TaskObj";
import { CiEdit } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BsSortNumericDownAlt } from "react-icons/bs";
import { BsSortNumericUpAlt } from "react-icons/bs";
import { Calendar } from "@/components/ui/calendar";
import { NoteObj } from "./NoteObj";
import toast, { Toaster } from "react-hot-toast";
import { IoIosAddCircle } from "react-icons/io";

interface apiResponseTask {
  allTasks: TaskObj[];
  allHabits: NoteObj[];
}

export default function Task() {
  const [allTasks, setAllTasks] = useState<TaskObj[]>([]);
  const [allHabits, setAllHabits] = useState<NoteObj[]>([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(0);
  const [tags, setTags] = useState("");
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/data");
      const result: apiResponseTask = await response.json();
      const tasks = result.allTasks.map((task) => TaskObj.fromAPI(task));
      const habits = result.allHabits.map((habit) => NoteObj.fromAPIH(habit));
      setAllTasks(tasks);
      setAllHabits(habits);
    };
    fetchData();
  }, []);

  function handleSortAscending(tasks: TaskObj[], ascending: boolean) {
    const arr = [...tasks];
    if (ascending) {
      for (let i = 0; i < arr.length; i++) {
        const currentTask = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j].getPriority() > currentTask.getPriority()) {
          arr[j + 1] = arr[j];
          j--;
        }
        arr[j + 1] = currentTask;
      }
    } else {
      for (let i = 0; i < arr.length; i++) {
        const currentTask = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j].getPriority() < currentTask.getPriority()) {
          arr[j + 1] = arr[j];
          j--;
        }
        arr[j + 1] = currentTask;
      }
    }
    setAllTasks(arr);
  }

  function newTask(
    title: string,
    priority: number,
    dueDate?: Date,
    tags?: string,
  ) {
    const updatedTasks: TaskObj[] = [];
    for (let i = 0; i < allTasks.length; i++) {
      updatedTasks.push(allTasks[i]);
    }
    if (title.length != 0) {
      const nTask = new TaskObj(title, priority, tags, dueDate);
      updatedTasks.push(nTask);
      setTitle("");
      setPriority(0);
      setDate(new Date());
      setPriority(0);
    } else {
      setTitle("");
      setPriority(0);
      setDate(new Date());
      setPriority(0);
      return;
    }

    setAllTasks(updatedTasks);
  }

  function updateTask(
    id: number,
    title: string,
    priority: number,
    dueDate?: Date,
    tags?: string,
  ) {
    const uTsks: TaskObj[] = [];

    for (let i = 0; i < allTasks.length; i++) {
      if (i == id) {
        const upTask = new TaskObj(
          title || allTasks[i].getTitle(),
          priority || allTasks[i].getPriority(),
        );
        upTask.setDueDate(date || allTasks[i].getDueDate());
        upTask.setTags(tags || allTasks[i].getTags());
        setTitle("");
        setPriority(0);
        setDate(new Date());
        setPriority(0);
        uTsks.push(upTask);
      } else {
        uTsks.push(allTasks[i]);
      }
    }
    setAllTasks(uTsks);
  }

  function validateDate(task): string {
    if (task.getDueDate() != undefined) {
      var options = { year: 'numeric', month: 'long', day: 'numeric' };
      return task.getDueDate().toLocaleString([], options);
    } else {
      return new Date().toLocaleString();
    }
  }

  return (
    
    <div className="w-screen overflow-x-hidden">
      <Toaster />
      <div className="relative top-10 left-10 space-x-4">
        <button
          onClick={() => {
            handleSortAscending(allTasks, true);
            toast("most important sorted first!");
          }}
        >
          <BsSortNumericUpAlt className="w-6 h-6" />
        </button>
        <button
          className=""
          onClick={() => {
            handleSortAscending(allTasks, false);
            toast("least important sorted first!!");
          }}
        >
          <BsSortNumericDownAlt className="w-6 h-6" />
        </button>
      </div>

      <div className="m-[5%] grid grid-cols-6 gap-8">
        {allTasks.map((task, idx) => (
          <Card key={idx} >
            <CardHeader>
              <CardTitle className="text-base p-0 m-0">{task.getTitle()}</CardTitle>
              <CardDescription>
              Due Date: {validateDate(task)}
              <p className="mt-2">Priority: {task.getPriority()}</p>
              <p>Tags: {task.getTags()}</p>
              </CardDescription>
            </CardHeader>
            <CardContent>
            </CardContent>
            <CardFooter className="flex ">
              <Popover>
                <PopoverTrigger className="w-[2px] h-[2px] ">
                  <CiEdit />
                </PopoverTrigger>
                <PopoverContent>
                  <h4> Update Task </h4>
                  <Input
                    type="text"
                    placeholder="new task name"
                    onChange={(e) => setTitle(e.target.value)}
                    className="mb-2"
                  />
                  <Input
                    type="text"
                    placeholder="new priority"
                    onChange={(e) => setPriority(Number(e.target.value))}
                    className="mb-2"
                  />
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border mb-2"
                  />
                  <Input
                    type="text"
                    placeholder="new tags"
                    onChange={(e) => setTags(e.target.value)}
                    className="mb-2"
                  />
                  <Button
                    onClick={() => updateTask(idx, title, priority, date, tags)}
                  >
                    Save Task
                  </Button>
                </PopoverContent>
              </Popover>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Popover>
        <PopoverTrigger className="w-[2px] h-[2px] ml-[50vw]">
          <IoIosAddCircle className="w-[30px] h-[30px]" />
        </PopoverTrigger>
        <PopoverContent>
          <h4>New Task</h4>
          <Input
            type="text"
            placeholder="new task name"
            onChange={(e) => setTitle(e.target.value)}
            className="mb-2"
          />
          <Input
            type="text"
            placeholder="new priority"
            onChange={(e) => setPriority(Number(e.target.value))}
            className="mb-2"
          />
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border mb-2"
          />
          <Input
            type="text"
            placeholder="new tags"
            onChange={(e) => setTags(e.target.value)}
            className="mb-2"
          />
          <Button onClick={() => newTask(title, priority, date, tags)}>
            Save Task
          </Button>
        </PopoverContent>
      </Popover>

      <div className="mb-[100px] mt-[100px] w-screen h-[1px] bg-slate-200"></div>

      <div className=" grid grid-cols-6 gap-8">
        {allHabits.map((habit, idxh) => (
          <Card key={idxh}>
            <CardHeader>
              <CardTitle>{habit.getTitle()}</CardTitle>
            </CardHeader>
            <CardFooter>
              <p>Tags: {habit.getTags()}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
