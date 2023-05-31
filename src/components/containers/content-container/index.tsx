import { useEffect, useState } from "react"
import SheetData from "../../common/sheetdata/SheetData"
import Folders from "../folders"
import Table from "../table"

import Desktop, { DesktopDirector, DesktopSupervisor } from "../desktop";
import { TaskForm } from "../../common/Taskform"
import TasksTable from "../tasks";

function ContentContainer(props: any) {

    const [showComponent, setShowComponent] = useState(props.actualContent);
    const [role, setRole] = useState(props.role);

    useEffect(() => {
        setShowComponent(props.actualContent);
        setRole(props.role);
    })

    return (
        <section className="ml-80 h-screen relative overflow-y-auto">
            {showComponent == "desktop" && role == "user" && <Desktop userId={props.userId} user={props.userId}/>}
            {showComponent == "desktop" && role == "supervisor" && <DesktopSupervisor userId={props.userId} user="all"/>}
            {showComponent == "desktop" && role == "director" && <DesktopDirector userId={props.userId} user="all"/>}
            {showComponent == "folders" && <Folders/>}
            {/*showComponent == "databases" && <Table/>*/}
            {showComponent == "createtasks" && <TaskForm/>}
            {showComponent == "tasks" && role == "user" && <TasksTable userFilter={props.userId}/>}
            {showComponent == "tasks" && role == "supervisor" && <TasksTable userFilter="*"/>}
            {/*showComponent == "tasks" && <SheetData fullscreen={true} user='Julian Di Pietrantonio'/>*/}
        </section>
    )
}

export default ContentContainer
