import { useEffect, useState } from "react"
import Folders from "../folders"

import Desktop, { DesktopDirector, DesktopSupervisor } from "../desktop";
import { TaskForm } from "../../common/Taskform"
import { ProfileSettings } from "../profile"
import TasksTable from "../tasks";
import { Notifications } from "../notifications";
import Timer from "../../common/timer/timer";

function ContentContainer(props: any) {

    const [showComponent, setShowComponent] = useState(props.actualContent);
    const [role, setRole] = useState(props.role);
    const [timerOn, isTimerOn] = useState(false);
    const [timerTaskId, isTimerTaskId] = useState("1");

    useEffect(() => {
        setShowComponent(props.actualContent);
        setRole(props.role);
    })

    return (
        
        <section className="ml-80 h-screen relative overflow-y-auto">
            {true && <Timer timerSettingsStyle="floating" timerTaskId={timerTaskId}/>}
            {showComponent == "desktop" && role == "user" && <Desktop userId={props.userId} user={props.userId}/>}
            {showComponent == "desktop" && role == "supervisor" && <DesktopSupervisor userId={props.userId} user="*"/>}
            {showComponent == "desktop" && role == "director" && <DesktopDirector userId={props.userId} user="*"/>}
            {showComponent == "folders" && <Folders/>}
            {showComponent == "notifications" && <Notifications userFilter={props.userId}/>}
            {showComponent == "setting" && <ProfileSettings userId={props.userId} name={props.name} lastName={props.lastName} urlImg={props.urlImg} />}
            {showComponent == "createtasks" && <TaskForm/>}
            {showComponent == "tasks" && role == "user" && <TasksTable userFilter={props.userId}/>}
            {showComponent == "tasks" && role == "supervisor" && <TasksTable userFilter="*"/>}
            
        </section>
    )
}

export default ContentContainer
