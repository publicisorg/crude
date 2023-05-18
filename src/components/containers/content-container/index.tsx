import { useEffect, useState } from "react"
import SheetData from "../../common/sheetdata/SheetData"
import Folders from "../folders"
import Table from "../table"
import Desktop from "../desktop";

function ContentContainer(props: any) {

    const [showComponent, setShowComponent] = useState(props.actualContent);

    useEffect(() => {
        setShowComponent(props.actualContent);
    })

    return (
        <section className="ml-80 h-screen relative overflow-y-auto">
            {showComponent == "desktop" && <Desktop/>}
            {showComponent == "folders" && <Folders/>}
            {/*showComponent == "databases" && <Table/>*/}
            {showComponent == "tasks" && <SheetData fullscreen={true} user='Julian Di Pietrantonio'/>}
        </section>
    )
}

export default ContentContainer
