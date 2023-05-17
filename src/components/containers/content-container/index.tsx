import { useEffect, useState } from "react"
import SheetData from "../../common/sheetdata/SheetData"
import Folders from "../folders"
import Table from "../table"

function ContentContainer(props: any) {

    const [showComponent, setShowComponent] = useState(props.actualContent);

    useEffect(() => {
        setShowComponent(props.actualContent);
    })

    return (
        <section className="ml-80 p-4 h-screen relative overflow-y-auto">
            {showComponent == "desktop" && "TEST"}
            {showComponent == "folders" && <Folders/>}
            {showComponent == "databases" && <Table/>}
            {showComponent == "tasks" && <SheetData/>}
        </section>
    )
}

export default ContentContainer
