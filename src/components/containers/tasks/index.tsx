import { useEffect, useState } from "react";
import { supabase } from "../../../supabase/client";
import SingleTask from "./singleTask";

function TasksTable(props: any) {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTasksData().then((data: any) => {
            if (props.userFilter == "") {
                setTasks(data.data.filter((task:any) => task.user == null || task.user == ""))
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
                jsx.push(<SingleTask index={index} element={element} desktop={props.desktop} />)
            });

            return jsx;
        } else {
            return "";
        }
    }

    return (
        <div className={`container mx-auto ${props.desktop ? "" : "px-4 py-8"} flex flex-col gap-4`}>
            {!props.desktop && <h1 className="text-3xl font-bold mb-4">Tareas</h1>}
            <div className="grid grid-cols-1 gap-4">

                <table className="min-w-full overflow-x-scroll divide-y divide-gray-200">
                    <thead className="bg-gray-50/10">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase">
                                Titulo
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase">
                                Autor
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase">
                                Estado
                            </th>

                            {!props.desktop && <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>}
                        </tr>
                    </thead>
                    <tbody className="bg-white/30 divide-y divide-gray-200">

                        {buildMultipleTasks()}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TasksTable;