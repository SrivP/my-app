"use client"

import Sidebar from '@/components/custom/sidebar'
import Task from '@/app/project/Task'

export default function Page() {
    return(
        <div className='flex flex-row'>
            < Sidebar />
            < Task />
        </ div>
    )
}