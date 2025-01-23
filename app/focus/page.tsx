"use client"
import { AlarmClock } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {useEffect, useState} from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import toast, { Toaster } from 'react-hot-toast';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Sidebar from '@/components/custom/sidebar';


export default function page() {
  const [time, setTime] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [running, setRunning] = useState(false);
  const [variant, setVariant] = useState<"default" | "secondary"| "destructive">("default");
  

  useEffect(() => {
    let countdown: NodeJS.Timeout | undefined;

    if (running) {
    countdown = setInterval(() => {
      if (running) {
        setTime((prev) => prev - 1);
      }
    },1000) 
  }
  
  return () => {
    if (countdown) {
      clearInterval(countdown);
  }
  
  }

  }, [running])

  function handleStart() {
    if (time === 0) {
      toast("Please set a time", {icon: '🕰️'});
      setRunning(false)
    } else {
    setRunning(true);
    setVariant("destructive");
    }

  }

  function handleStop() {
    setRunning(false);
    setVariant("default");
  }

  function formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  
  }

  function handleTime() {

    setTime(minutes * 60 + seconds);
  }

  function handleReset() {
    setTime(0);
    setRunning(false);
    setVariant("default");
  }



  return (
    <>
    <Toaster />
    <div className="grid grid-cols-[1fr_5fr] h-screen">
      <Sidebar />
    <div className="grid place-items-center h-screen">
    <div className="items-center  flex flex-col w-[30rem] h-[20rem] shadow-md rounded-md bg-slate-50 ">
        <p className="pt-1 text-9xl font-mono font-extrabold">{formatTime(time)}</p>  
        <Popover>
          <PopoverTrigger asChild>
            <Button className="mt-4 ml-0" variant="ghost"><AlarmClock /></Button>
          </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Set Time</h4>
            <p className="text-sm text-muted-foreground">
              Set the amount of time you'd like to focus for (in seconds).
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="minutes">Minutes</Label>
              <Input
                id="minutes"
                placeholder="25"
                className="col-span-2 h-8"
                onChange={(e) => setMinutes(parseInt(e.target.value))}
                
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="seconds">Seconds</Label>
              <Input
                id="seconds"
                placeholder="00"
                className="col-span-2 h-8"
                onChange={(e) => setSeconds(parseInt(e.target.value))}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Button onClick={handleTime} className="col-span-2">Submit</Button>
            </div>
            
            </div>
        </div>
      </PopoverContent>
      </Popover>
        <div className="mt-[45px] space-x-10">
            <Button className="" variant={variant} onClick={running ? handleStop : handleStart}>{running ? "Stop" : "Start"}</Button> 
            <Button className=" " variant="default" onClick={handleReset}>Reset</Button>
        </div>
    </div>
    </div>
    </div>
    </>
  );
}