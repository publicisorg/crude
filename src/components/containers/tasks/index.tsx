import { useEffect, useState } from "react";
import { supabase } from "../../../supabase/client";
import SingleTask from "./singleTask";

function TasksTable(props: any) {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTasksData().then((data: any) => {
            setTasks(data.data);
        })
    }, [])

    async function getTasksData() {
        if (props.userFilter == "*") {
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
            tasks.forEach((element: any, index:any) => {
                jsx.push(<SingleTask index={index} element={element}/>)
            });

            return jsx;
        } else {
            return "";
        }
    }

    return (
        <div className="container mx-auto px-4 py-8 flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-4">Tareas</h1>
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

                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
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