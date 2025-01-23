import Link from "next/link"


export default function Sidebar() {
    return (
        <>
            <div className="flex flex-col min-w-1/6 min-h-screen border-r border-r-stone-300 space-y-2 justify-center items-center ">
                <Link href="/focus" className="text-left hover:bg-slate-200">Focus</Link>
                <Link href="/project" className="hover:bg-slate-200">Projects</Link>
                <Link href="/" className="hover:bg-slate-200">Stats</Link>
            </div>
        
        
        
        </>
    )
}