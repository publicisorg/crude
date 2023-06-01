import { useEffect, useState } from "react";
import { supabase } from "../../../supabase/client";
import moment from 'moment';
import { AiOutlineHeart } from "react-icons/ai";

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
            <p
              className={`like-count text-gray-500 flex gap-2 items-center`}
              onClick={() => handleLikeClick(message.id)}
            >
             
              <span className={`heart ${likedMessageId === message.id ? 'heart-animation' : ''}`} ></span>
             <span className="-ml-2"> {message.like}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}