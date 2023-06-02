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
import { ProfileUsers } from "../profile";
import { ProfileUsersPublic } from "../profile/Profile";
import News from "../news";

const containerStyles = "ml-80 h-screen relative overflow-y-auto";

function Main(props: any) {
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
  const [idLikeStatus, setUserIdLike] = useState("");
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
      setUserIdLike(user.data[0].idLikeStatus);
      setPossibleRoles(user.data[0].rol[0].rol);
    });
  }, [userId])

  async function getMyUserData(myUserUUID: any) {
    if (myUserUUID != "" && myUserUUID != undefined) {
      const data = await supabase.from('users').select('*').eq('uuid', myUserUUID);
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
        <MenuAside name={name} lastName={lastname} urlImg={urlImg} userId={userId} changeContent={setContent} role={role} setRole={setRole} possibleRoles={possibleRoles} secondaryColor={props.secondaryColor} borderColor={props.borderColor}/>
        <Routes>
        <Route path="*" element={<div className={`${containerStyles}`}><NotFound /></div>} />
          <Route path="/" element={<News name={name} lastName={lastname} urlImg={urlImg}/>} />
          <Route path="/desktop" element={<ContentContainer role={role} name={name} lastName={lastname} urlImg={urlImg} userId={userId} actualContent={actualContent} secondaryColor={props.secondaryColor} borderColor={props.borderColor}/>} />
          <Route path="/Setting" element={<div className={`${containerStyles}`}><ProfileSettings userId={userId} name={name} lastName={lastname} urlImg={urlImg} changeBg={props.changeBg} changeText={props.changeText} changeBorder={props.changeBorder} changeSecondary={props.changeSecondary} mainBgColors={props.mainBgColors} textColors={props.textColors} borderColor={props.borderColor} secondaryColor={props.secondaryColor}/></div>} />
          <Route path="/tasks/:id" element={<div className={`${containerStyles}`}><TaskDetails secondaryColor={props.secondaryColor} borderColor={props.borderColor}/></div>} />
          <Route path="/myprofile" element={<div className={`${containerStyles}`}><ProfileUsers userId={userId} name={name} lastName={lastname} urlImg={urlImg} rol={role} occupation={occupation} userNick={userNick} active={active} idLikeStatus={idLikeStatus}/></div>} />
          <Route path="/profile/:userNick" element={<div className={`${containerStyles}`}><ProfileUsersPublic userId={userId} name={name} lastName={lastname} urlImg={urlImg} rol={role} occupation={occupation} userNick={userNick} active={active} idLikeStatus={idLikeStatus}/></div>} />
          <Route path="/tasks" element={
            role == "user" && <div className={`${containerStyles}`}><TasksTable role={role} handleTimer={handleTimer} userFilter={userId} secondaryColor={props.secondaryColor} borderColor={props.borderColor}/></div>
            || role == "supervisor" && <div className={`${containerStyles}`}><TasksTable role={role} handleTimer={handleTimer} userFilter={"*"} secondaryColor={props.secondaryColor} borderColor={props.borderColor}/></div>
          }></Route>
          <Route path="/notifications" element={<div className={`${containerStyles}`}><Notifications handleTimer={handleTimer} userFilter={userId} secondaryColor={props.secondaryColor} borderColor={props.borderColor}/></div>} />
          <Route path="/folders" element={<div className={`${containerStyles}`}><Folders secondaryColor={props.secondaryColor} borderColor={props.borderColor}/></div>} />
          <Route path="/createtasks" element={role == "supervisor" && <div className={`${containerStyles}`}><TaskForm secondaryColor={props.secondaryColor} borderColor={props.borderColor}/></div>} />
      
        </Routes>
      </main>
    </>
  )
}

export default Main
