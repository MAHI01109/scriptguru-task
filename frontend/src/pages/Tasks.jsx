import { useEffect, useState } from 'react'
import Axios from '../api/Axios'
import AddTask from './AddTask'
import { TrashIcon } from '@heroicons/react/24/outline'

export default function Tasks({ boardId }) {
    const [tasks, setTasks] = useState([])
    const [showForm, setShowForm] = useState(false)

    const fetchTasks = () => {
        if (boardId) {
            Axios.get(`/boards/${boardId}/tasks`)
                .then(res => setTasks(res.data.tasks))
                .catch(() => setTasks([]))
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [boardId])

    const handleAddTask = async (data) => {
        try {
            await Axios.post(`/boards/${boardId}/tasks`, data)
            setShowForm(false)
            fetchTasks()
        } catch (err) {
            console.log(err);
            
        }
    }

    // Drag and drop handlers
    const onDragStart = (e, taskId) => {
        e.dataTransfer.setData('taskId', taskId)
    }

    const onDrop = async (e, newStatus) => {
        const taskId = e.dataTransfer.getData('taskId')
        try {
            await Axios.put(`/boards/${boardId}/tasks/${taskId}`, { status: newStatus })
            fetchTasks()
        } catch (err) {
            console.log(err);
            
        }
    }

    const onDragOver = (e) => {
        e.preventDefault()
    }

    // Split tasks by status
    const todo = tasks.filter(t => t.status === 'To Do')
    const inProgress = tasks.filter(t => t.status === 'In Progess')
    const done = tasks.filter(t => t.status === 'Done')

    return (
        <div className='bg-gray-100'>
            <div className='flex justify-between items-center'>
                <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                <button className='bg-indigo-500 p-3 rounded text-white' onClick={() => setShowForm(true)}>Add New task</button>
            </div>
            {showForm ? (
                <AddTask onSubmit={handleAddTask} setShowForm={setShowForm} />
            ) : (
                <div className="grid grid-cols-3 gap-6 p-8">
                    {/* To Do */}
                    <div
                        className="bg-blue-100 rounded-lg p-4 min-h-[300px]"
                        onDrop={e => onDrop(e, 'To Do')}
                        onDragOver={onDragOver}
                    >
                        <h2 className="text-xl font-bold mb-2">To Do</h2>
                        {todo.length === 0 && <div>No tasks.</div>}
                        {todo.map(task => (
                            <div
                                key={task._id}
                                className="bg-white rounded shadow p-4 mb-3 cursor-move"
                                draggable
                                onDragStart={e => onDragStart(e, task._id)}
                            >
                                {task.title}
                            </div>
                        ))}
                    </div>
                    {/* In Progress */}
                    <div
                        className="bg-yellow-100 rounded-lg p-4 min-h-[300px]"
                        onDrop={e => onDrop(e, 'In Progess')}
                        onDragOver={onDragOver}
                    >
                        <h2 className="text-xl font-bold mb-2">In Progress</h2>
                        {inProgress.length === 0 && <div>No tasks.</div>}
                        {inProgress.map(task => (
                            <div
                                key={task._id}
                                className="bg-white rounded shadow p-4 mb-3 cursor-move"
                                draggable
                                onDragStart={e => onDragStart(e, task._id)}
                            >
                                {task.title}
                            </div>
                        ))}
                    </div>
                    {/* Done */}
                    <div
                        className="bg-green-100 rounded-lg p-4 min-h-[300px]"
                        onDrop={e => onDrop(e, 'Done')}
                        onDragOver={onDragOver}
                    >
                        <h2 className="text-xl font-bold mb-2">Done</h2>
                        {done.length === 0 && <div>No tasks.</div>}
                        {done.map(task => (
                            <div
                                key={task._id}
                                className="bg-white flex items-center justify-between rounded shadow p-4 mb-3 cursor-move"
                                draggable
                                onDragStart={e => onDragStart(e, task._id)}
                            >
                                {task.title}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}