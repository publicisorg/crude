import { useEffect, useState } from "react";
import MenuAside from "../aside-menu"
import ContentContainer from "../content-container"
import { supabase } from "../../../supabase/client";


function Main() {

    const [actualContent, setContent] = useState("desktop");
    const [role, setRole] = useState("user")
    const [userId, setUserId] = useState("")

    const possibleRoles = ["user", "supervisor", "director"];

    useEffect(() => {
      var auxUser = supabase.auth.getUser();
      auxUser.then((userinfo:any) => {
        setUserId(userinfo.data.user.id);
      })
    }, [])

  return (
    <main className={`w-full`}>
        <MenuAside userId={userId} changeContent={setContent} role={role} setRole={setRole} possibleRoles={possibleRoles}/>
        <ContentContainer userId={userId} actualContent={actualContent} role={role}/>
    </main>
  )
}

export default Main
