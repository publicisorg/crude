import { useEffect, useState } from "react";
import { supabase } from "../../../supabase/client";
import moment from 'moment';
import { Link } from "react-router-dom";

const buttonStyle = "border hover:brightness-125 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center duration-300"

export const Notification = (props: any) => {
  const [user, setUser] = useState("");
  const [userNick, setUserNick] = useState("");
  //const [askedFor, setAskedFor] = useState("");
  const [picture, setPicture] = useState("");
  const [timeElapsed, setTimeElapsed] = useState("");

  async function getUserById(userUUID: any) {
    const data: any = await supabase.from('users').select('name, lastname, urlImg,userNick').eq("uuid", userUUID);
    return data;
  }

  useEffect(() => {
    getUserById(props.element.userId).then((element: any) => {
      setUser(element.data[0].name);
      setUserNick(element.data[0].userNick);
    });
    getUserById(props.element.userId).then((element: any) => {
      setPicture(element.data[0].urlImg);
    });
    /*getUserById(props.element.user).then((element: any) => {
      setAskedFor(element.data[0].name);
    });*/


    const createdAt = moment(props.element.created_at);
    const now = moment();

    const duration = moment.duration(now.diff(createdAt));
    const hoursElapsed = duration.asHours();

    let timeText = "";
    if (hoursElapsed < 1) {
      timeText = "Hace menos de una hora";
    } else if (hoursElapsed < 24) {
      timeText = `Hace ${Math.floor(hoursElapsed)} horas`;
    } else {
      timeText = `Hace ${Math.floor(hoursElapsed / 24)} días`;
    }

    setTimeElapsed(timeText);
  }, []);

  return (
    <div className="" key={props.index}>
      <div className="flex flex-row justify-between items-center bg-white/10 rounded px-6 py-3 shadow-lg border" style={{ borderColor: props.borderColor }}>
        <div className="flex flex-row justify-center items-center">
          <Link to={'/profile/' + userNick}>
            <img src={picture} alt="Foto de la persona" className="w-16 h-16 rounded-full border-2" style={{ borderColor: props.borderColor }} />
          </Link>
          <div className="ml-4">
            <h2 className="text-lg font-bold">{user} te asigno la tarea:</h2>
            <p className="">{props.element.name}</p>
            <p className="mt-2">{timeElapsed}</p>
          </div>
        </div>
        <div className="flex flex-row gap-4 justify-center items-center">
          <Link to={'/tasks/' + props.element.id}>
            <button className={`${buttonStyle}`} style={{ backgroundColor: props.secondaryColor, borderColor: props.borderColor }}>
              Ver tarea
            </button>
          </Link>
          <button onClick={() => props.handleTimer(props.element.id)} className={`${buttonStyle}`} style={{ backgroundColor: props.secondaryColor, borderColor: props.borderColor }}>
            Empezar tarea
          </button>
        </div>
      </div>

    </div>
  )
}
