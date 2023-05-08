import { useEffect, useState } from "react"
import Keywords from "../keywords"
import NonEditable, { DropdownSelect } from "../selectors"
import Tags from '../selectors/tags.json'
import Colores from '../selectors/colors.json'
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

    async function postData(data: any) {
        if (props.webReady) {
            console.log("Post Data");
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
            keywords: keywords
        }

        if (props.webReady) {
            setGeneralData(data);
        }
    }, [tag1, tag2, tag3, color1, color2, color3, keywords])

    useEffect(() => {
        postData(generalData);
    }, [generalData])

    return (
        <>
            <tr key={props.index} className={`${(props.index % 2) > 0 ? "bg-gray-100" : "bg-transparent"} border`}>
                <td className="px-2 text-center">
                    {props.data.id}
                </td>
                <td className="px-2 text-center">
                    <Image Imagen={props.data.Imagen} />
                </td>
                <td className="px-2 text-center">
                    <NonEditable>{props.data.Display_name}</NonEditable>
                </td>
                <td className="px-2 text-center">
                    <DropdownSelect data={Tags} value={props.data.Tags[0]} collectData={setTag1} />
                </td>
                <td className="px-2 text-center">
                    <DropdownSelect data={Tags} value={props.data.Tags[1]} collectData={setTag2} />
                </td>
                <td className="px-2 text-center">
                    <DropdownSelect data={Tags} value={props.data.Tags[2]} collectData={setTag3} />
                </td>
                <td className="px-2 text-center">
                    <DropdownSelect data={Colores} value={props.data.Colores[0]} collectData={setColor1} />
                </td>
                <td className="px-2 text-center">
                    <DropdownSelect data={Colores} value={props.data.Colores[1]} collectData={setColor2} />
                </td>
                <td className="px-2 text-center">
                    <DropdownSelect data={Colores} value={props.data.Colores[2]} collectData={setColor3} />
                </td>
                <td className="px-2 text-center">
                    <Keywords previouskeywords={props.data.Keywords} collectData={setKeywords} />
                </td>
            </tr>
        </>
    )
}

export default FormatedData
