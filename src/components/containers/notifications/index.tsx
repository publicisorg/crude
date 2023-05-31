import { useEffect, useState } from "react";
import { supabase } from "../../../supabase/client";

import { Notification } from "../../common/notification"



export function Notifications(props: any) {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        document.title = "Actividad";
    }, [])

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
          const data = await supabase.from('tasks').select('*').eq('user', props.userFilter).eq('done', false);
          return data;
      }
  }
  

    function buildMultipleTasks() {
        if (tasks.length > 0) {
            const jsx: any = [];
            tasks.forEach((element: any, index:any) => {
                jsx.push(<Notification index={index} element={element}/>)
            });

            return jsx;
        } else {
            return "";
        }
    }

    return (
      <div className="container mx-auto px-4 py-8 flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-4">Actividad</h1>
            {buildMultipleTasks()}
        </div>
    );
}
