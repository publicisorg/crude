import { useEffect, useState } from "react"
import Keywords from "../keywords"
import { Colors, Tag } from "../selectors"
import axios from 'axios'
import Image from "../images"

function FormatedData(props: any) {

    const actualId = props.data.id;
    const [generalData, setGeneralData] = useState<any>([]);
    const [keywords, setKeywords] = useState([]);
    const [tag1, setTag1] = useState('');
    const [tag2, setTag2] = useState('');
    const [tag3, setTag3] = useState('');
    const [color1, setColor1] = useState('');
    const [color2, setColor2] = useState('');
    const [color3, setColor3] = useState('');
    const [url, setUrl] = useState('');
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        setUrl(props.data.url_Destino);
    }, [])

    async function postData(data: any) {
        if (props.webReady) {
            console.log("Post Data");
            var myDataObj = data;
            var formData = new FormData();
            for (var key in myDataObj) {
                formData.append(key, myDataObj[key])
            }
            try {
                console.log(myDataObj);
                const response = await axios.post("../UpdateData.php", myDataObj, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                if (response.status == 200) {
                    return response;
                } else {
                    console.log(response);
                }
            } catch (error) {
                console.log(error);
                return "Error";
            }
        }
    }

    useEffect(() => {
        var data = {
            id: actualId,
            tag1: tag1,
            tag2: tag2,
            tag3: tag3,
            color1: color1,
            color2: color2,
            color3: color3,
            url_Destino: url,
            keywords: keywords
        }

        if (props.webReady) {
            setGeneralData(data);
        }
    }, [tag1, tag2, tag3, color1, color2, color3, keywords, url])

    useEffect(() => {
        postData(generalData);
    }, [generalData])

    function removeTags() {
        if (actualId != undefined && actualId != "") {
            var data = {
                id: actualId,
                tag1: "",
                tag2: "",
                tag3: "",
                color1: "",
                color2: "",
                color3: "",
                keywords: ""
            }
            postData(data).then((response:any) => {
                if (response.status == "200") {
                    alert("Se elimino correctamente.");
                    setHidden(true);
                }
            });
        } else {
            alert("Error al borrar");
        }
    }

    return (
        <>
            <tr key={props.index} className={`${hidden ? "hidden" : ""} border odd:bg-black/25 border-gray-900`}>
                <td className="px-2 text-center">
                    {props.data.id}
                </td>
                <td className="px-2 flex justify-center">
                    <Image Imagen={props.data.Imagen} />
                </td>
                <td className="px-2 text-center">
                    <p>{props.data.Display_name}</p>
                </td>
                <td className="px-2">
                    <Tag tag={props.data.Tags[0]} collectData={setTag1} />
                </td>
                <td className="px-2">
                    <Tag tag={props.data.Tags[1]} collectData={setTag2} />
                </td>
                <td className="px-2">
                    <Tag tag={props.data.Tags[2]} collectData={setTag3} />
                </td>
                <td className="px-2">
                    <Colors color={props.data.Colores[0]} collectData={setColor1} />
                </td>
                <td className="px-2">
                    <Colors color={props.data.Colores[1]} collectData={setColor2} />
                </td>
                <td className="px-2">
                    <Colors color={props.data.Colores[2]} collectData={setColor3} />
                </td>
                <td className="px-2">
                    <input 
                    onChange={(e) => {setUrl(e.target.value)}}
                    value={url}
                    className="bg-transparent border px-2 py-1 rounded-md bg-gray-700 border-gray-900 w-full" 
                    placeholder="https://urldelsitio.com/ejemplo"/>
                </td>
                <td className="px-2 m-auto">
                    <button className="text-red-600 w-10 h-10 flex justify-center rounded-md items-center m-auto border-2 border-red-600 hover:bg-gray-600 hover:border-red-600 duration-300" 
                    onClick={() => removeTags()}>
                        X
                    </button>
                    {false && <Keywords previouskeywords={props.data.Keywords} collectData={setKeywords} />}
                </td>
            </tr>
        </>
    )
}

export default FormatedData
