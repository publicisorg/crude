import { useEffect, useState } from 'react'
import { supabase } from '../../../supabase/client'
import SelectUser, { GenericSelect } from '../selectors/selectUsers'
import GenericInput from '../inputs/inputs'
import MultipleUsers from './multipleUsers'
export const TaskForm = (props: any) => {
    const [client, setClient] = useState("")
    const [marca, setMarca] = useState("")
    const [projet, setProject] = useState("")
    const [users, setUsers] = useState<any>([])
    const [date, setDate] = useState("")
    const [comment, setComment] = useState("")
    const [state, setState] = useState("")
    const [authUser, setAuthUser] = useState("")
    const [showSuccess, setShowSuccess] = useState(false)
    const [successOpacity, setSuccessOpacity] = useState("opacity-0")

    const taskStates = [
        { value: "SIN ASIGNAR", displayValue: "SIN ASIGNAR" },
        { value: "ASIGNADO", displayValue: "ASIGNADO" },
        { value: "AJUSTES", displayValue: "AJUSTES" },
        { value: "ENVIADO", displayValue: "ENVIADO" },
        { value: "EN TESTEO", displayValue: "EN TESTEO" },
        { value: "APROBADO", displayValue: "APROBADO" },
        { value: "FINALIZADO", displayValue: "FINALIZADO" }];

    useEffect(() => {
        document.title = "Nueva Tarea";
    }, [])

    function addUser(id: any, userId: any, hours: any, price: any, userFullname: any) {
        setUsers([
            ...users,
            { id: id, userId: userId, hours: hours, price: price, userFullname: userFullname }
        ])
    }

    function removeUser(id: any) {
        setUsers(users.filter((user: any) => user.id !== id));
    }

    useEffect(() => {
        console.log(users);
    }, [users])

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const user: any = supabase.auth.getUser()
            user.then((userId: any) => { setAuthUser(userId.data.user.id) })
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
            user: users,
            date: date,
            status: state,
            comment: comment,
            userId: authUser
        })
        return result;
    }

    useEffect(() => {
        if (authUser != "") {
            impactDataOnTable().then((result: any) => {
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
                } else {
                    console.log(result);
                }
                setAuthUser("");
            });
        }
    }, [authUser])

    return (
        <div className='mx-auto p-8 flex flex-col gap-4' >
            <h1 className="text-3xl font-bold mb-4">Nueva Tarea</h1>
            <form className="flex flex-col gap-6 p-8 bg-white/10 rounded border" onSubmit={handleSubmit} style={{ borderColor: props.borderColor }}>
                <div className='flex gap-3'>
                    <div className='w-1/2'>
                        <GenericInput required={true} function={setClient} label="Cliente:" placeholder={"L'Oreal"} type="text" id="client" name="client" secondaryColor={props.secondaryColor} borderColor={props.borderColor} />
                    </div>
                    <div className='w-1/2'>
                        <GenericInput required={true} function={setMarca} label="Marca:" placeholder={"Kiehls"} type="text" id="brand" name="brand" secondaryColor={props.secondaryColor} borderColor={props.borderColor} />
                    </div>
                </div>
                <GenericInput required={true} function={setProject} label="Proyecto:" placeholder={""} type="text" id="project" name="project" secondaryColor={props.secondaryColor} borderColor={props.borderColor} />
                <MultipleUsers addUser={addUser} removeUser={removeUser} users={users} secondaryColor={props.secondaryColor} borderColor={props.borderColor} />
                <GenericSelect label="Estado:" data={taskStates} function={setState} secondaryColor={props.secondaryColor} borderColor={props.borderColor} />
                <GenericInput required={true} function={setDate} label="Fecha de entrega:" type="date" id="finishDate" name="finishDate" secondaryColor={props.secondaryColor} borderColor={props.borderColor} />
                <GenericInput required={true} function={setComment} label="Comentario:" type="text" id="comment" name="comment" secondaryColor={props.secondaryColor} borderColor={props.borderColor} />
                <button
                    type="submit"
                    className="bg-green-500/30 hover:bg-green-700 w-1/2 flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-lg"
                >
                    <span className="flex items-center rounded-md text-sm px-4 py-2">Crear nueva tarea</span>
                </button>
            </form>

            {showSuccess && <div className={`${successOpacity} w-96 flex flex-row justify-center items-center py-2 px-4 rounded-lg bg-lime-600 duration-300`}>La tarea se ha creado correctamente.</div>}
        </div>

    )
}
