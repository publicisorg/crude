import { useEffect, useState } from "react"
import SheetData from "../../common/sheetdata/SheetData"
import Folders from "../folders"
import Table from "../table"
import Desktop, { DesktopSupervisor } from "../desktop";

function ContentContainer(props: any) {

    const [showComponent, setShowComponent] = useState(props.actualContent);
    const [role, setRole] = useState(props.role);

    useEffect(() => {
        setShowComponent(props.actualContent);
        setRole(props.role);
    })

    return (
        <section className="ml-80 h-screen relative overflow-y-auto">
            {showComponent == "desktop" && role == "user" && <Desktop user='Julian Di Pietrantonio'/>}
            {showComponent == "desktop" && role == "supervisor" && <DesktopSupervisor user="all"/>}
            {showComponent == "folders" && <Folders/>}
            {/*showComponent == "databases" && <Table/>*/}
            {showComponent == "tasks" && <SheetData fullscreen={true} user='Julian Di Pietrantonio'/>}
        </section>
    )
}

export default ContentContainer
