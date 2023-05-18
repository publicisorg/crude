import { useState } from "react";
import MenuAside from "../aside-menu"
import ContentContainer from "../content-container"


function Main() {

    const [actualContent, setContent] = useState("desktop");
    const [role, setRole] = useState("user");

    const possibleRoles = ["user", "supervisor", "director"];

  return (
    <main className={`w-full`}>
        <MenuAside changeContent={setContent} role={role} setRole={setRole} possibleRoles={possibleRoles}/>
        <ContentContainer actualContent={actualContent} role={role}/>
    </main>
  )
}

export default Main
