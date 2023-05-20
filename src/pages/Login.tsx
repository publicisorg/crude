import { useEffect, useState } from "react";
import React from 'react'
import { supabase } from "../supabase/client";

export function Login() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
try{
  const result = await supabase.auth.signInWithOtp({
    email,
  })
  console.log(result)
} catch(error){
console.error(error)}
  };


  return (

    <div className="w-full h-screen flex flex-col justify-center items-center gap-8 bg-black text-white">
    <img src="logo.svg" className="w-48"/>
    <h1 className="text-2xl">Bienvenido a la herramienta interna de Publicis Groupe Argentina</h1>
    <form onSubmit={handleSubmit} className="flex justify-center items-center">
          <label htmlFor="email">Ingresar Mail:</label>
          <input
            type="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="border px-2 py-1 m-2"
            placeholder="youremail@site.com"
            required
          />
          <div className="ms-auto">
            <button className="bg-gray-400 py-1 px-4 text-white"> ENTRAR
            </button>
          </div>
        </form>
  </div>
  );
}




export const login = () => {
  return (
    <div>login</div>
  )
}

export default Login; 