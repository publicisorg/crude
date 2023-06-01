import { useEffect, useState } from "react";
import { supabase } from "../../../supabase/client";
import moment from 'moment'; 
import { Link } from "react-router-dom";

export const Notification = (props: any) => {
  const [user, setUser] = useState("");
  const [askedFor, setAskedFor] = useState("");
  const [picture, setPicture] = useState("");
  const [timeElapsed, setTimeElapsed] = useState("");

  async function getUserById(userUUID: any) {
    const data: any = await supabase.from('users').select('name, lastname, urlImg').eq("uuid", userUUID);
    return data;
  }

  useEffect(() => {
    getUserById(props.element.userId).then((element: any) => {
      setUser(element.data[0].name );
    });
    getUserById(props.element.userId).then((element: any) => {
      setPicture(element.data[0].urlImg );
    });
    getUserById(props.element.user).then((element: any) => {
      setAskedFor(element.data[0].name);
    });
   

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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2"  key={props.index}>
    <div className="flex items-center bg-white/10 rounded-lg p-4">
      <img src={picture} alt="Foto de la persona" className="w-16 h-16 rounded-full"/>
      <div className="ml-4">
        <h2 className="text-lg font-bold">{user} te asigno la tarea:</h2>
        <p className="">{props.element.name}</p>
        <p className="mt-2">{timeElapsed}</p>
      </div>
      <div className="ml-auto">
        <Link to={'/tasks/'+props.element.id} className="bg-yellow-500/30 hover:bg-yellow-700 font-bold py-2 px-4 rounded">Ver tarea</Link>
        <button onClick={() => props.handleTimer(props.element.id)} className="bg-green-500/30 hover:bg-green-700 font-bold py-2 px-4 rounded ml-2">Empezar tarea</button>
      </div>
    </div>

    </div>
  )
}
