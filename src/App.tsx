import './App.css'
import Main from './components/containers/main';

import { useNavigate } from "react-router-dom";
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
    supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session) {
        navigate("/login");
      } else {
        setUserId(session.user.id);
        await supabase.from('users')
          .update({ active: 'isActive' })
          .eq('uuid', session.user.id);
      }
    });
  }, [navigate]);


  const [mainBgColors, changeBg] = useState(defaultMainBgColors);
  const [textColors, changeText] = useState(defaultTextColors);
  const [borderColor, changeBorder] = useState(defaultBorderColors);
  const [secondaryColor, changeSecondary] = useState(defaultSecondaryColors);

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [urlImg, setUrlImg] = useState("");
  const [urlImgPortada, setUrlImgPortada] = useState("");
  const [active, setUserActive] = useState("");
  const [idLikeStatus, setUserIdLike] = useState("");
  const [occupation, setOccupation] = useState("");
  const [userNick, setUserNick] = useState("");
  const [possibleRoles, setPossibleRoles] = useState([]);

  useEffect(() => {
    getColorsFromDB().then((result: any) => {
      if (!result) {
        changeBg(defaultMainBgColors);
        changeText(defaultTextColors);
        changeSecondary(defaultSecondaryColors);
        changeBorder(defaultBorderColors);
      } else {
        setName(result.data[0].name);
        setLastname(result.data[0].lastname);
        setUrlImg(result.data[0].urlImg);
        setUrlImgPortada(result.data[0].urlImgPortada);
        setOccupation(result.data[0].occupation);
        setUserNick(result.data[0].userNick);
        setUserActive(result.data[0].active);
        setUserIdLike(result.data[0].idLikeStatus);
        setPossibleRoles(result.data[0].rol[0].rol);


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
        .select("*")
        .eq('uuid', userId)
      return color;
      
    } else {
      return false;
    }
  }



  return (

    <main className={`w-full duration-300`} style={{ backgroundColor: mainBgColors, color: textColors, fill: textColors, borderColor: borderColor }}>
      <>
        <Main

          name={name}
          lastName={lastname}
          urlImg={urlImg}
          userId={userId}
          possibleRoles={possibleRoles}
          urlImgPortada={urlImgPortada}
          active={active}
          idLikeStatus={idLikeStatus}
          occupation={occupation}
          userNick={userNick}
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
