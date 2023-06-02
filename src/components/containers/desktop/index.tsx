import { useEffect, useState } from "react";
import TasksTable from "../tasks";
import { AiOutlineCheck, AiOutlineCoffee, AiOutlineExclamationCircle } from "react-icons/ai";
import DataCard, { DataTasks } from "./cards";

function Desktop(props: any) {

    useEffect(() => {
        document.title = "Escritorio";
    }, [])

    const [inProcess, setInProcess] = useState(0);
    const [notStarted, setNotStarted] = useState(0);
    const [done, setDone] = useState(0);

    const containerStyle = "bg-white/10 p-8 rounded";
    const pStyle = "text-3xl";

    return (
        <>
            <div className="flex flex-col gap-8 h-full p-8 relative">
                <div className="flex flex-row h-auto gap-8">
                    <DataCard title="Sin iniciar" data={notStarted} iconBg="bg-red-500" borderColor={props.borderColor}>
                        <AiOutlineExclamationCircle className="w-9 h-9" />
                    </DataCard>
                    <DataCard title="En Proceso" data={inProcess} iconBg="bg-orange-500" borderColor={props.borderColor}>
                        <AiOutlineCoffee className="w-9 h-9" />
                    </DataCard>
                    <DataCard title="Completadas" data={done} iconBg="bg-green-500" borderColor={props.borderColor}>
                        <AiOutlineCheck className="w-9 h-9" />
                    </DataCard>
                </div>
                <div className="flex flex-row justify-center items-center w-full h-full gap-8">
                    <DataTasks title={"Tus tareas"} containerStyle={containerStyle} pStyle={pStyle} borderColor={props.borderColor}>
                        <TasksTable userFilter={props.user} setInProcess={setInProcess} setNotStarted={setNotStarted} setDone={setDone} desktop={true} isAccount={props.isAccount == "account" ? true : false} borderColor={props.borderColor} secondaryColor={props.secondaryColor}/>
                    </DataTasks>
                    <DataTasks title="Tareas sin asignar" containerStyle={containerStyle} pStyle={pStyle} borderColor={props.borderColor}>
                        <TasksTable userFilter={""} desktop={true} isSupervisor={props.role == "supervisor" ? true : false} isAccount={props.role == "account" ? true : false} borderColor={props.borderColor} secondaryColor={props.secondaryColor}/>
                    </DataTasks>
                </div>
            </div>
        </>
    )
}

export function DesktopDirector(props: any) {

    useEffect(() => {
        document.title = "Escritorio";
    }, [])

    return (
        <div className="w-full h-full justify-center items-center">
            En construccion.
        </div>
    )
}

export default Desktop
