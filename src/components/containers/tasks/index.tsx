import { useEffect, useState } from "react";
import { supabase } from "../../../supabase/client";
import SingleTask from "./singleTask";

function TasksTable(props: any) {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        document.title = "Tareas";
    }, [])

    useEffect(() => {
        getTasksData().then((data: any) => {
            if (props.userFilter == "") {
                setTasks(data.data.filter((task: any) => task.user == null || task.user.length < 1));
            } else {
                if (props.userFilter == "*") {
                    setTasks(data.data.filter((task: any) => task.user != null && task.user.length > 0));
                } else {
                    const tasks: any = [];
                    data.data.forEach((element: any) => {
                        element.user.forEach((users: any) => {
                            if (users.userId === props.userFilter) {
                                tasks.push(element);
                            }
                        });
                    });
                    setTasks(tasks);
                }
            }
        })
    }, [])

    useEffect(() => {
        if (tasks != null) {
            if (tasks.length > 0) {
                if (props.userFilter != undefined && props.userFilter != "" && props.setNotStarted != undefined) {
                    const notStarted = tasks.filter((task: any) => task.status == "ASIGNADO");
                    props.setNotStarted(notStarted.length);
                }
                if (props.userFilter != undefined && props.userFilter != "" && props.setInProcess != undefined) {
                    const inProcess = tasks.filter((task: any) => task.user != null && task.user != "" && task.status != null && task.status != "ASIGNADO" && task.done == false);
                    props.setInProcess(inProcess.length);
                }
                if (props.userFilter != undefined && props.userFilter != "" && props.setDone != undefined) {
                    const done = tasks.filter((task: any) => task.done == true);
                    props.setDone(done.length);
                }
            }
        }
    }, [tasks])

    async function getTasksData() {
        const data = await supabase.from('tasks').select('*');
        return data;
    }

    function buildMultipleTasks() {
        if (tasks != null) {
            if (tasks.length > 0) {
                const jsx: any = [];
                tasks.forEach((element: any, index: any) => {
                    jsx.push(<SingleTask isSupervisor={props.role == "supervisor" ? true : false} isAccount={props.role == "account" ? true : false} index={index} element={element} desktop={props.desktop} borderColor={props.borderColor} secondaryColor={props.secondaryColor} />)
                });
                return jsx;
            } else {
                return "";
            }
        }
    }

    return (
        <div className={`mx-auto ${props.desktop ? "" : "p-8"} gap-4`}>
            {!props.desktop && <h1 className="text-3xl font-bold mb-4">Tareas</h1>}
            <div className={`${props.desktop ? "" : "border rounded shadow-lg"}`} style={{ borderColor: props.borderColor }}>
                <div className="min-w-full ">
                    <div className="border-b flex flex-col justify-between w-full" style={{ borderColor: props.borderColor, backgroundColor: props.secondaryColor }}>
                        <div className="flex flex-row justify-between items-center w-full border-b" style={{ borderColor: props.borderColor, backgroundColor: props.secondaryColor }}>
                            <div className={`px-6 py-3 text-xs font-medium tracking-wider text-left uppercase ${props.desktop ? "w-1/3" : "w-1/6"}`}>
                                Titulo
                            </div>
                            {(props.role == "supervisor" || props.role == "account") && <div className={`px-6 py-3 ${props.desktop ? "w-1/3" : "w-1/6"} text-xs font-medium tracking-wider text-center uppercase`}>
                                Asignado a
                            </div>}
                            {(props.role != "account" && !(props.role == "supervisor" && props.desktop == true)) && <div className={`px-6 py-3 ${props.desktop ? "w-1/3" : "w-1/6"} text-xs font-medium tracking-wider text-center uppercase`}>
                                Autor
                            </div>}
                            <div className={`px-6 py-3 text-xs font-medium tracking-wider text-center uppercase ${props.desktop ? "w-1/3" : "w-1/6"}`}>
                                Estado
                            </div>
                            <div className={`px-6 py-3 text-xs font-medium tracking-wider text-center uppercase ${props.desktop ? "w-1/3" : "w-1/6"}`}>
                                Prioridad
                            </div>
                            {!props.desktop && <div className={`relative px-6 py-3 ${props.desktop ? "w-1/3" : "w-1/6"}`}>
                                <span className="sr-only">Edit</span>
                            </div>}
                        </div>
                        <div style={{ backgroundColor: props.secondaryColor }}>
                            {buildMultipleTasks()}
                        </div>
                    </div>
                </div>
            </div>
            </div>
            );
}

            export default TasksTable;