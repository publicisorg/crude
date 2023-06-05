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

    async function getTasksData() {
        if (props.userFilter == "*") {
            const data = await supabase.from('tasks').select('*');
            return data;
        } else {
            const data = await supabase.from('tasks').select('*').eq('done', false);
            return data;
        }
    }


    function buildMultipleTasks() {
        if (tasks != null) {
            if (tasks.length > 0) {
                const jsx: any = [];
                tasks.forEach((element: any, index: any) => {
                    jsx.push(<Notification handleTimer={props.handleTimer} index={index} element={element} borderColor={props.borderColor} secondaryColor={props.secondaryColor} />)
                });

                return jsx;
            } else {
                return "";
            }
        }
    }

    return (
        <div className="mx-auto p-8 flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Actividad</h1>
            {buildMultipleTasks()}
        </div>
    );
}
