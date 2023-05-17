import { useState } from "react";
import MenuAside from "../aside-menu"
import ContentContainer from "../content-container"


function Main() {

    const [actualContent, setContent] = useState("desktop");

  return (
    <main className={`w-full`}>
        <MenuAside changeContent={setContent}/>
        <ContentContainer actualContent={actualContent}/>
    </main>
  )
}

export default Main
