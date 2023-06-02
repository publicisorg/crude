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
                setTasks(data.data.filter((task: any) => task.user == null || task.user == ""))
            } else {
                setTasks(data.data);
            }
        })
    }, [])

    useEffect(() => {
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
    }, [tasks])

    async function getTasksData() {
        if (props.userFilter == "*" || props.userFilter == "") {
            const data = await supabase.from('tasks').select('*');
            return data;
        } else {
            const data = await supabase.from('tasks').select('*').eq('user', props.userFilter);
            return data;
        }
    }

    function buildMultipleTasks() {
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

    console.log(props.isSupervisor);

    return (
        <div className={`mx-auto ${props.desktop ? "" : "p-8"} flex flex-col gap-4`}>
            {!props.desktop && <h1 className="text-3xl font-bold mb-4">Tareas</h1>}
            <div className={`${props.desktop ? "" : "border rounded shadow-lg"} grid grid-cols-1 gap-4`} style={{ borderColor: props.borderColor }}>
                <table className="min-w-full overflow-x-scroll" >
                    <thead className="border-b" style={{ borderColor: props.borderColor, backgroundColor: props.secondaryColor }}>
                        <tr>
                            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">
                                Titulo
                            </th>
                            {(props.role == "supervisor" || props.role == "account") && <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">
                                Asignado a
                            </th>}
                            {(props.role != "account" && !(props.role == "supervisor" && props.desktop == true)) && <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">
                                Autor
                            </th>}
                            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">
                                Estado
                            </th>
                            
                            {!props.desktop && <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>}
                        </tr>
                    </thead>
                    <tbody style={{ backgroundColor: props.secondaryColor }}>
                            {buildMultipleTasks()}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TasksTable;