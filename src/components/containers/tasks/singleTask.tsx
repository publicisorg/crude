import { useEffect, useState } from "react";
import { supabase } from "../../../supabase/client";
import moment from 'moment';

function SingleTask(props: any) {

    const [showDetails, setShowDetails] = useState(false);
    const [detailsSize, setDetailsSize] = useState("h-0");
    const [detailsOpacity, setDetailsOpacity] = useState("opacity-0");
    const [user, setUser] = useState("");
    const [askedFor, setAskedFor] = useState("");
    const [timeElapsed, setTimeElapsed] = useState("");
    const [picture, setPicture] = useState("");

    function toggleDetails() {
        if (showDetails) {
            setDetailsOpacity('opacity-0')
            setDetailsSize("h-screem");
            setTimeout(() => {
                setShowDetails(false);
            }, 310);
        } else {
            setShowDetails(true);
            setTimeout(() => {
                setDetailsSize("h-screem");
                setDetailsOpacity('opacity-100')
            }, 310);
        }
    }

    async function getUserById(userUUID: any) {
        const data: any = await supabase.from('users').select('name, lastname, urlImg').eq("uuid", userUUID);
        return data;
    }

    useEffect(() => {
        getUserById(props.element.user).then((element: any) => {
            setUser(element.data[0].name + " " + element.data[0].lastname);
        });
        getUserById(props.element.userId).then((element: any) => {
            setPicture(element.data[0].urlImg);
        });
        getUserById(props.element.userId).then((element: any) => {
            setAskedFor(element.data[0].name + " " + element.data[0].lastname);
        });

        const createdAt = moment(props.element.created_at);
        const now = moment();

        const duration = moment.duration(now.diff(createdAt));
        const hoursElapsed = duration.asHours();

        let timeText = "";
        if (hoursElapsed < 1) {
            timeText = "Hace menos de una hora";
        } else if (hoursElapsed < 24) {
            timeText = `Hace ${Math.floor(hoursElapsed)} horas`;
        } else {
            timeText = `Hace ${Math.floor(hoursElapsed / 24)} días`;
        }

        setTimeElapsed(timeText);
    }, [])

    return (
        <tr className="transition-all hover:bg-gray-100 hover:shadow-lg" key={props.index} onClick={toggleDetails}>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-white">{props.element.name}</div>
                <div className="text-sm text-white/50">{timeElapsed}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10">
                        <img className="w-10 h-10 rounded-full"
                            src={picture}
                            alt="" />
                    </div>
                </div>
            </td>

            <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                    {props.element.status}
                </span>
            </td>
            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                <a href="#" className="text-white hover:text-indigo-900">Detalle</a>
            </td>

            {showDetails && <div className={`${detailsSize} fixed inset-0 flex w-full items-center justify-center z-50 duration-300 bottom-0`}>
                <div className="bg-white rounded shadow-md p-4 max-w-2xl mx-auto ">
                    <div className={`${detailsOpacity} ${detailsSize} px-6 pt-4 pb-2 grid grid-cols-4 grid-rows-1 gap-4 duration-300 w-full  inset-0 justify-center items-center bg-white border border-white/30 dark:bg-gray-800 rounded-t-xl`}>
                        <div className="p-4  flex flex-col justify-center items-center border-r">
                            <p className="font-semibold text-xs">Cliente:</p>
                            <p className="text-xs">{props.element.client}</p>
                        </div>
                        <div className="p-4 flex flex-col justify-center items-center border-r">
                            <p className="font-semibold text-xs">Marca:</p>
                            <p className="text-xs">{props.element.marca}</p>
                        </div>
                        <div className="p-4 flex flex-col justify-center items-center border-r">
                            <p className="font-semibold text-xs">Fecha de entrega:</p>
                            <p className="text-xs">{props.element.date}</p>
                        </div>
                        <div className="p-4  flex flex-col justify-center items-center">
                            <p className="font-semibold text-xs">Status:</p>
                            <p className="text-xs">{props.element.status}</p>
                        </div>
                    </div>
                    <div className={`${detailsOpacity} ${detailsSize} px-6 py-2 grid grid-cols-3 grid-rows-1 gap-4 duration-300 w-full  inset-0 justify-center items-center bg-white border-t border-b border-white/30 dark:bg-gray-800`}>
                        <div className="p-4  flex flex-col justify-center items-center border-r">
                            <p className="font-semibold text-xs">Tarea:</p>
                            <p className="text-xs">{props.element.name}</p>
                        </div>
                        <div className="p-4 flex flex-col justify-center items-center border-r">
                            <p className="font-semibold text-xs">Asignado a:</p>
                            <p className="text-xs">{user}</p>
                        </div>
                        <div className="p-4 flex flex-col justify-center items-center">
                            <p className="font-semibold text-xs">Solicitado por:</p>
                            <p className="text-xs">{askedFor}</p>
                        </div>
                    </div>
                    <div className={`${detailsOpacity} ${detailsSize} px-6 pt-2 pb-4 grid grid-cols-1 grid-rows-1 gap-4 duration-300 w-full  inset-0 justify-center items-center bg-white border-t dark:bg-gray-800 rounded-b-xl`}>
                        <div className="p-4 flex flex-col justify-center items-center">
                            <p className="font-semibold text-xs">Descripción:</p>
                            <p className="text-xs">{props.element.comment}</p>
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" onClick={toggleDetails}>
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>}
        </tr>
    );
}

export default SingleTask;