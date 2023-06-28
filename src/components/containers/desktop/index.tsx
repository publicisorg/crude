import { useEffect, useState } from "react";
import TasksTable from "../tasks";
import { AiOutlineCheck, AiOutlineCoffee, AiOutlineExclamationCircle } from "react-icons/ai";
import DataCard, { DataTasks } from "./cards";
import Dashboard from "../../common/pieChart/dashboard";

function Desktop(props: any) {

    useEffect(() => {
        document.title = "Escritorio";
    }, [])

    const [inProcess, setInProcess] = useState(0);
    const [notStarted, setNotStarted] = useState(0);
    const [done, setDone] = useState(0);

    const containerStyle = "p-8 rounded";
    const pStyle = "text-3xl";

    return (
        <>
            <div className="flex flex-col gap-8 h-full p-8 relative">
                <div className="flex flex-row h-auto gap-8">
                    <DataCard title="Sin iniciar" data={notStarted} iconBg="bg-red-500" borderColor={props.borderColor} cardBg={props.cardBg}>
                        <AiOutlineExclamationCircle className="w-9 h-9" />
                    </DataCard>
                    <DataCard title="En Proceso" data={inProcess} iconBg="bg-orange-500" borderColor={props.borderColor} cardBg={props.cardBg}>
                        <AiOutlineCoffee className="w-9 h-9" />
                    </DataCard>
                    <DataCard title="Completadas" data={done} iconBg="bg-green-500" borderColor={props.borderColor} cardBg={props.cardBg}>
                        <AiOutlineCheck className="w-9 h-9" />
                    </DataCard>
                    

                </div>
            
                
                <div className="flex flex-row justify-center items-center w-full h-full gap-8">
                   
                    <DataTasks title={props.role == "supervisor" ? "Tareas de tu equipo" : "Tus tareas"} containerStyle={containerStyle} pStyle={pStyle} borderColor={props.borderColor} cardBg={props.cardBg}>
                        <TasksTable userFilter={props.user} setInProcess={setInProcess} setNotStarted={setNotStarted} setDone={setDone} desktop={true} role={props.role} borderColor={props.borderColor} secondaryColor={props.secondaryColor}/>
                    </DataTasks>
                    <DataTasks title="Tareas sin asignar" containerStyle={containerStyle} pStyle={pStyle} borderColor={props.borderColor} cardBg={props.cardBg}>
                        <TasksTable userFilter={""} desktop={true} role={props.role} borderColor={props.borderColor} secondaryColor={props.secondaryColor}/>
                    </DataTasks>
                </div>
            </div>
        </>
    )
}

export function DesktopDirector(_props: any) {

    useEffect(() => {
        document.title = "Escritorio";
    }, [])

    return (
        <div className="w-full h-full justify-center items-center">
            <Dashboard></Dashboard>
        </div>
    )
}

export default Desktop
