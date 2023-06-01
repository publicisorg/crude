import './App.css'
import Main from './components/containers/main';

import { Routes, Route, useNavigate } from "react-router-dom";
import { supabase } from "./supabase/client";
import { useEffect, useState } from "react";

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
  const [borderColor, changeBorder] = useState(defaultMainBgColors);
  const [secondaryColor, changeSecondary] = useState(defaultTextColors);

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
    getActiveUserFromDB().then((result: any) => {
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

  async function getActiveUserFromDB() {
    if (userId != "") {
      const activeUser = await supabase
        .from('users')
        .update({ active: 'isActive' })
        .eq('uuid', userId)
      return activeUser;
    } else {
      const activeUser = await supabase
        .from('users')
        .update({ active: 'disabled' })
        .eq('uuid', userId)
      return activeUser;
    }
  }

  return (

    <main className={`w-full duration-300`} style={{ backgroundColor: mainBgColors, color: textColors, fill: textColors, borderColor: borderColor }}>
      <>
        <Main
          changeBg={changeBg}
          changeText={changeText}
          changeBorder={changeBorder}
          changeSecondary={changeSecondary}
          mainBgColors={mainBgColors}
          textColors={textColors}
          borderColor={borderColor}
          secondaryColor={secondaryColor}
        />
      </>
    </main >
  )
}

export default App
