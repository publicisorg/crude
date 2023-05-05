import { useEffect, useState } from "react";
import axios from 'axios'
import { ItemFolder, ItemFrame, ItemImage, ItemNotSupported } from "../../common/items";
import extensions from '../../common/items/extensions.json'

function Folders() {
    const [contenido, setContenido] = useState([]);
    const [contenidoGet, setContenidoGet] = useState([]);
    const [dataReady, isDataReady] = useState(false);
    const [backEnabled, isBackEnabled] = useState(false);
    const [path, updatePath] = useState<any>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://desarrollodesitios0.site/folders.php');
                setContenido(response.data);
                setContenidoGet(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()

    }, []);

    useEffect(() => {
        if (JSON.stringify(contenido) === '{}' || JSON.stringify(contenido) === '[]') {
            isDataReady(false);
        } else {
            isDataReady(true);
        }

        if (contenido == contenidoGet) {
            isBackEnabled(false);
        } else {
            isBackEnabled(true);
        }
    }, [contenido])

    function enterFolder(folder:any) {
        updatePath([...path, folder]);
    }

    function exitFolder() {
        updatePath(
            path.filter((a:any) => a !== path[path.length-1])
        );
    }

    useEffect(() => {
        var auxContenido = contenidoGet;
        path.forEach((element:any) => {
            auxContenido = auxContenido[element];
        });
        setContenido(auxContenido);
    }, [path])

    function checkExtension(data: any) {
        var auxData = data.split(".");
        var extension = auxData[auxData.length - 1];
        var type: any;

        extensions.image.forEach((imageType: any) => {
            if (imageType == extension) {
                type = "image";
            }
        })

        extensions.web.forEach((webType: any) => {
            if (webType == extension) {
                type = "web";
            }
        })

        return type;
    }

    function renderItemByType(key:any, data:any, path:any, index:number) {
        if (data['type'] == 'folder') {
            return (<ItemFolder function={setContenido} arguments={data} label={key} enterFolder={() => enterFolder(key)} index={index}/>)
        } else {
            var dataType = checkExtension(contenido[key]);
            switch (dataType) {
                case "image":
                    return (<ItemImage label={contenido[key]} path={path} index={index}/>);
                case "web":
                    return (<ItemFrame label={contenido[key]} path={path} index={index}/>);
                default:
                    return (<ItemNotSupported label={contenido[key]} path={path} index={index}/>);
            }
        }
    }

    function renderJSX() {
        const resultJSX:any = [];
        Object.keys(contenido).forEach((key:any, index:any) => {
            if (key != 'type') {
                resultJSX.push(renderItemByType(key, contenido[key], path, index));
            }
        });

        return resultJSX;
    }

    return (
        <>
            <section className="grid grid-cols-5 gap-8">
                {backEnabled && dataReady && <span onClick={exitFolder} className="left-8 top-8 fixed cursor-pointer p-2 border shadow-md rounded-md hover:bg-gray-200">Anterior</span>}
                {dataReady && renderJSX()}
            </section>
        </>
    )
}

export default Folders;