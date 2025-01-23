import Image from "next/image";
import { Button } from "@/components/ui/button"
import {Mail} from 'lucide-react';
import { BadgePlus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { login, signup } from "./actions";
import { createClient } from "@/utils/supabase/server";



export default async function page() {
    const supabase = await createClient();
  
  return ( 
    <>
    <div className="bg-dots-pattern bg-dots-spacing">
    <div className="bg-dots-pattern bg-dots-spacing flex flex-col items-center justify-center w-screen h-screen space-y-2 bg-white bg-radial-[at_25%_25%] from-white to-zinc-900 to-75% size-24 rounded-full">
      <h1 className="text-3xl mb-6 font-bold "> Welcome to something!</h1> 
        <form id="login-form">
            <Label className="text-bold">Email</Label>
            <Input
            id="email"
            name="email"
            type="email"
            placeholder="john.doe@example.com"
            required
            ></Input>
            <Label className="text-bold">Password</Label>
            <Input
            id="Password"
            name="Password"
            type="Password"
            required
            ></Input>

        </form>
        
        
        
        <Button className="" formAction={login}>
          <Mail /> Log in with email
        </Button>
        <Button className="" formAction={signup}>
          <BadgePlus /> Sign up with email
        </Button>
      </div>
      </div>
      
    
      
    
    
    </>
    );
}
