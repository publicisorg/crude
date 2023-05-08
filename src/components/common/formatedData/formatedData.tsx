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
    const [editable, isTableEditable] = useState(props.editable);
    const [tag1, setTag1] = useState('');
    const [tag2, setTag2] = useState('');
    const [tag3, setTag3] = useState('');
    const [color1, setColor1] = useState('');
    const [color2, setColor2] = useState('');
    const [color3, setColor3] = useState('');

    useEffect(() => {
        isTableEditable(props.editable);
    }, [])

    async function postData(data: any) {
        if (props.webReady) {
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
                } else {
                }
            } catch (error) {
                console.log(error);
                return "Error";
            }
        }
    }

    useEffect(() => {
        if (editable) {
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
        }
    }, [tag1, tag2, tag3, color1, color2, color3, keywords])

    useEffect(() => {
        if (editable) {
            postData(generalData);
        }
    }, [generalData])

    function buildTableContent() {
        const tableContent: any = [];
        props.estructura.forEach((key: any, index: number) => {
            var auxType = key.type;
            var contentComponent: any = [];
            if (editable) {
                contentComponent = (<NonEditable key={index}>{props.data[key.Field]}</NonEditable>)
            } else {
                switch (auxType) {
                    case "int":
                        contentComponent = (<NonEditable key={index}>{props.data[key.Field]}</NonEditable>)
                    case "varchar":
                        contentComponent = (<NonEditable key={index}>{props.data[key.Field]}</NonEditable>)
                    default:
                        contentComponent = (<NonEditable key={index}>{props.data[key.Field]}</NonEditable>)
                }
            }

            tableContent.push(<td className="px-2 text-center">
                {contentComponent}
            </td>)
        });

        return tableContent;
    }

    return (
        <>
            <tr key={props.index} className={`${(props.index % 2) > 0 ? "bg-gray-100" : "bg-transparent"} border`}>
                {buildTableContent()}
            </tr>
        </>
    )
}

export default FormatedData
