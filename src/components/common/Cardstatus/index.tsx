// @ts-nocheck

import { useEffect, useState } from "react";
import { supabase } from "../../../supabase/client";
import moment from 'moment';

export function CardStatus(props: any) {
  const [messages, setMessages] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState("");
  const [likedMessageId, setLikedMessageId] = useState<string | null>(null);

  useEffect(() => {
    async function getMessageById() {
      try {
        const { data } = await supabase
          .from('statusProfile')
          .select('id, created_at, message, like')
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
      const message: any = messages[0];
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


  const handleLikeClick = async (messageId: string) => {
    const messageIndex = messages.findIndex((message) => message.id === messageId);
    if (messageIndex !== -1) {
      const updatedMessages = [...messages];
      let updatedLikeCount = updatedMessages[messageIndex].like;

      if (likedMessageId === messageId) {
        // Si se hizo clic nuevamente en el mismo mensaje, resta 1 al contador
        updatedLikeCount -= 1;
        setLikedMessageId(null); // Reinicia el valor de likedMessageId

        // Obtener el valor actual de idLikeStatus de la tabla users
        try {
          const { data, error } = await supabase
            .from('users')
            .select('idLikeStatus')
            .eq('uuid', props.userId)
            .single();

          if (error) {
            throw new Error('Error al obtener la columna idLikeStatus');
          }

          const currentIdLikeStatus = data?.idLikeStatus;

          // Verificar si el ID del mensaje existe en idLikeStatus y eliminarlo
          const updatedIdLikeStatus = currentIdLikeStatus
            ? currentIdLikeStatus.filter((id: string) => id !== messageId.toString())
            : [];

          // Actualizar la columna idLikeStatus en la tabla users con el JSON actualizado
          await supabase
            .from('users')
            .update({ idLikeStatus: updatedIdLikeStatus })
            .eq('uuid', props.userId);

          // Consultar si el mensaje existe en la tabla statusProfile
          const { data: messageData } = await supabase
            .from('statusProfile')
            .select('id', 'like')
            .eq('id', messageId)
            .single();

          if (messageData) {
            const currentLikeCount = messageData.like;

            // Restar 1 al contador de "likes" en la tabla statusProfile
            const newLikeCount = currentLikeCount - 1;
            await supabase
              .from('statusProfile')
              .update({ like: newLikeCount })
              .eq('id', messageId);
          }
        } catch (error) {
          console.error('Error al actualizar la columna idLikeStatus:', error);
        }
      } else {
        // Si es un nuevo mensaje, suma 1 al contador
        updatedLikeCount += 1;
        setLikedMessageId(messageId);

        // Obtener el valor actual de idLikeStatus de la tabla users
        try {
          const { data, error } = await supabase
            .from('users')
            .select('idLikeStatus')
            .eq('uuid', props.userId)
            .single();

          if (error) {
            throw new Error('Error al obtener la columna idLikeStatus');
          }

          const currentIdLikeStatus = data?.idLikeStatus;

          // Agregar el ID del mensaje al JSON
          const updatedIdLikeStatus = currentIdLikeStatus
            ? [...currentIdLikeStatus, messageId]
            : [messageId];

          // Actualizar la columna idLikeStatus en la tabla users con el JSON actualizado
          await supabase
            .from('users')
            .update({ idLikeStatus: updatedIdLikeStatus })
            .eq('uuid', props.userId);

          // Obtener el mensaje actual de statusProfile
          const { data: currentMessageData, error: currentMessageError } = await supabase
            .from('statusProfile')
            .select('like')
            .eq('id', messageId)
            .single();

          if (currentMessageError) {
            throw new Error('Error al obtener el mensaje actual de statusProfile');
          }

          const currentLikeCount = currentMessageData?.like || 0;

          // Incrementar el contador de "likes" en la tabla statusProfile
          const newLikeCount = currentLikeCount + 1;
          await supabase
            .from('statusProfile')
            .update({ like: newLikeCount })
            .eq('id', messageId);
        } catch (error) {
          console.error('Error al actualizar la columna idLikeStatus:', error);
        }
      }

      // Actualizar el contador de likes en el mensaje
      updatedMessages[messageIndex].like = updatedLikeCount;
      setMessages(updatedMessages);
    }








  };



  const MyComponent = () => {
    const [likedMessageId, setLikedMessageId] = useState<string | null>(null);
    const [idLikeStatus, setIdLikeStatus] = useState<string[]>([]);

    // Obtener el valor actual de idLikeStatus de la tabla users al cargar el componente
    useEffect(() => {
      const fetchIdLikeStatus = async () => {
        try {
          const { data, error } = await supabase
            .from('users')
            .select('idLikeStatus')
            .eq('uuid', props.userId)
            .single();

          if (error) {
            throw new Error('Error al obtener la columna idLikeStatus');
          }

          const currentIdLikeStatus = data?.idLikeStatus || [];
          setIdLikeStatus(currentIdLikeStatus);
        } catch (error) {
          console.error('Error al obtener la columna idLikeStatus:', error);
        }
      };

      fetchIdLikeStatus();
    }, [props.userId]);

  };


  return (
    <div className="mt-0">
      {messages.map((message: any) => (
        <div className="border py-2 px-4 flex items-start mb-4 rounded-lg gap-2shadow-lg" style={{ borderColor: props.borderColor, backgroundColor:  props.cardBg  }} key={message.created_at}>
          <img className="profile-image w-16 h-16 mt-2 rounded-full border-2" src={props.urlImg} alt="Profile" style={{ borderColor: props.borderColor }}/>
          <div className="status-content">
            <div className="flex flex-row gap-2">
              <p className="message font-bold">{props.name + " " + props.lastName}</p>
              <p className="message font-sm font-normal opacity-60">@{props.userNick}</p>
              <p className="message font-sm font-normal opacity-60">{timeElapsed}</p>
            </div>
            <p className="message font-light">{message.message}</p>
            <p
              className={`like-count opacity-60 flex gap-2 items-center`}>
              <span onClick={() => handleLikeClick(message.id)} className={`heart ${likedMessageId === message.id ? 'heart-animation' : ''}`} ></span>
              <span className="-ml-2"> {message.like}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
