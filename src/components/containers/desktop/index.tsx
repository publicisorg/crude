import { useState } from "react";
import TasksTable from "../tasks";

function Desktop(props: any) {

    const [inProcess, setInProcess] = useState(0);
    const [notStarted, setNotStarted] = useState(0);
    const [done, setDone] = useState(0);

    const containerStyle = "bg-black/10 dark:bg-white/10 p-8 rounded-2xl";
    const pStyle = "text-3xl";

    return (
        <div className="flex flex-col gap-8 justify-start items-center h-full py-8">
            <div className="flex flex-row justify-center items-center w-full h-1/3 gap-8 px-8">
                <div className={`${containerStyle} w-full h-full`}>
                    <p className={`${pStyle}`}>Sin iniciar</p>
                    <span className="w-full h-full flex justify-center items-center text-7xl">{notStarted}</span>
                </div>
                <div className={`${containerStyle} w-full h-full`}>
                    <p className={`${pStyle}`}>En Proceso</p>
                    <span className="w-full h-full flex justify-center items-center text-7xl">{inProcess}</span>
                </div>
                <div className={`${containerStyle} w-full h-full`}>
                    <p className={`${pStyle}`}>Completadas</p>
                    <span className="w-full h-full flex justify-center items-center text-7xl">{done}</span>
                </div>
            </div>
            <div className="flex flex-row justify-center items-center w-full h-2/3 gap-8 px-8">
                <div className={`${containerStyle} w-full p-4 rounded-2xl flex flex-col h-full`}>
                    <p className={`${pStyle}`}>Tus tareas</p>
                    <div className="w-full h-full mt-4 bg-black/25 rounded-2xl overflow-y-auto">
                        <TasksTable userFilter={props.userId} setInProcess={setInProcess} setNotStarted={setNotStarted} setDone={setDone} desktop={true}/>
                    </div>
                </div>
                <div className={`${containerStyle} w-full p-4  rounded-2xl flex flex-col h-full`}>
                    <p className={`${pStyle}`}>Tareas sin asignar</p>
                    <div className="w-full h-full mt-4 bg-black/25 rounded-2xl overflow-y-auto">
                        <TasksTable userFilter={""} desktop={true}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function DesktopSupervisor(props: any) {

    const [inProcess, setInProcess] = useState(0);
    const [notStarted, setNotStarted] = useState(0);
    const [done, setDone] = useState(0);

    const containerStyle = "bg-black/10 dark:bg-white/10 p-8 rounded-2xl";
    const pStyle = "text-3xl";

    return (
        <div className="flex flex-col gap-8 justify-start items-center h-full py-8">
            <div className="flex flex-row justify-center items-center w-full h-1/3 gap-8 px-8">
                <div className={`${containerStyle} w-full h-full`}>
                    <p className={`${pStyle}`}>Sin iniciar</p>
                    <span className="w-full h-full flex justify-center items-center text-7xl">{notStarted}</span>
                </div>
                <div className={`${containerStyle} w-full h-full`}>
                    <p className={`${pStyle}`}>En Proceso</p>
                    <span className="w-full h-full flex justify-center items-center text-7xl">{inProcess}</span>
                </div>
                <div className={`${containerStyle} w-full h-full`}>
                    <p className={`${pStyle}`}>Completadas</p>
                    <span className="w-full h-full flex justify-center items-center text-7xl">{done}</span>
                </div>
            </div>
            <div className="flex flex-row justify-center items-center w-full h-2/3 gap-8 px-8">
                <div className={`${containerStyle} w-full p-4 rounded-2xl flex flex-col h-full`}>
                    <p className={`${pStyle}`}>Tus tareas</p>
                    <div className="w-full h-full mt-4 bg-black/25 rounded-2xl overflow-y-auto">
                        <TasksTable userFilter="*" setInProcess={setInProcess} setNotStarted={setNotStarted} setDone={setDone} desktop={true}/>
                    </div>
                </div>
                <div className={`${containerStyle} w-full p-4  rounded-2xl flex flex-col h-full`}>
                    <p className={`${pStyle}`}>Tareas sin asignar</p>
                    <div className="w-full h-full mt-4 bg-black/25 rounded-2xl overflow-y-auto">
                        <TasksTable userFilter={""} desktop={true}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function DesktopDirector(props: any) {

    return (
        <div className="w-full h-full justify-center items-center">
            En construccion.
        </div>
    )
}

export default Desktop
