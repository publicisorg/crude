import './App.css'
import Main from './components/containers/main';

import { Routes, Route, useNavigate } from "react-router-dom";
import { supabase } from "./supabase/client";
import { useEffect } from "react";
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import NotFound from './pages/NotFound'
import { ProfileSettings } from './components/containers/profile';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      } else {
        navigate("/");
      }
    });
  }, [navigate]);

  const mainBgColors = "bg-stone-200 dark:bg-black";
  const textColors = "text-black dark:text-white";

  return (

    <main className={`w-full ${mainBgColors} ${textColors}`}>

      <>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<><Login /></>} />
            <Route path="/registrar" element={<><SignUp/></>} />
            <Route path="/Setting" element={<><ProfileSettings/></>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
    </main >
  )
}

export default App
