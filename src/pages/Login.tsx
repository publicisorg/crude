import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e:any) => {
  e.preventDefault();
try{
  const result = await supabase.auth.signInWithPassword({
    email, password
  })
  console.log(result)
} catch(error){
console.error(error)}
  };

  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate("/");
      }
    });
  }, [navigate]);

  useEffect(() => {
    document.title = "Log In";
  }, [])

  return (

    <div className="w-full h-screen gap-8 flex flex-col justify-center items-center  bg-gray/600  ">
      <div className="bg-white/10 rounded p-8 border-white/20 border text-center w-1/3 gap-8 flex flex-col justify-center items-center ">
    <img src="logo.svg" className="w-48"/>
    <h1 className="text-2xl">Iniciar Sesión </h1>
    <form onSubmit={handleSubmit} className="flex text-left items-center  flex-col gap-2 w-full">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-col  w-full justify-center items-center ">
          
          <label htmlFor="email"  className="w-1/2">Ingresar Mail:</label>
          <input
            type="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="border px-2 py-1 m-2 ! w-1/2 rounded"
            placeholder="Mail"
            required
          />
          </div>
          <div className="text-left flex flex-col w-full justify-center items-center mt-4 ">
           <label htmlFor="email" className="w-1/2">Password:</label>
          <input
          
            type="password"
            value={password}
            name="email"
            onChange={(e) => setPassword(e.target.value)}
            className="border px-2 py-1 m-2 !  w-1/2 rounded text-black"
            placeholder="Contraseña"
            required
          />
          </div>
          <div className="m-auto flex justify-center items-center">
            <button className="border border-white/10 hover:brightness-150 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center duration-300 mt-10 mb-4 bg-gray-600"> ENTRAR
            </button>
          </div>
          </div>
        </form>
        </div>
  </div>
  );
}

export default Login; 