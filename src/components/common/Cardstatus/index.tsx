import { useEffect, useState } from "react";
import { supabase } from "../../../supabase/client";
import moment from 'moment';
import { AiOutlineHeart, AiOutlineLike } from "react-icons/ai";

export function CardStatus(props: any) {
  const [messages, setMessages] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState("");

  useEffect(() => {
    async function getMessageById() {
      try {
        const { data } = await supabase
          .from('statusProfile')
          .select('created_at, message, like')
          .eq("uuid", props.userId);
        setMessages(data);
      } catch (error) {
        console.error('Error al obtener los mensajes:', error);
      }
    }

    getMessageById();
  }, [props.userId]);

  useEffect(() => {
    if (messages.length > 0) {
      const message = messages[0];
      const createdAt = moment(message.created_at); 
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
    }
  }, [messages]);

  return (
    <div className="mt-14">
      {messages.map((message: any) => (
        <div className="border border-gray-300 p-4 flex mb-4" key={message.created_at}>
          <img className="profile-image w-12 h-12 rounded-full mr-4" src={props.urlImg} alt="Profile" />
          <div className="status-content">
            <div className="flex">
              <p className="message font-bold">{props.name}</p>
              <p className="message font-sm font-normal text-gray-500">@{props.userNick}</p>
              <p className="message font-sm font-normal text-gray-500">{timeElapsed}</p>
            </div>
            <p className="message font-bold">{message.message}</p>
            <p className="like-count text-gray-500 flex gap-2 items-center"><AiOutlineHeart/>{message.like}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
