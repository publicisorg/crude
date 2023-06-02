import './App.css'
import Main from './components/containers/main';

import { Routes, Route, useNavigate } from "react-router-dom";
import { supabase } from "./supabase/client";
import { useEffect, useState } from "react";

function App() {
  const navigate = useNavigate();
  const defaultMainBgColors = "#212121";
  const defaultTextColors = "#FFFFFF";
  const defaultSecondaryColors = "#2E2E2E";
  const defaultBorderColors = "#5E5E5E";
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
  const [borderColor, changeBorder] = useState(defaultBorderColors);
  const [secondaryColor, changeSecondary] = useState(defaultSecondaryColors);

  useEffect(() => {
    getColorsFromDB().then((result: any) => {
      if (!result) {
        console.log("DEFAULT");
        changeBg(defaultMainBgColors);
        changeText(defaultTextColors);
        changeSecondary(defaultSecondaryColors);
        changeBorder(defaultBorderColors);
      } else {
        console.log("DB");
        changeBg(result.data[0].bgcolor);
        changeText(result.data[0].fontColor);
        changeSecondary(result.data[0].secondaryColor);
        changeBorder(result.data[0].borderColor);
      }
    })
  })

  async function getColorsFromDB() {
    if (userId != "") {
      const color = await supabase
        .from('users')
        .select("bgcolor, secondaryColor, fontColor, borderColor")
        .eq('uuid', userId)
      return color;
    } else {
      return false;
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
