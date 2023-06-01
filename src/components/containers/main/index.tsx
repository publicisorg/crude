import { useEffect, useState } from "react";
import MenuAside from "../aside-menu"
import ContentContainer from "../content-container"
import { supabase } from "../../../supabase/client";
import { Route, Routes } from "react-router-dom";
import SignUp from "../../../pages/SignUp";
import { ProfileSettings } from "../Setting";
import { TaskDetails } from "../tasks/TaskDetails";
import NotFound from "../../../pages/NotFound";
import { Notifications } from "../notifications";
import Timer from "../../common/timer/timer";
import TasksTable from "../tasks";
import Folders from "../folders";
import { TaskForm } from "../../common/Taskform";
import Login from "../../../pages/Login";
import { ProfileUsers } from "../Profile";
import { ProfileUsersPublic } from "../Profile/Profile";



function Main(props: any) {
  const [showComponent, setShowComponent] = useState(props.actualContent);
  //const [role, setRole] = useState(props.role);
  const [timerOn, isTimerOn] = useState(false);
  const [timerAlertMessage, setTimerAlertMessage] = useState(false);
  const [timerTaskId, setTimerTaskId] = useState("1");
  const [actualContent, setContent] = useState("desktop");
  const [role, setRole] = useState("user")
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [urlImg, setUrlImg] = useState("");
  const [active, setUserActive] = useState("");
  const [occupation, setOccupation] = useState("");
  const [userNick, setUserNick] = useState("");
  const [possibleRoles, setPossibleRoles] = useState([]);

  useEffect(() => {
    var auxUser = supabase.auth.getUser();
    auxUser.then((userinfo: any) => {
      setUserId(userinfo.data.user.id);
    })
  }, [])

  useEffect(() => {
    getMyUserData(userId).then((user: any) => {
      console.log(user);
      setName(user.data[0].name);
      setLastname(user.data[0].lastname);
      setUrlImg(user.data[0].urlImg);
      setOccupation(user.data[0].occupation);
      setUserNick(user.data[0].userNick);
      setUserActive(user.data[0].active);
      setPossibleRoles(user.data[0].rol[0].rol);
    });
  }, [userId])

  async function getMyUserData(myUserUUID: any) {
    if (myUserUUID != "" && myUserUUID != undefined) {
      const data = await supabase.from('users').select('uuid, name, lastname, rol, urlImg, occupation, userNick, active').eq('uuid', myUserUUID);
      return data;
    }
  }

  function handleTimer(taskId: any) {
    if (!timerOn) {
      setTimerTaskId(taskId);
      isTimerOn(true);
    } else {
      setTimerAlertMessage(true);
      console.log('El timer ya esta con otra tarea (' + timerTaskId + ')');
    }
  }

  function clearTimer() {
    setTimerTaskId("");
    isTimerOn(false);
  }
  return (
    <>

    <Routes>
          <Route path="/login" element={<><Login /></>} />
          <Route path="/registrar" element={<><SignUp /></>} />

    </Routes>
      <main className={`w-full`}>
        {timerOn && <Timer timerSettingsStyle="floating" timerTaskId={timerTaskId} clearTimer={clearTimer} timerAlertMessage={timerAlertMessage} setTimerAlertMessage={setTimerAlertMessage} />}
        <MenuAside changeBg={props.changeBg} changeText={props.setTextColors} name={name} lastName={lastname} urlImg={urlImg} userId={userId} changeContent={setContent} role={role} setRole={setRole} possibleRoles={possibleRoles} />
        <Routes>
        <Route path="/" element={<ContentContainer name={name} lastName={lastname} urlImg={urlImg} userId={userId} actualContent={actualContent} role={role} />} />

          <Route path="/desktop" element={<ContentContainer name={name} lastName={lastname} urlImg={urlImg} userId={userId} actualContent={actualContent} role={role} />} />
          
          <Route path="/Setting" element={<div className="ml-80 h-screen relative overflow-y-auto"><ProfileSettings userId={userId} name={name} lastName={lastname} urlImg={urlImg} changeBg2={props.changeBg} changeText2={props.changeText} /></div>} />
          <Route path="/tasks/:id" element={<div className="ml-80 h-screen relative overflow-y-auto"><TaskDetails /></div>} />
          <Route path="/myprofile" element={<div className="ml-80 h-screen relative overflow-y-auto"><ProfileUsers userId={userId}  name={name} lastName={lastname} urlImg={urlImg} rol={role} occupation={occupation} userNick={userNick} active={active}/></div>} />
         
          <Route path="/profile/:userNick" element={<div className="ml-80 h-screen relative overflow-y-auto"><ProfileUsersPublic userId={userId}  name={name} lastName={lastname} urlImg={urlImg} rol={role} occupation={occupation} userNick={userNick} active={active}/></div>} />


          <Route path="tasks" element={role == "user" && <div className="ml-80 h-screen relative overflow-y-auto"><TasksTable handleTimer={handleTimer} userFilter={userId} /></div>}></Route>


          <Route path="/notifications" element={<div className="ml-80 h-screen relative overflow-y-auto"><Notifications handleTimer={handleTimer} userFilter={userId} /></div>} />
          <Route path="/folders" element={<div className="ml-80 h-screen relative overflow-y-auto"><Folders /></div>} />
          <Route path="/createtasks" element={role == "supervisor" && <div className="ml-80 h-screen relative overflow-y-auto"><TaskForm/></div>} />

          <Route path="*" element={<div className="ml-80 h-screen relative overflow-y-auto"><NotFound /></div>} />
        </Routes>

      </main>
    </>
  )
}

export default Main
