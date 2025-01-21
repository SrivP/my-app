import Sidebar from '@/components/custom/sidebar'
import Task from '@/app/project/Task'

export default function page() {
    return(
        <div className='flex '>
            < Sidebar />
            < Task />
        </ div>
    )
}