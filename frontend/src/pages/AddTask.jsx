import React from 'react'
import { useForm } from 'react-hook-form'

export default function AddTask({ onSubmit, setShowForm }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    return (
        <form
            onSubmit={handleSubmit((data) => {
                onSubmit && onSubmit(data)
                reset()
            })}
            className="space-y-4 bg-white p-8 rounded shadow"

        >
            <div>
                <label className="block font-semibold mb-1">Title</label>
                <input
                    {...register('title', { required: 'Title is required' })}
                    className="border p-2 w-full rounded"
                />
                {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
            </div>

            <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                    {...register('description')}
                    className="border p-2 w-full rounded"
                />
            </div>

            <div>
                <label className="block font-semibold mb-1">Status</label>
                <select
                    {...register('status', { required: 'Status is required' })}
                    className="border p-2 w-full rounded"
                >
                    <option value="">Select status</option>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
                {errors.status && <span className="text-red-500 text-sm">{errors.status.message}</span>}
            </div>

            <div>
                <label className="block font-semibold mb-1">Priority</label>
                <select
                    {...register('priority', { required: 'Priority is required' })}
                    className="border p-2 w-full rounded"
                >
                    <option value="">Select priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                {errors.priority && <span className="text-red-500 text-sm">{errors.priority.message}</span>}
            </div>

            <div>
                <label className="block font-semibold mb-1">Assigned To</label>
                <input
                    {...register('assignedTo')}
                    className="border p-2 w-full rounded"
                />
            </div>

            <div>
                <label className="block font-semibold mb-1">Due Date</label>
                <input
                    type="date"
                    {...register('dueDate')}
                    className="border p-2 w-full rounded"
                />
            </div>

            {/* boardId should be set from parent, not user input */}

            <div className='flex items-center justify-between'>
                <button
                    type="submit"
                    className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
                >
                    Add Task
                </button>
                <button
                    type='button'
                    onClick={() => setShowForm(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Close
                </button>
            </div>
        </form>

    )
}