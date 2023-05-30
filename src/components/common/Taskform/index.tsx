import { useState } from 'react'
import { supabase } from '../../../supabase/client'
export const TaskForm = () => {
    const [client, setClient] = useState("")
    const [marca, setMarca] = useState("")
    const [projet, setProject] = useState("")
    const [usuario, setUser] = useState("")
    const [date, setDate] = useState("")
    const [comment, setComment] = useState("")

    const handleSubmit = async e => {
        e.preventDefault()

        try {

            const user = supabase.auth.getUser()

            user.then((userId) => {

                const result =  supabase.from('tasks').insert({
                    name: projet,
                    client: client,
                    marca: marca,
                    user: usuario,
                    date: date,
                    comment: comment,
                
                })
            })
        }

        catch (error) {

            console.error(error);
        }
    }
    return (
        <div className='flex flex-col justify-center items-center w-full h-screen text-left'>
            <h2 className='text-2xl text-left'>Nueva Tarea</h2>
            <form className="flex flex-col gap-6 w-1/2" onSubmit={handleSubmit}>
                <div>
                    <div className="mb-2 block"><label className="text-sm font-medium text-gray-900 dark:text-gray-300" data-testid="flowbite-label" >Cliente</label></div>
                    <div className="flex">
                        <div className="relative w-full">
                            <input
                                className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 rounded-lg shadow-sm dark:shadow-sm-light p-2.5 text-sm"
                                placeholder="L'Oreal"
                                type="text"
                                onChange={e => setClient(e.target.value)}

                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="mb-2 block"><label className="text-sm font-medium text-gray-900 dark:text-gray-300" data-testid="flowbite-label">Marca</label></div>
                    <div className="flex">
                        <div className="relative w-full">
                            <input
                                className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 rounded-lg shadow-sm dark:shadow-sm-light p-2.5 text-sm"
                                type="text"
                                onChange={e => setMarca(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="mb-2 block"><label className="text-sm font-medium text-gray-900 dark:text-gray-300" data-testid="flowbite-label">Proyecto</label></div>
                    <div className="flex">
                        <div className="relative w-full">
                            <input
                                className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 rounded-lg shadow-sm dark:shadow-sm-light p-2.5 text-sm"


                                type="text"
                                onChange={e => setProject(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="mb-2 block"><label className="text-sm font-medium text-gray-900 dark:text-gray-300" data-testid="flowbite-label">Asignar a: </label></div>
                    <div className="flex">
                        <div className="relative w-full">
                            <input
                                className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 rounded-lg shadow-sm dark:shadow-sm-light p-2.5 text-sm"


                                type="text"
                                onChange={e => setUser(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="mb-2 block"><label className="text-sm font-medium text-gray-900 dark:text-gray-300" data-testid="flowbite-label">Fecha de entrega: </label></div>
                    <div className="flex">
                        <div className="relative w-full">
                            <input
                                className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 rounded-lg shadow-sm dark:shadow-sm-light p-2.5 text-sm"


                                type="date"
                                onChange={e => setDate(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="mb-2 block"><label className="text-sm font-medium text-gray-900 dark:text-gray-300" data-testid="flowbite-label">Comentario: </label></div>
                    <div className="flex">
                        <div className="relative w-full">
                            <textarea
                                className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 rounded-lg shadow-sm dark:shadow-sm-light p-2.5 text-sm"


                                onChange={e => setComment(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="text-white bg-cyan-700 border border-transparent hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 disabled:hover:bg-cyan-700 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 dark:disabled:hover:bg-cyan-600 focus:!ring-2 group flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-lg"
                >
                    <span className="flex items-center rounded-md text-sm px-4 py-2">Crear nueva tarea</span>
                </button>
            </form>

        </div>
    )
}
