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

    const containerStyle = "bg-black/10 dark:bg-white/10 p-8 rounded";
    const pStyle = "text-3xl";

    return (
        <>
            <div className="flex flex-col gap-4  h-full py-8">
                <div className="flex flex-wrap">
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
                <div className="flex flex-row justify-center items-center w-full h-2/3 my-4 gap-8 px-4">
                    <DataTasks title={"Tus tareas"} containerStyle={containerStyle} pStyle={pStyle} >
                        <TasksTable userFilter={props.user} setInProcess={setInProcess} setNotStarted={setNotStarted} setDone={setDone} desktop={true} />
                    </DataTasks>
                    <DataTasks title="Tareas sin asignar" containerStyle={containerStyle} pStyle={pStyle} >
                        <TasksTable userFilter={""} desktop={true} />
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
