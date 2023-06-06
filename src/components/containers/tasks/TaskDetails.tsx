import { useEffect, useState } from "react";
import { supabase } from "../../../supabase/client";
import { useParams } from 'react-router-dom';
import CardComment from "./cardComment";
import TaskMenu from "./taskMenu";

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
  ]

  const [title, setTitle] = useState("");
  const [cliente, setCliente] = useState("");
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
      if (data) {
        const element = data[0];
        setTask(element);
        setTitle(element.name);
        setCliente(element.client);
        if (element.comment.length > 0) {
          setComment(element.comment);
        } else {
          setComment(errorComment);
        }
        setMarca(element.marca);
      }
    });
  }, []);

  return (
    <main className={`w-full`}>
      <div className="mx-auto p-8">
        <h2 className="text-3xl font-bold">Detalle de pedido</h2>
        <div className="">
          <p>Se te asignó la tarea: <b>{title}</b></p>
          <hr className="border mt-2" style={{ borderColor: props.borderColor }} />
        </div>
        <div className="container mx-auto flex flex-col">
          <div className="flex flex-row justify-around items-start p-4">
            <div className="flex flex-col justify-start gap-4 relative">
              {comment.map((comentario: any) => {
                return (
                  <CardComment comment={comentario} marca={marca} cliente={cliente} borderColor={props.borderColor} secondaryColor={props.secondaryColor}/>
                )
              })}
            </div>
            <TaskMenu task={task} borderColor={props.borderColor} secondaryColor={props.secondaryColor}/>
          </div>
        </div>
      </div>
    </main>
  );
};