
import { useEffect, useState } from "react";
import { supabase } from "../../../supabase/client";
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { Timeline } from 'flowbite-react';
import { AiOutlineCalendar } from "react-icons/ai";
export const TaskDetails = (_props: any) => {

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [cliente, setCliente] = useState("");
  const [marca, setMarca] = useState("");
  const [user, setUser] = useState("");
  const [date, setDate] = useState("");
  const [Comment, setComment] = useState("");
  const [userId, setUserId] = useState("");
  const [userIdImage, setUserIdImage] = useState("");
  const [userImage, setUserImage] = useState("");

  const [timeElapsed, setTimeElapsed] = useState("");

  const { id } = useParams()

  

  if (!id) {
    return <p>Cargando...</p>;
  }


  async function getTaskById(id: any) {
    const data: any = await supabase.from('tasks').select('*').eq("id", id);
    return data;
  }

  async function getUserById(userUUID: any) {
    const data: any = await supabase.from('users').select('name, lastname, urlImg').eq("uuid", userUUID);
    return data;
  }

  useEffect(() => {
    getTaskById(id).then((element: any) => {
      setTitle(element.data[0].name);
      setCliente(element.data[0].client);
      setComment(element.data[0].comment);
      setDate(element.data[0].created_at);
      setMarca(element.data[0].marca);
      setStatus(element.data[0].status);
      const createdAt = moment(element.data[0].created_at);
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
      getUserById(element.data[0].userId).then((result: any) => {

        setUserId(result.data[0].name + " " + result.data[0].lastname)
        setUserIdImage(result.data[0].urlImg)

      });
      getUserById(element.data[0].user).then((result: any) => { 
        setUser(result.data[0].name + " " + result.data[0].lastname)
        setUserImage(result.data[0].urlImg)
       });
      
      console.log(element.data)
    });



  }, [])




  return (
    <main className={`w-full`}>


      <div className=" mx-auto p-8 mt-8">
        <h2 className="text-2xl font-bold mb-4">Detalle de pedido</h2>


        <div className="container mx-auto p-8 mt-8 grid">

          <div className="p-4 rounded-lg bg-light mb-3  bg-white text-black max-w-xl shadow-lg ">
            <div className="flex flex-row items-center gap-4 w-full">
              <img src={userIdImage} alt="" className="rounded-full" width="44" height="44" />
              <h6 className="font-bold mb-0 fs-4">{userId} </h6>
              <span className="flex justify-end"> •<span className="p-1 bg-muted rounded-circle d-inline-block"></span>{timeElapsed}</span>
            </div>
            <p className="mt-3"><b>{title}</b></p>
            <p>
              {Comment}
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
          <div className="w-full flex items-center justify-center">
            <Timeline>
              <Timeline.Item>
                <AiOutlineCalendar className="bg-[#7364d0] w-6 h-6 rounded-full -ml-9 " />
                <Timeline.Content>
                  <Timeline.Time>
                    {date}
                  </Timeline.Time>
                  <Timeline.Title>
                    {status}
                  </Timeline.Title>

                </Timeline.Content>
              </Timeline.Item>

            </Timeline>
          </div>
          <div className="p-4 rounded-lg bg-light mb-3  bg-white text-black max-w-xl shadow-lg ">
            <div className="flex flex-row items-center gap-4 w-full">
              <img src={userImage} alt="" className="rounded-full" width="44" height="44" />
              <h6 className="font-bold mb-0 fs-4">{user} </h6>
              <span className="flex justify-end"> •<span className="p-1 bg-muted rounded-circle d-inline-block"></span>{timeElapsed}</span>
            </div>
            <p className="mt-3"><b>{title}</b></p>
            <p>
              {Comment}
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
        </div>


      </div>
    </main>
  );
};





