import Link from "next/link"


export default function Sidebar() {
    return (
        <>
            <div className="flex flex-col w-1/6 h-100vh border-r border-r-stone-300 space-y-2 justify-center items-center ">
                <Link href="/" className="text-left hover:bg-slate-200">Focus</Link>
                <Link href="/project" className="hover:bg-slate-200">Projects</Link>
                <Link href="/" className="hover:bg-slate-200">Stats</Link>
            </div>
        
        
        
        </>
    )
}