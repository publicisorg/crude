import { useEffect, useState } from "react"
import Desktop, { DesktopDirector, DesktopSupervisor } from "../desktop";

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
            {showComponent == "desktop" && role == "supervisor" && <DesktopSupervisor userId={props.userId} user="*"/>}
            {showComponent == "desktop" && role == "director" && <DesktopDirector userId={props.userId} user="*"/>}            
        </section>
    )
}

export default ContentContainer
