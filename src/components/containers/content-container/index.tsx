import { useEffect, useState } from "react"
import Desktop, { DesktopDirector } from "../desktop";

function ContentContainer(props: any) {

    const [showComponent, setShowComponent] = useState(props.actualContent);
    const [role, setRole] = useState(props.role);
    const [userFilter, setUserFilter] = useState(props.userId);

    useEffect(() => {
        setShowComponent(props.actualContent);
        setRole(props.role);
    })

    useEffect(() => {
        if (role == "supervisor") {
            setUserFilter('*');
        } else {
            setUserFilter(props.userId);
        }
    }, [role])

    console.log(props.borderColor);

    return (
        <section className="ml-80 h-screen relative overflow-hidden">
            {showComponent == "desktop" && (role == "user" || role == "supervisor") && <Desktop userId={props.userId} role={role} user={userFilter} borderColor={props.borderColor} secondaryColor={props.secondaryColor}/>}
            {showComponent == "desktop" && role == "director" && <DesktopDirector userId={props.userId} user="*"/>}            
        </section>
    )
}

export default ContentContainer
