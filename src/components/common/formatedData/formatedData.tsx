import { useEffect, useState } from "react"
import Keywords from "../keywords"
import { Colors, Tag } from "../selectors"

function FormatedData() {

    const [keywords, setKeywords] = useState([]);
    const [tag1, setTag1] = useState('');
    const [tag2, setTag2] = useState('');
    const [tag3, setTag3] = useState('');
    const [color1, setColor1] = useState('');
    const [color2, setColor2] = useState('');
    const [color3, setColor3] = useState('');

    useEffect(() => {
        
    }, [keywords])

    return (
      <>
        <Keywords collectData={setKeywords}/>
        <Tag collectData={setTag1}/>
        <Tag collectData={setTag2}/>
        <Tag collectData={setTag3}/>

        <Colors collectData={setColor1}/>
        <Colors collectData={setColor2}/>
        <Colors collectData={setColor3}/>
      </>
    )
  }
  
  export default FormatedData
  