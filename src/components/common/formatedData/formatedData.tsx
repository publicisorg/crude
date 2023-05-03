import { useEffect, useState } from "react"
import Keywords from "../keywords"
import { Colors, Tag } from "../selectors"
import axios from 'axios'
import Image from "../images"

function FormatedData() {

    //REVISAR ESTO
    const actualId = 69;
    //REVISAR ESTO

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
    })

    return (
        <>
            <Keywords collectData={setKeywords} />
            <Tag collectData={setTag1} />
            <Tag collectData={setTag2} />
            <Tag collectData={setTag3} />

            <Colors collectData={setColor1} />
            <Colors collectData={setColor2} />
            <Colors collectData={setColor3} />
            <Image collectData={setImagen} />
        </>
    )
}

export default FormatedData
