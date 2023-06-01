import { useEffect, useState } from "react";
import TasksTable from "../tasks";
import { AiOutlineCheck, AiOutlineCoffee, AiOutlineExclamationCircle } from "react-icons/ai";

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
                    <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white/10 rounded mb-6 xl:mb-0 shadow-lg">
                            <div className="flex-auto p-4">
                                <div className="flex flex-wrap">
                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        <h5 className="uppercase font-bold text-lg">Sin iniciar</h5>
                                        <span className="font-semibold text-7xl text-blueGray-700">{notStarted}</span>
                                    </div>
                                    <div className="relative w-auto pl-4 flex-initial">
                                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500"><AiOutlineExclamationCircle className="w-9 h-9" /></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white/10 rounded mb-6 xl:mb-0 shadow-lg">
                            <div className="flex-auto p-4">
                                <div className="flex flex-wrap">
                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        <h5 className="uppercase font-bold text-lg">En Proceso</h5>
                                        <span className="font-semibold text-7xl">{inProcess}</span>
                                    </div>
                                    <div className="relative w-auto pl-4 flex-initial">
                                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500"><AiOutlineCoffee className="w-9 h-9" /></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white/10 rounded mb-6 xl:mb-0 shadow-lg">
                            <div className="flex-auto p-4">
                                <div className="flex flex-wrap">
                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        <h5 className="uppercase font-bold text-xl">Completadas</h5>
                                        <span className="font-semibold text-7xl text-blueGray-700">{done}</span>
                                    </div>
                                    <div className="relative w-auto pl-4 flex-initial">
                                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-green-500"><AiOutlineCheck className="w-9 h-9" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="flex flex-row justify-center items-center w-full h-2/3 my-4 gap-8 px-4">
                    <div className={`${containerStyle} w-1/2 p-4 rounded flex flex-col h-full`}>
                        <p className={`${pStyle}`}>Tus tareas</p>
                        <div className="w-full h-full mt-4 bg-black/25 rounded overflow-y-auto">
                            <TasksTable userFilter={props.userId} setInProcess={setInProcess} setNotStarted={setNotStarted} setDone={setDone} desktop={true} />
                        </div>
                    </div>
                    <div className={`${containerStyle} w-1/2 p-4  rounded flex flex-col h-full`}>
                        <p className={`${pStyle}`}>Tareas sin asignar</p>
                        <div className="w-full h-full mt-4 bg-black/25 rounded overflow-y-auto">
                            <TasksTable userFilter={""} desktop={true} />
                        </div>
                    </div>
                </div>
            </div>   </>
    )
}

export function DesktopSupervisor(props: any) {

    const [inProcess, setInProcess] = useState(0);
    const [notStarted, setNotStarted] = useState(0);
    const [done, setDone] = useState(0);

    useEffect(() => {
        document.title = "Escritorio";
    }, [])

    const containerStyle = "bg-black/10 dark:bg-white/10 p-8 rounded";
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
                <div className={`${containerStyle} w-full p-4 rounded flex flex-col h-full`}>
                    <p className={`${pStyle}`}>Tus tareas</p>
                    <div className="w-full h-full mt-4 bg-black/25 rounded overflow-y-auto">
                        <TasksTable userFilter="*" setInProcess={setInProcess} setNotStarted={setNotStarted} setDone={setDone} desktop={true} />
                    </div>
                </div>
                <div className={`${containerStyle} w-full p-4  rounded flex flex-col h-full`}>
                    <p className={`${pStyle}`}>Tareas sin asignar</p>
                    <div className="w-full h-full mt-4 bg-black/25 rounded overflow-y-auto">
                        <TasksTable userFilter={""} desktop={true} />
                    </div>
                </div>
            </div>
        </div>

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
