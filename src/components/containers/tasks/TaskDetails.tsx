import { useEffect, useState } from "react";
import { supabase } from "../../../supabase/client";
import { useParams } from 'react-router-dom';
import CardComment from "./cardComment";
import TaskMenu from "./taskMenu";
import moment from "moment";
import { Tooltip } from "flowbite-react";

export const TaskDetails = (props: any) => {
  const loadingComment = [
    {
      id: 0,
      comment: "Cargando...",
      lastChange: "Cargando...",
      time: 0
    }
  ];

  const errorComment = [
    {
      id: 0,
      comment: "ERROR",
      lastChange: "ERROR",
      time: 0
    }
  ];
  
  const [timeElapsed, setTimeElapsed] = useState("");
  const [timeDetails, setTimeDetails] = useState("");
  const [title, setTitle] = useState("");
  const [cliente, setCliente] = useState("");
  const [createDate] = useState("");
  const [marca, setMarca] = useState("");
  const [task, setTask] = useState<any>([]);
  const [comment, setComment] = useState<any>(loadingComment);

  const { id } = useParams();

  if (!id) {
    return <p>Cargando...</p>;
  }

  async function getTaskById(taskId: any) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq("id", taskId);
    if (error) {
      console.error(error);
      return null;
    }
    return data;
  }

  useEffect(() => {
    getTaskById(id).then((data: any) => {
      if (data && data.length > 0) {
        const element = data[0];
        setTask(element);
        setTitle(element.name);
        setCliente(element.client);
        if (element.comment?.length > 0) {
          setComment(element.comment);
        } else {
          setComment(errorComment);
        }
        setMarca(element.marca);
      }
    });
  }, [id]);

  useEffect(() => {
    if (createDate) {
      const createdAt = moment(createDate);
      const now = moment();
      const duration = moment.duration(now.diff(createdAt));
      const hoursElapsed = duration.asHours();

      let timeText = "";
      if (hoursElapsed < 1) {
        timeText = `Hace menos de una hora, hoy a las ${createdAt.format("HH:mm")}`;
      } else if (hoursElapsed < 2) {
        timeText = `Hace ${Math.floor(hoursElapsed)} hora`;
      }
      else if (hoursElapsed < 24) {
        timeText = `Hace ${Math.floor(hoursElapsed)} horas`;
      }
       else {
        timeText = `Hace ${Math.floor(hoursElapsed / 24)} días, ${createdAt.format("D/M/YYYY, HH:mm:ss")}`;
      }

      setTimeElapsed(timeText);
      setTimeDetails(createdAt.format("D/M/YYYY, HH:mm"));
    }
  }, [createDate]);

  return (
    <main className={`w-full`}>
      <div className="mx-auto p-8">
        <div className="flex flex-row justify-between">
        <div>
          <h2 className="text-3xl font-bold">Detalle de pedido</h2>
          <p>Se te asignó la tarea: <b>{title}</b></p>
        </div>
        <div className="flex justify-center items-center">
        <Tooltip content={timeDetails}>
        {timeElapsed}
        </Tooltip>

        
          <br />

          
        </div>
        </div>
        <hr className="border mt-2" style={{ borderColor: props.borderColor }} />
        <div className="container mx-auto flex flex-col">
          <div className="flex flex-row justify-around items-start p-4 gap-4">
            <div className="flex flex-col justify-start gap-4 relative w-full">
              {comment.map((comentario: any) => {
                return (
                  <CardComment
                    comment={comentario}
                    marca={marca}
                    cliente={cliente}
                    borderColor={props.borderColor}
                    secondaryColor={props.secondaryColor}
                  />
                )
              })}
            </div>
            <TaskMenu
              task={task}
              borderColor={props.borderColor}
              secondaryColor={props.secondaryColor}
            />
          </div>
        </div>
      </div>
    </main>
  );
};
