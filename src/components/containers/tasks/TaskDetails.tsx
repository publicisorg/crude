import { useEffect, useState } from "react";
import { supabase } from "../../../supabase/client";
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { Timeline } from 'flowbite-react';
import { AiOutlineCalendar } from "react-icons/ai";

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
  const [status, setStatus] = useState("");
  const [cliente, setCliente] = useState("");
  const [marca, setMarca] = useState("");
  const [user, setUser] = useState("");
  const [date, setDate] = useState("");
  const [userId, setUserId] = useState("");
  const [userIdImage, setUserIdImage] = useState("");
  const [userImage, setUserImage] = useState("");
  const [timeElapsed, setTimeElapsed] = useState("");
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

  async function getUserById(userId: any) {
    const { data, error } = await supabase
      .from('users')
      .select('name, lastname, urlImg')
      .eq("uuid", userId);
    if (error) {
      console.error(error);
      return null;
    }
    return data;
  }

  useEffect(() => {
    console.log(comment);
  }, [comment])

  useEffect(() => {
    getTaskById(id).then((data: any) => {
      if (data) {
        const element = data[0];
        setTitle(element.name);
        setCliente(element.client);
        console.log(element);
        if (element.comment.length > 0) {
          setComment(element.comment);
        } else {
          setComment(errorComment);
        }
        //setComment(element.comment);
        setDate(element.created_at);
        setMarca(element.marca);
        setStatus(element.status);

        const createdAt = moment(element.created_at);
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

        getUserById(element.userId).then((result: any) => {
          if (result) {
            setUserId(result[0].name + " " + result[0].lastname);
            setUserIdImage(result[0].urlImg);
          }
        });

        getUserById(element.user).then((result: any) => {
          if (result) {
            setUser(result[0].name + " " + result[0].lastname);
            setUserImage(result[0].urlImg);
          }
        });
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
          <div className="flex flex-row justify-center items-center p-4 gap-4">
            <div className="p-4 rounded-lg shadow-lg w-1/2 border bg-white/10" style={{ borderColor: props.borderColor}}>
              <div className="flex flex-row items-center gap-4 w-full">
                <img src={userIdImage} alt="" className="rounded-full w-10 h-10 border-2" width="40" height="40" style={{ borderColor: props.borderColor }} />
                <h6 className="font-bold mb-0 fs-4">{userId} </h6>
                <span className="flex justify-end"> •<span className="p-1 bg-muted rounded-circle d-inline-block"></span>{timeElapsed}</span>
              </div>
              <p className="mt-3"><b>{title}</b></p>
              <p>
                {comment[0].comment}
              </p>
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <span className="text-dark fw-semibold">{cliente}</span>
                </div>
                <div className="flex items-center gap-2 ms-4">
                  •
                  <span className="text-dark fw-semibold">{marca}</span>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg shadow-lg w-1/2 border bg-white/10" style={{ borderColor: props.borderColor}}>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
