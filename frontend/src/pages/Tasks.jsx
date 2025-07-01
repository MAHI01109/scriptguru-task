import { useEffect, useState } from 'react'
import Axios from '../api/Axios'
import AddTask from './AddTask'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Task from './Task'

const STATUSES = ['To Do', 'In Progress', 'Done']

function TaskCard({ task, onMove }) {
    const [open, setOpen] = useState(false)
    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: { id: task._id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    return (
        <>
            <div
                ref={drag}
                className={`bg-white flex justify-between items-center rounded shadow p-4 mb-3 cursor-move opacity-${isDragging ? 50 : 100}`}
                style={{ opacity: isDragging ? 0.5 : 1 }}
            >
                {task.title}
                <button
                    type='button'
                    onClick={() => setOpen(true)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                        <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                    </svg>
                </button>

            </div>
            <Task open={open} setOpen={setOpen} task={task} />
        </>

    )
}

function TaskColumn({ status, tasks, onDropTask }) {
    console.log(tasks);

    const [{ isOver }, drop] = useDrop({
        accept: 'TASK',
        drop: (item) => onDropTask(item.id, status),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    })
    const bg =
        status === 'To Do'
            ? 'bg-blue-100'
            : status === 'In Progress'
                ? 'bg-yellow-100'
                : 'bg-green-100'
    const ring =
        isOver && status === 'To Do'
            ? 'ring-4 ring-blue-400'
            : isOver && status === 'In Progress'
                ? 'ring-4 ring-yellow-400'
                : isOver && status === 'Done'
                    ? 'ring-4 ring-green-400'
                    : ''
    return (
        <div
            ref={drop}
            className={`${bg} rounded-lg p-4 min-h-[300px] transition-all ${ring}`}
        >
            <h2 className="text-xl font-bold mb-2">{status}</h2>
            {tasks.length === 0 && <div>No tasks.</div>}
            {tasks.map((task) => (
                <TaskCard key={task._id} task={task} />
            ))}
        </div>
    )
}

export default function Tasks({ boardId }) {
    const [tasks, setTasks] = useState([])
    const [showForm, setShowForm] = useState(false);

    const fetchTasks = () => {
        if (boardId) {
            console.log(boardId);
            Axios.get(`/boards/${boardId}/tasks`)
                .then((res) => {
                    console.log(res.data.tasks);
                    return setTasks(res.data.tasks)
                })
                .catch(() => setTasks([]))

        }


    }

    useEffect(() => {
        fetchTasks()
        // eslint-disable-next-line
    }, [boardId, showForm])

    const handleAddTask = async (data) => {
        try {
            await Axios.post(`/boards/${boardId}/tasks`, data)
            setShowForm(false)
            fetchTasks()
        } catch (err) {
            console.log(err)
        }
    }

    const handleMoveTask = async (taskId, newStatus) => {
        try {
            await Axios.put(`/boards/${boardId}/tasks/${taskId}`, { status: newStatus })
            fetchTasks()
        } catch (err) {
            console.log(err)
        }
    }

    // Split tasks by status
    const tasksByStatus = (status) => tasks.filter((t) => t.status === status)

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="bg-gray-100">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                    <button
                        className="bg-indigo-500 p-3 rounded text-white"
                        onClick={() => setShowForm(true)}
                    >
                        Add New task
                    </button>
                </div>
                {showForm ? (
                    <AddTask onSubmit={handleAddTask} setShowForm={setShowForm} />
                ) : (
                    <div className="grid grid-cols-3 gap-6 p-8">
                        {STATUSES.map((status) => (
                            <TaskColumn
                                key={status}
                                status={status}
                                tasks={tasksByStatus(status)}
                                onDropTask={handleMoveTask}
                            />
                        ))}
                    </div>
                )}
            </div>
        </DndProvider>
    )
}