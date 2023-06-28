import { Link } from "react-router-dom";
import { supabase } from "../../../supabase/client";
import { useEffect, useState } from "react";

export function CardComment(props: any) {

  const [userIdName, setUserIdName] = useState("");
  const [userIdNick, setUserIdNick] = useState("");
  const [userIdImage, setUserIdImage] = useState("");
  const [lastChangeDescription, setLastChangeDescription] = useState("");
  const [lastChangeStyle, setLastChangeStyle] = useState("");

  useEffect(() => {
    switch (props.comment.lastChange) {
      case "CREATED":
        setLastChangeDescription("Creacion de la tarea");
        setLastChangeStyle("flex h-fit items-center gap-1 font-semibold bg-indigo-100 text-indigo-800 rounded px-2 py-0.5 p-1 text-xs")
        break;
      case "DONE":
        setLastChangeDescription("Hilo cerrado");
        setLastChangeStyle("flex h-fit items-center gap-1 font-semibold bg-green-100 text-green-800 rounded px-2 py-0.5 p-1 text-xs")
        break;
      case "":
        setLastChangeDescription("El estado de este pedido no se ha alterado");
        setLastChangeStyle("flex h-fit items-center gap-1 font-semibold bg-gray-100 text-gray-800 rounded px-2 py-0.5 p-1 text-xs")
        break;
      default:
        setLastChangeDescription(props.comment.lastChange);
        setLastChangeStyle("flex h-fit items-center gap-1 font-semibold bg-yellow-100 text-yellow-800 rounded px-2 py-0.5 p-1 text-xs")
    }
  })

  async function getUserById(userId: any) {
    if (userId != undefined) {
      const { data, error } = await supabase
        .from('users')
        .select('name, lastname, urlImg, userNick')
        .eq("uuid", userId);
      if (error) {
        console.error(error);
        return null;
      }
      return data;
    }
  }

  getUserById(props.comment.userId).then((result: any) => {
    if (result) {
      setUserIdName(result[0].name + " " + result[0].lastname);
      setUserIdImage(result[0].urlImg);
      setUserIdNick(result[0].userNick);
    }
  });

  function returnInDateFormat() {
    var date = new Date(props.comment.time).toLocaleString();
    return date;
  }

  return (
    <div className={`p-4 rounded-lg shadow-lg w-full ${props.comment.id > 0 ? " border" : "border-2"}`} style={{ borderColor: props.borderColor, backgroundColor: props.cardBg }}>
      <div className="flex flex-row items-center gap-2 w-full mb-2">
        <Link to={"/profile/" + userIdNick} className="flex flex-row gap-2 justify-center items-center">
          <img src={userIdImage} alt="" className="rounded-full w-10 h-10 border-2" width="40" height="40" style={{ borderColor: props.borderColor }} />
          <h6 className="font-bold mb-0 fs-4 ml-2">{userIdName}</h6>
        </Link>
      </div>
      <div className={props.className} dangerouslySetInnerHTML={{ __html: props.comment.comment }}></div>
      <div className="mt-4 flex justify-start">
        <div className={`${lastChangeStyle}`}>
          {lastChangeDescription}
        </div>
      </div>
      <div className="flex flex-row justify-between items-center gap-2 mt-2 opacity-50">
        <div className="flex flex-row gap-2">
          <div className="flex items-center gap-2">
            <span className="text-dark fw-semibold">{props.cliente}</span>
          </div>
          <span className="text-dark fw-semibold">•</span>
          <div className="flex items-center gap-2">
            <span className="text-dark fw-semibold">{props.marca}</span>
          </div>
        </div>
        <div>
          {returnInDateFormat()}
        </div>
      </div>
    </div>
  )
}

export default CardComment