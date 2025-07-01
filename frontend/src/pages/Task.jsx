import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useForm } from "react-hook-form";
import Axios from '../api/Axios';
export default function Task({ open, setOpen, task }) {
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
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg  text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-2xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <form onSubmit={handleSubmit(onSubmit)}>

                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">

                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">

                      <div className="mt-2">
                        <div className="container flex flex-col w-full min-w-xl p-6 mx-auto divide-y rounded-md divide-gray-500">
                          <div className="flex justify-between p-4">
                            <div className="flex space-x-4">
                              <div>
                                <DialogTitle as="h3" className="text-2xl font-semibold text-red-600">
                                  {task.title}
                                </DialogTitle>
                                <span className="text-xs text-red-600 dark:text-red-400">{task?.dueDate}</span>
                              </div>
                            </div>
                            <div className="flex items-center rounded px-3 p-2">
                              <h1 className="text-base  bg-amber-100 px-4 p-1 rounded font-bold">{task?.priority}</h1>
                            </div>
                          </div>
                          <div className="p-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <p>{task?.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
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
