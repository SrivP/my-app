import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react";
import { getName, signOut } from "@/app/login/actions";
import { Button } from "../ui/button";
import { DoorOpen } from 'lucide-react';


export default function Sidebar() {
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        async function fetchEmail() {
            const userEmail = await getName();
            setEmail(userEmail?.email ?? null);
        }
        fetchEmail();
    }, []);
    
    return (
        <>
            <div className="flex flex-col min-w-1/6 min-h-screen border-r border-r-stone-300  ">
            <div className="flex flex-row items-center text-wrap">
            <Avatar className="relative m-5">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="relative font-bold">{email?.length > 12 ? email?.substring(0,12) + "..." : email}</p> 
            </div>
            
            
            <hr className="bg-stone-300"></hr>


            <div className="flex flex-col space-y-2 justify-center items-center grow">
                <Button variant="link"><Link href="/focus" className=" hover:bg-slate-200">Focus</Link></Button>
                <Button variant="link"><Link href="/project" className=" hover:bg-slate-200">Projects</Link></Button>
                <Button variant="link"><Link href="/" className=" hover:bg-slate-200">Stats</Link></Button>
            </div>
            <Button variant="ghost" className="" onClick={signOut}><DoorOpen /></Button>
            </div>
        
        
        
        </>
    )
}