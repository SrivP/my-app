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
import { Trash2 } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BsSortNumericDownAlt, BsSortNumericUpAlt } from "react-icons/bs";
import { Calendar } from "@/components/ui/calendar";
import { NoteObj } from "./NoteObj";
import toast, { Toaster } from "react-hot-toast";
import { IoIosAddCircle } from "react-icons/io";


interface apiResponseTask {
  allTasks: TaskObj[];
  allHabits: NoteObj[];
  user_id : string
}

export default function Task() {
  const [allTasks, setAllTasks] = useState<TaskObj[]>([]);
  const [allHabits, setAllHabits] = useState<NoteObj[]>([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(0);
  const [tags, setTags] = useState("");
  const [date, setDate] = useState<Date>();
  const [update, setUpdate] = useState(false);
  const [user, setUser] = useState("")
  


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/data");
      const result: apiResponseTask = await response.json();
      const tasks = result.allTasks.map((task) => TaskObj.fromAPI(task));
      setAllTasks(tasks);
      setUser(result.user_id)
      console.log(result.user_id)
    };
    fetchData();
  }, [update]);

  function handleSortAscending(tasks: TaskObj[], ascending: boolean) {
    const merge = (left: TaskObj[], right: TaskObj[]): TaskObj[] => {
      let result: TaskObj[] = [];
      let leftIndex = 0;
      let rightIndex = 0;
  
      while (leftIndex < left.length && rightIndex < right.length) {
        if (ascending) {
          if (left[leftIndex].getPriority() <= right[rightIndex].getPriority()) {
            result.push(left[leftIndex]);
            leftIndex++;
          } else {
            result.push(right[rightIndex]);
            rightIndex++;
          }
        } else {
          if (left[leftIndex].getPriority() >= right[rightIndex].getPriority()) {
            result.push(left[leftIndex]);
            leftIndex++;
          } else {
            result.push(right[rightIndex]);
            rightIndex++;
          }
        }
      }
  
      return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    };
  
    const mergeSort = (array: TaskObj[]): TaskObj[] => {
      if (array.length <= 1) {
        return array;
      }
  
      const middle = Math.floor(array.length / 2);
      const left = array.slice(middle);
      const right = array.slice(0, middle);
  
      return merge(mergeSort(left), mergeSort(right));
    };
  
    const sortedTasks = mergeSort(tasks);
    setAllTasks(sortedTasks);
  }

  async function addNewTask() {
    const response = await fetch('/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        priority,
        tags,
        dueDate: date?.toISOString(),
        user_id: user 
      }),
    });

    if (response.ok) {
      console.log('Task added successfully');
      setUpdate(!update); 
    } else {
      const errorData = await response.json();
      console.error('Error adding task:', errorData.error);
    }
  }

  async function deleteTaskS(id: number) {
    const response = await fetch('/api/data', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id : id,
        user_id: user, 
      }),
    });

    if (response.ok) {
      console.log('Task deleted successfully');
      console.log("this is it",id, user)
      setAllTasks((prevTasks) => prevTasks.filter((task) => task.getId() !== id));
    } else {
      const errorData = await response.json();
      console.error('Error deleting task:', errorData.error);
    }
  }



  async function updateTask2(id: number) {
    console.log("this is id" + id)
    const response = await fetch('/api/data', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        title,
        priority,
        tags,
        dueDate: date?.toISOString(),
        user_id: user 
      })
    })

    if (response.ok) {
      console.log('Task updated successfully');
      setUpdate(!update); 
    } else {
      const errorData = await response.json();
      console.error('Error updating task:', errorData.error);
    }
  }

  function validateDate(task: any): string {
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
        {allTasks.filter(task => task.getShow()).map((task, idx) => (
          <Card key={idx}>
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
            <CardFooter className="flex">
              <Button onClick={() => deleteTaskS(allTasks[idx].getId())}>
                <Trash2 />
              </Button>
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
                  <Button onClick={() => updateTask2(task.getId())}>
                    Save Task
                  </Button>
                </PopoverContent>
              </Popover>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="relative">
      <Popover>
        <PopoverTrigger className="w-[2px] h-[2px] ml-[50vw]">
          <IoIosAddCircle className="w-[30px] h-[30px]" />
        </PopoverTrigger>
        <PopoverContent avoidCollisions side="bottom" align="center" className="max-h-96 overflow-auto">
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
          <Button onClick={() => addNewTask()}>
            Save Task
          </Button>
        </PopoverContent>
      </Popover>
      </div>

      <div className="mb-[100px] mt-[100px] w-screen h-[1px] bg-slate-200"></div>

    </div>
  );
}