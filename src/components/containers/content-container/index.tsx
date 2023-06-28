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


    return (
        <section className="ml-80 h-screen relative overflow-y-auto">
            {showComponent == "desktop" && (role == "user" || role == "supervisor") && <Desktop userId={props.userId} role={role} user={userFilter} borderColor={props.borderColor} secondaryColor={props.secondaryColor} cardBg={props.cardBg}/>}
            {showComponent == "desktop" && role == "director" && <DesktopDirector role={role} userId={props.userId} user="*" cardBg={props.cardBg}/>}            
        </section>
    )
}

export default ContentContainer
