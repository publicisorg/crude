import { useEffect, useState } from 'react'
import { supabase } from '../../../supabase/client'
import SelectUser from '../selectors/selectUsers'
export const TaskForm = () => {
    const [client, setClient] = useState("")
    const [marca, setMarca] = useState("")
    const [projet, setProject] = useState("")
    const [usuario, setUser] = useState("")
    const [date, setDate] = useState("")
    const [comment, setComment] = useState("")
    const [authUser, setAuthUser] = useState("")
    const [showSuccess, setShowSuccess] = useState(false)
    const [successOpacity, setSuccessOpacity] = useState("opacity-0")

    const handleSubmit = async (e:any) => {
        e.preventDefault()

        try {
            const user:any = supabase.auth.getUser()
            user.then((userId:any) => { setAuthUser(userId.data.user.id) })
        }

        catch (error) {

            console.error(error);
        }
    }

    async function impactDataOnTable() {
        const result = await supabase.from('tasks').insert({
            name: projet,
            client: client,
            marca: marca,
            user: usuario,
            date: date,
            comment: comment,
            userId: authUser
        })
        return result;
    }

    useEffect(() => {
        if (authUser != "") {
            impactDataOnTable().then((result:any) => {
                if (result.status == 201) {
                    setShowSuccess(true);
                    setTimeout(() => {
                        setSuccessOpacity('opacity-100');
                    }, 10);
                    setTimeout(() => {
                        setSuccessOpacity('opacity-0');
                    }, 3010);
                    setTimeout(() => {
                        setShowSuccess(false);
                    }, 3320);
                }
                setAuthUser("");
            });
        }
    }, [authUser])

    return (
        <div className='container mx-auto px-4 py-8 flex flex-col gap-4'>
            <h1 className="text-3xl font-bold mb-4">Nueva Tarea</h1>
            <form className="flex flex-col gap-6 w-2/3 p-8 bg-white/10 rounded-lg" onSubmit={handleSubmit}>
               <div className='flex gap-3'> 
                <div className='w-1/2'>
                    <div className="mb-2 block"><label className="text-sm font-medium text-gray-900 dark:text-gray-300" data-testid="flowbite-label" >Cliente</label></div>
                    <div className="flex">
                        <div className="relative w-full">
                            <input required
                                className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50/10 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-50/10 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 rounded-lg shadow-sm dark:shadow-sm-light p-2.5 text-sm"
                                placeholder="L'Oreal"
                                type="text"
                                onChange={e => setClient(e.target.value)}

                            />
                        </div>
                    </div>
                </div>
                <div className='w-1/2'>
                    <div className="mb-2 block"><label className="text-sm font-medium text-gray-900 dark:text-gray-300" data-testid="flowbite-label">Marca</label></div>
                    <div className="flex">
                        <div className="relative w-full">
                            <input required
                                className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50/10 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-50/10 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 rounded-lg shadow-sm dark:shadow-sm-light p-2.5 text-sm"
                                type="text"
                                onChange={e => setMarca(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                </div>
                <div>
                    <div className="mb-2 block"><label className="text-sm font-medium text-gray-900 dark:text-gray-300" data-testid="flowbite-label">Proyecto</label></div>
                    <div className="flex">
                        <div className="relative w-full">
                            <input required
                                className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50/10 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-50/10 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 rounded-lg shadow-sm dark:shadow-sm-light p-2.5 text-sm"


                                type="text"
                                onChange={e => setProject(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <SelectUser setUser={setUser}/>
                <div>
                    <div className="mb-2 block"><label className="text-sm font-medium text-gray-900 dark:text-gray-300" data-testid="flowbite-label">Fecha de entrega: </label></div>
                    <div className="flex">
                        <div className="relative w-full">
                            <input required
                                className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50/10 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-50/10 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 rounded-lg shadow-sm dark:shadow-sm-light p-2.5 text-sm"


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
                            <textarea required
                                className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50/10 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-50/10 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 rounded-lg shadow-sm dark:shadow-sm-light p-2.5 text-sm"


                                onChange={e => setComment(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="text-white bg-green-500/30 hover:bg-green-700 w-1/2   flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-lg"
                >
                    <span className="flex items-center rounded-md text-sm px-4 py-2">Crear nueva tarea</span>
                </button>
            </form>

        {showSuccess && <div className={`${successOpacity} w-96 flex flex-row justify-center items-center py-2 px-4 rounded-lg bg-lime-600 duration-300`}>La tarea se ha creado correctamente.</div>}
        </div>

    )
}
