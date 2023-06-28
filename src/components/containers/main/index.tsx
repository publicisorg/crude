import { useEffect, useState } from "react";
import { useLocation, Route, Routes } from "react-router-dom";
import { supabase } from "../../../supabase/client";
import MenuAside from "../aside-menu";
import ContentContainer from "../content-container";
import SignUp from "../../../pages/SignUp";
import { TaskDetails } from "../tasks/TaskDetails";
import NotFound from "../../../pages/NotFound";
import { Notifications } from "../notifications";
import Timer from "../../common/timer/timer";
import TasksTable from "../tasks";
import Folders from "../folders";
import { TaskForm } from "../../common/Taskform";
import Login from "../../../pages/Login";
import { ProfileUsers } from "../profile";
import { ProfileUsersPublic } from "../profile/ProfilePublic";
import News from "../news";
import { ProfileSettings } from "../setting";

const containerStyles = "ml-80 h-screen relative overflow-y-auto";

function Main(props: any) {
  const location = useLocation();
  const [timerOn, setTimerOn] = useState(false);
  const [timerAlertMessage, setTimerAlertMessage] = useState(false);
  const [timerTaskId, setTimerTaskId] = useState("1");
  const [actualContent, setContent] = useState("desktop");
  const [role, setRole] = useState("user");
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [urlImg, setUrlImg] = useState("");
  const [urlImgPortada, setUrlImgPortada] = useState("");
  const [active, setUserActive] = useState("");
  const [idLikeStatus, setUserIdLike] = useState("");
  const [occupation, setOccupation] = useState("");
  const [userNick, setUserNick] = useState("");
  const [possibleRoles, setPossibleRoles] = useState([]);

  useEffect(() => {
    const auxUser = supabase.auth.getUser();
    auxUser.then((userinfo: any) => {
      setUserId(userinfo.data.user.id);
    });
  }, []);

  useEffect(() => {
    async function getMyUserData(myUserUUID: any) {
      if (myUserUUID && myUserUUID !== undefined) {
        const { data } = await supabase
          .from("users")
          .select("*")
          .eq("uuid", myUserUUID);
        return data;
      }
    }

    getMyUserData(userId).then((user: any) => {
      if (user != undefined) {
        setName(user[0].name);
        setLastname(user[0].lastname);
        setUrlImg(user[0].urlImg);
        setUrlImgPortada(user[0].urlImgPortada);
        setOccupation(user[0].occupation);
        setUserNick(user[0].userNick);
        setUserActive(user[0].active);
        setUserIdLike(user[0].idLikeStatus);
        setPossibleRoles(user[0].rol[0].rol);
      }
    });
  }, [userId]);

  function handleTimer(taskId: any) {
    if (!timerOn) {
      setTimerTaskId(taskId);
      setTimerOn(true);
    } else {
      setTimerAlertMessage(true);
      console.log("El timer ya está con otra tarea (" + timerTaskId + ")");
    }
  }

  function clearTimer() {
    setTimerTaskId("");
    setTimerOn(false);
  }

  return (
    <>
      <main className={`w-full`}>
        {timerOn && (
          <Timer
            timerSettingsStyle="floating"
            timerTaskId={timerTaskId}
            clearTimer={clearTimer}
            timerAlertMessage={timerAlertMessage}
            setTimerAlertMessage={setTimerAlertMessage}
          />
        )}
        {(location.pathname != "/login" && location.pathname != "/register") &&
          <MenuAside
            name={props.name}
            lastName={lastname}
            urlImg={props.urlImg}
            userId={props.userId}
            changeContent={setContent}
            role={role}
            setRole={setRole}
            possibleRoles={possibleRoles}
            secondaryColor={props.secondaryColor}
            cardBg={props.cardBg}
            borderColor={props.borderColor}
          />}
        <Routes location={location}>
          <Route path="/" element={
            <News
              name={name}
              lastname={lastname}
              urlImg={urlImg}
              secondaryColor={props.secondaryColor}
              cardBg={props.cardBg}
              borderColor={props.borderColor}
            />}
          />
          <Route
            path="/desktop"
            element={
              <ContentContainer
                role={role}
                name={name}
                lastName={lastname}
                urlImg={urlImg}
                userId={userId}
                userFilter={userId}
                actualContent={actualContent}
                secondaryColor={props.secondaryColor}
                borderColor={props.borderColor}
                cardBg={props.cardBg}
              />
            }
          />
          <Route
            path="/Setting"
            element={
              <div className={`${containerStyles}`}>
                <ProfileSettings
                  userId={userId}
                  name={name}
                  lastName={lastname}
                  urlImg={urlImg}
                  urlImgPortada={urlImgPortada}
                  changeBg={props.changeBg}
                  changeText={props.changeText}
                  changeBorder={props.changeBorder}
                  changeSecondary={props.changeSecondary}
                  changeCardBg={props.changeCardBg}
                  mainBgColors={props.mainBgColors}
                  textColors={props.textColors}
                  borderColor={props.borderColor}
                  secondaryColor={props.secondaryColor}
                  cardBg={props.cardBg}
                />
              </div>
            }
          />
          <Route
            path="/tasks/:id"
            element={
              <div className={`${containerStyles}`}>
                <TaskDetails
                  secondaryColor={props.secondaryColor}
                  borderColor={props.borderColor}
                  cardBg={props.cardBg}
                  rol={role} />
              </div>
            }
          />
          <Route
            path="/myprofile"
            element={
              <div className={`${containerStyles}`}>
                <ProfileUsers
                  urlImgPortada={urlImgPortada}
                  userId={userId}
                  name={name}
                  lastName={lastname}
                  urlImg={urlImg}
                  rol={role}
                  occupation={occupation}
                  userNick={userNick}
                  active={active}
                  idLikeStatus={idLikeStatus}
                  secondaryColor={props.secondaryColor}
                  borderColor={props.borderColor}
                  cardBg={props.cardBg}
                />
              </div>
            }
          />
          <Route
            path="/profile/:userNick"
            element={
              <div className={`${containerStyles}`}>
                <ProfileUsersPublic />
              </div>
            }
          />
          <Route
            path="/tasks"
            element={
              (role === "user" && (
                <div className={`${containerStyles}`}>
                  <TasksTable
                    role={role}
                    handleTimer={handleTimer}
                    userFilter={userId}
                    secondaryColor={props.secondaryColor}
                    borderColor={props.borderColor}
                    cardBg={props.cardBg}
                  />
                </div>
              )) ||
              ((role === "supervisor" || role === "account") && (
                <div className={`${containerStyles}`}>
                  <TasksTable
                    role={role}
                    handleTimer={handleTimer}
                    userFilter={"*"}
                    secondaryColor={props.secondaryColor}
                    borderColor={props.borderColor}
                    cardBg={props.cardBg}
                  />
                </div>
              ))
            }
          />
          <Route
            path="/notifications"
            element={
              <div className={`${containerStyles}`}>
                <Notifications
                  handleTimer={handleTimer}
                  userFilter={userId}
                  secondaryColor={props.secondaryColor}
                  borderColor={props.borderColor}
                  cardBg={props.cardBg}
                />
              </div>
            }
          />
          <Route
            path="/folders"
            element={
              <div className={`${containerStyles}`}>
                <Folders secondaryColor={props.secondaryColor} borderColor={props.borderColor} cardBg={props.cardBg} />
              </div>
            }
          />
          <Route
            path="/createtasks"
            element={
              (role === "supervisor" || role === "account") && (
                <div className={`${containerStyles}`}>
                  <TaskForm secondaryColor={props.secondaryColor} borderColor={props.borderColor} cardBg={props.cardBg} />
                </div>
              )
            }
          />
          {
            (location.pathname != "/login" && location.pathname != "/register") &&
            <Route path="*" element={
              <div className={`${containerStyles}`}>
                <NotFound />
              </div>
            } />
          }
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<SignUp />} />
        </Routes>
      </main>
    </>
  );
}

export default Main;
