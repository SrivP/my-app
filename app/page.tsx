import Image from "next/image";
import { Button } from "@/components/ui/button"
import {Mail} from 'lucide-react';
import { BadgePlus } from "lucide-react";
import { redirect } from "next/navigation";



export default function Home() {
  
  return ( 
    redirect("/login")
    );
}
