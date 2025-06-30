import React from 'react'
import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useForm } from "react-hook-form";
import Axios from '../api/Axios';
export default function AddBoard({ open, setOpen }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [errorMsg, setErrorMsg] = useState('');

    const onSubmit = async (data) => {
        setErrorMsg('');
        try {
            const response = await Axios.post('boards/create-board', { board: data.board });
            if (response.status === 201) {
                setOpen(false);
                reset();
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMsg(error.response.data.message);
            } else {
                setErrorMsg("Something went wrong. Please try again.");
            }
        }
    }


    return (
        <div>
            <button
                onClick={() => setOpen(true)}
                className="rounded-md bg-gray-950/5 px-2.5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-950/10"
            >
                Open dialog
            </button>
            <Dialog open={open} onClose={setOpen} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        ><form onSubmit={handleSubmit(onSubmit)}>

                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">

                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <DialogTitle as="h3" className="text-2xl font-semibold text-gray-900">
                                                Add New Board
                                            </DialogTitle>
                                            <div className="mt-2">
                                                <input
                                                    type='text'
                                                    {...register('board', { required: 'Board name is required' })}
                                                    className='p-3 w-full border'
                                                    placeholder='add board here ...'
                                                />
                                                {errors.board && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.board.message}</p>
                                                )}
                                                {errorMsg && (
                                                    <p className="text-red-600 text-sm mt-2">{errorMsg}</p>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type='submit'
                                        className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto"
                                    >
                                        Submit
                                    </button>
                                    <button
                                        type="button"
                                        data-autofocus
                                        onClick={() => setOpen(false)}
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </div >
            </Dialog >
        </div >
    )
}
