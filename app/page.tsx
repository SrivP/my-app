import Image from "next/image";
import { Button } from "@/components/ui/button"
import {Mail} from 'lucide-react';
import { BadgePlus } from "lucide-react";



export default function Home() {
  
  return ( 
    <>
    <div className="bg-dots-pattern bg-dots-spacing">
    <div className="bg-dots-pattern bg-dots-spacing flex flex-col items-center justify-center w-screen h-screen space-y-2 bg-white bg-radial-[at_25%_25%] from-white to-zinc-900 to-75% size-24 rounded-full">
      <h1 className="text-3xl mb-6 font-bold "> Welcome to something!</h1> 
        <Button className="">
          <Mail /> Log in with email
        </Button>
        <Button className="">
          <BadgePlus /> Sign up with email
        </Button>
      </div>
      </div>
      
    
      
    
    
    </>
    );
}
