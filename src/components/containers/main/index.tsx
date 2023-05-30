import { useEffect, useState } from "react";
import MenuAside from "../aside-menu"
import ContentContainer from "../content-container"
import { supabase } from "../../../supabase/client";


function Main() {

  const [actualContent, setContent] = useState("desktop");
  const [role, setRole] = useState("user")
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [urlImg, setUrlImg] = useState("");
  const [possibleRoles, setPossibleRoles] = useState([]);

  //const possibleRoles = ["user", "supervisor", "director"];

  useEffect(() => {
    var auxUser = supabase.auth.getUser();
    auxUser.then((userinfo: any) => {
      setUserId(userinfo.data.user.id);
    })
  }, [])

  useEffect(() => {
    getMyUserData(userId).then((user:any) => {
      console.log(user);
      setName(user.data[0].name);
      setLastname(user.data[0].lastname);
      setUrlImg(user.data[0].urlImg);
      setPossibleRoles(user.data[0].rol[0].rol);
    });
  }, [userId])

  async function getMyUserData(myUserUUID:any) {
    const data = await supabase.from('users').select('uuid, name, lastname, rol, urlImg').eq('uuid', myUserUUID);
    return data;
  }

  return (
    <main className={`w-full`}>
      <MenuAside name={name} lastName={lastname} urlImg={urlImg} userId={userId} changeContent={setContent} role={role} setRole={setRole} possibleRoles={possibleRoles} />
      <ContentContainer userId={userId} actualContent={actualContent} role={role} />
    </main>
  )
}

export default Main
