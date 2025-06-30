import React, { useState, useEffect } from 'react'
import AddBoard from './AddBoard'
import Axios from '../api/Axios'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'
import Tasks from './Tasks.JSX'

export default function Home() {
    const [open, setOpen] = useState(false)
    const [boards, setBoards] = useState([])
    const [selectedBoardId, setSelectedBoardId] = useState(null)

    // Fetch boards from backend
    const fetchBoards = async () => {
        try {
            const res = await Axios.get('boards/get-board')
            setBoards(res.data.boards)
            // Set first board as selected by default
            if (res.data.boards.length && !selectedBoardId) {
                setSelectedBoardId(res.data.boards[0]._id)
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchBoards()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (!open) fetchBoards()
        // eslint-disable-next-line
    }, [open])

    return (
        <div className="bg-gray-950 h-screen w-full grid grid-cols-12">
            {/* Sidebar */}
            <aside className="col-span-2 bg-gray-300 p-4 flex flex-col">
                <h2 className="text-xl font-bold mb-6">Sidebar</h2>
                <button
                    className='bg-indigo-500 text-white hover:bg-indigo-400 font-bold p-3 inline-flex items-center gap-2  rounded'
                    onClick={() => setOpen(true)}>Create New Board <PlusCircleIcon className='size-6 ' />  </button>
                <br />
                <nav className="flex flex-col gap-4">
                    {boards.map(board => (
                        <button
                            key={board._id}
                            onClick={() => setSelectedBoardId(board._id)}
                            className={`text-left hover:text-amber-900 bg-gray-200 p-3 rounded ${selectedBoardId === board._id ? 'bg-amber-200 font-bold' : ''}`}
                        >
                            {board.name}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="col-span-10 bg-gray-100 p-3">
                <Tasks boardId={selectedBoardId} />
            </main>

            <AddBoard open={open} setOpen={setOpen} />


        </div>
    )
}