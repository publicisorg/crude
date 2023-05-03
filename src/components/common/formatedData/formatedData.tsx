import { useEffect, useState } from "react"
import Keywords from "../keywords"
import { Colors, Tag } from "../selectors"
import axios from 'axios'
import Image from "../images"

function FormatedData(props: any) {

    const actualId = props.data.id;

    const [keywords, setKeywords] = useState([]);
    const [imagen, setImagen] = useState('');
    const [tag1, setTag1] = useState('');
    const [tag2, setTag2] = useState('');
    const [tag3, setTag3] = useState('');
    const [color1, setColor1] = useState('');
    const [color2, setColor2] = useState('');
    const [color3, setColor3] = useState('');

    async function postData(data: any) {
        var myDataObj = data;
        var formData = new FormData();
        for (var key in myDataObj) {
            formData.append(key, myDataObj[key])
        }
        try {
            const response = await axios.post("../UpdateData.php", myDataObj, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (response.status == 200) {
                console.log(response);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
            return "Error";
        }
    }

    useEffect(() => {
        const data = {
            id: actualId,
            imagen: imagen,
            tags: [tag1, tag2, tag3],
            colors: [color1, color2, color3],
            keywords: keywords
        }

        postData(data);
    }, [imagen, tag1, tag2, tag3, color1, color2, color3, keywords])

    return (
        <>
            <tr key={props.index} className={`${(props.index % 2) > 0 ? "bg-black/5" : "bg-transparent"} border`}>
                <td className="px-2">
                    {props.data.id}
                </td>
                <td className="px-2">
                    <Image Imagen={props.data.Imagen} collectData={setImagen} />
                </td>
                <td className="px-2">
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
                    <Keywords previouskeywords={props.data.Keywords} collectData={setKeywords} />
                </td>
                <td className="px-2">
                    <p>DUMMY</p>
                </td>
            </tr>
        </>
    )
}

export default FormatedData
