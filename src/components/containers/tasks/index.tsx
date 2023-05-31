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
            const data = await supabase.from('tasks').select('*').eq('userId', props.userFilter);
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
        <div className="flex flex-col justify-start items-center">
            {buildMultipleTasks()}
        </div>
    );
}

export default TasksTable;