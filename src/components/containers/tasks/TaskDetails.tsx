
import { useEffect, useState } from "react";
import { supabase } from "../../../supabase/client";
import moment from 'moment';
import { useParams } from 'react-router-dom';
import MenuAside from "../aside-menu";

export const TaskDetails = () => {

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [cliente, setCliente] = useState("");
  const [marca, setMarca] = useState("");
  const [user, setUser] = useState("");
  const [date, setDate] = useState("");
  const [Comment, setComment] = useState("");
  const [userId, setUserId] = useState("");



  const { id } = useParams()

  useEffect(() => {


  }, [id]);

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
      setDate(element.data[0].date);
      setMarca(element.data[0].marca);
      // setUser(element.data[0].user);
      // setUserId(element.data[0].userId);
      setStatus(element.data[0].status);

      getUserById(element.data[0].userId).then((result:any) => {setUserId(result.data[0].name + " " + result.data[0].lastname)}); 
      getUserById(element.data[0].user).then((result:any) => {setUser(result.data[0].name + " " + result.data[0].lastname)}); 
      console.log (element.data)
    });
  
  }, [])





  return (
<main className={`w-full`}>
     

    <div className="max-w-md mx-auto bg-white text-black shadow-lg p-8 mt-8">
      <h2 className="text-2xl font-bold mb-4">Detalle</h2>
      <div className="mb-4">
        <label className="block font-bold mb-2" >Título:</label>
        <input className="w-full bg-gray-200 border border-gray-300 rounded px-3 py-2" type="text" id="titulo" name="titulo" value={title} disabled />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2">Estado:</label>
        <input className="w-full bg-gray-200 border border-gray-300 rounded px-3 py-2" type="text" id="estado" name="estado" value={status} disabled />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2" >Cliente:</label>
        <input className="w-full bg-gray-200 border border-gray-300 rounded px-3 py-2" type="text" id="cliente" name="cliente" value={cliente} disabled />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2" >Marca:</label>
        <input className="w-full bg-gray-200 border border-gray-300 rounded px-3 py-2" type="text" id="marca" name="marca" value={marca} disabled />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2" >Lo pide:</label>
        <input className="w-full bg-gray-200 border border-gray-300 rounded px-3 py-2" type="text" id="usuario" name="usuario" value={userId} disabled />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2" >Lo tiene:</label>
        <input className="w-full bg-gray-200 border border-gray-300 rounded px-3 py-2" type="text" id="usuario" name="usuario" value={user} disabled />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2" >Fecha:</label>
        <input className="w-full bg-gray-200 border border-gray-300 rounded px-3 py-2" type="text" id="fecha" name="fecha" value={date} disabled />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2" >Comentario:</label>
        <textarea className="w-full bg-gray-200 border border-gray-300 rounded px-3 py-2" id="comentario" name="comentario" value={Comment} disabled></textarea>
      </div>
    </div>
    </main>
  );
};





