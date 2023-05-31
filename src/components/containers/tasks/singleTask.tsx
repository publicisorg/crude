import { useEffect, useState } from "react";
import { supabase } from "../../../supabase/client";

function SingleTask(props: any) {

    const [showDetails, setShowDetails] = useState(false);
    const [detailsSize, setDetailsSize] = useState("h-0");
    const [detailsOpacity, setDetailsOpacity] = useState("opacity-0");
    const [user, setUser] = useState("");
    const [askedFor, setAskedFor] = useState("");

    function toggleDetails() {
        if (showDetails) {
            setDetailsOpacity('opacity-0')
            setDetailsSize("h-0");
            setTimeout(() => {
                setShowDetails(false);
            }, 310);
        } else {
            setShowDetails(true);
            setTimeout(() => {
                setDetailsSize("h-96");
                setDetailsOpacity('opacity-100')
            }, 310);
        }
    }

    async function getUserById(userUUID:any) {
        const data:any = await supabase.from('users').select('name, lastname').eq("uuid", userUUID);
        return data;
    }
    
    useEffect(() => {
        getUserById(props.element.user).then((element:any) => {
            setUser(element.data[0].name + " " + element.data[0].lastname);
        });
        getUserById(props.element.userId).then((element:any) => {
            setAskedFor(element.data[0].name + " " + element.data[0].lastname);
        });
    }, [])

    return (
        <div className="h-auto w-full" key={props.index}>
            <div className="h-12 w-full grid grid-cols-5 bg-black/25 text-black dark:bg-white/20 dark:text-white odd:bg-black-20 odd:dark:bg-white/25">
                <p className="w-full h-full flex justify-center items-center">{props.element.name}</p>
                <p className="w-full h-full flex justify-center items-center">{props.element.marca}</p>
                <p className="w-full h-full flex justify-center items-center">{props.element.date}</p>
                <p className="w-full h-full flex justify-center items-center">{props.element.status}</p>
                <button onClick={toggleDetails} className="m-auto w-2/3 h-2/3 border px-2 py-1 rounded-lg cursor-pointer bg-black/25 dark:bg-white/25">Detalles</button>
            </div>
            {showDetails && <div className={`${detailsSize} w-full duration-300`}>
                <div className={`${detailsOpacity} ${detailsSize} px-6 pt-4 pb-2 grid grid-cols-4 grid-rows-1 gap-4 duration-300 w-full h-32 inset-0 justify-center items-center bg-black/20 text-black dark:bg-white/10 dark:text-white odd:bg-black-25 odd:dark:bg-white/10`}>
                    <div className="p-4 h-full flex flex-col justify-center items-center border rounded-xl">
                        <p>Cliente:</p>
                        <p>{props.element.client}</p>
                    </div>
                    <div className="p-4 h-full flex flex-col justify-center items-center border rounded-xl">
                        <p>Marca:</p>
                        <p>{props.element.marca}</p>
                    </div>
                    <div className="p-4 h-full flex flex-col justify-center items-center border rounded-xl">
                        <p>Fecha de entrega:</p>
                        <p>{props.element.date}</p>
                    </div>
                    <div className="p-4 h-full flex flex-col justify-center items-center border rounded-xl">
                        <p>Status:</p>
                        <p>{props.element.status}</p>
                    </div>
                </div>
                <div className={`${detailsOpacity} ${detailsSize} px-6 py-2 grid grid-cols-3 grid-rows-1 gap-4 duration-300 w-full h-32 inset-0 justify-center items-center bg-black/20 text-black dark:bg-white/10 dark:text-white odd:bg-black-25 odd:dark:bg-white/10`}>
                    <div className="p-4 h-full flex flex-col justify-center items-center border rounded-xl">
                        <p>Tarea:</p>
                        <p>{props.element.name}</p>
                    </div>
                    <div className="p-4 h-full flex flex-col justify-center items-center border rounded-xl">
                        <p>Asignado a:</p>
                        <p>{user}</p>
                    </div>
                    <div className="p-4 h-full flex flex-col justify-center items-center border rounded-xl">
                        <p>Solicitado por:</p>
                        <p>{askedFor}</p>
                    </div>
                </div>
                <div className={`${detailsOpacity} ${detailsSize} px-6 pt-2 pb-4 grid grid-cols-1 grid-rows-1 gap-4 duration-300 w-full h-32 inset-0 justify-center items-center bg-black/20 text-black dark:bg-white/10 dark:text-white odd:bg-black-25 odd:dark:bg-white/10`}>
                    <div className="p-4 h-full flex flex-col justify-center items-center border rounded-xl">
                        <p>Descripcion:</p>
                        <p>{props.element.comment}</p>
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default SingleTask;