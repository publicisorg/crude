import './App.css'
import Main from './components/containers/main';

import { Routes, Route, useNavigate } from "react-router-dom";
import { supabase } from "./supabase/client";
import { useEffect, useState } from "react";
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import NotFound from './pages/NotFound'
import { ProfileSettings } from './components/containers/profile';
import { TaskDetails } from './components/containers/tasks/TaskDetails';

function App() {
  const navigate = useNavigate();
  const defaultMainBgColors = "bg-stone-200";
  const defaultTextColors = " ";
  const [userId, setUserId] = useState("");

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      } else {
        setUserId(session.user.id);
      }
    });
  }, [navigate]);

  const [mainBgColors, changeBg] = useState(defaultMainBgColors);
  const [textColors, changeText] = useState(defaultTextColors);

  useEffect(() => {
    getBgColorFromDB().then((result: any) => { 
      if (result != undefined) {
        changeBg(result.data[0].bgcolor);
      } else {
        changeBg(defaultMainBgColors);
      }
     })
     getFontColorFromDB().then((result: any) => { 
      if (result != undefined) {
        changeText(result.data[0].fontColor);
      } else {
        changeText(defaultTextColors);
      }
     })
  })

  async function getBgColorFromDB() {
    if (userId != "") {
      const color = await supabase
        .from('users')
        .select("bgcolor")
        .eq('uuid', userId)
      return color;
    } else {
      return defaultMainBgColors;
    }
  }
  async function getFontColorFromDB() {
    if (userId != "") {
      const color = await supabase
        .from('users')
        .select("fontColor")
        .eq('uuid', userId)
      return color;
    } else {
      return defaultTextColors;
    }
  }

  return (

    <main className={`w-full duration-300`} style={{backgroundColor: mainBgColors, color: textColors, fill: textColors}}>

      <>
        <Main changeBg={changeBg} changeText={changeText} />
      </>
    </main >
  )
}

export default App
