import { useEffect, useState } from 'react'
import { supabase } from '../../../supabase/client'
import { GenericSelect } from '../selectors/selectUsers'
import GenericInput from '../inputs/inputs'
import MultipleUsers from './multipleUsers'
import WysiwygTextarea from '../Textarea'
export const TaskForm = (props: any) => {
    const [client, setClient] = useState("")
    const [marca, setMarca] = useState("")
    const [projet, setProject] = useState("")
    const [users, setUsers] = useState<any>([])
    const [date, setDate] = useState("")
    const [comment, setComment] = useState<any>([])
    const [state, setState] = useState("")
    const [priority, setPriority] = useState("NINGUNA")
    const [authUser, setAuthUser] = useState("SIN ASIGNAR")
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

    const taskPriority = [
        { value: "NINGUNA", displayValue: "NINGUNA" },
        { value: "POCA", displayValue: "POCA" },
        { value: "NORMAL", displayValue: "NORMAL" },
        { value: "ALTA", displayValue: "ALTA" },
        { value: "MUY ALTA", displayValue: "MUY ALTA" },
        { value: "URGENTE", displayValue: "URGENTE" }];

    useEffect(() => {
        document.title = "Nueva Tarea";
        getAuthUser();
    }, [])

    function getAuthUser() {
        try {
            const user: any = supabase.auth.getUser()
            user.then((userId: any) => { setAuthUser(userId.data.user.id) })
        }
        catch (error) {
            console.error(error);
        }
    }

    function handleSubmit(e: any) {
        e.preventDefault();
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
        });
    }

    function addUser(id: any, userId: any, hours: any, price: any, userFullname: any) {
        setUsers([
            ...users,
            { id: id, userId: userId, hours: hours, price: price, userFullname: userFullname }
        ])
    }

    function removeUser(id: any) {
        setUsers(users.filter((user: any) => user.id !== id));
    }

    const handleTextareaChange = (value: string) => {
        setComment(
            [
                {
                    id: 0,
                    comment: value,
                    lastChange: "CREATED",
                    userId: authUser,
                    time: Date.now()
                }
            ]
        );
    };

    async function impactDataOnTable() {
        const result = await supabase.from('tasks').insert({
            name: projet,
            client: client,
            marca: marca,
            user: users,
            date: date,
            status: state,
            priority: priority,
            comment: comment,
            userId: authUser
        })
        return result;
    }

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
                <GenericSelect required={true} label="Estado:" data={taskStates} onChange={setState} secondaryColor={props.secondaryColor} borderColor={props.borderColor} />
                <GenericSelect required={true} label="Prioridad:" data={taskPriority} onChange={setPriority} secondaryColor={props.secondaryColor} borderColor={props.borderColor} />
                <GenericInput required={true} function={setDate} label="Fecha de entrega:" type="date" id="finishDate" name="finishDate" secondaryColor={props.secondaryColor} borderColor={props.borderColor} />
                <WysiwygTextarea function={handleTextareaChange} label="Comentario:" id="comment" name="comment" />
                <button
                    type="submit"
                    className="bg-green-500/30 hover:bg-green-700 w-full flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-lg"
                >
                    <span className="flex items-center rounded-md text-sm px-4 py-2">Crear nueva tarea</span>
                </button>
            </form>

            {showSuccess && <div className={`${successOpacity} w-full flex flex-row justify-center items-center py-2 px-4 rounded-lg bg-lime-600 duration-300`}>La tarea se ha creado correctamente.</div>}
        </div>

    )
}
