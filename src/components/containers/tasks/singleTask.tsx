import { useEffect, useState } from "react";
import { supabase } from "../../../supabase/client";
import moment from 'moment';
import { Link } from "react-router-dom";
import { Tooltip } from "flowbite-react";

function SingleTask(props: any) {

    const [showDetails, setShowDetails] = useState(false);
    const [detailsSize, setDetailsSize] = useState("h-0");
    const [detailsOpacity, setDetailsOpacity] = useState("opacity-0");
    const [user, setUser] = useState("");
    const [askedFor, setAskedFor] = useState("");
    const [timeElapsed, setTimeElapsed] = useState("");
    const [userNick, setUserNick] = useState("");
    
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
        const data: any = await supabase.from('users').select('name, lastname, urlImg, userNick').eq("uuid", userUUID);
        return data;
    }

    useEffect(() => {
        getUserById(props.element.user).then((element: any) => {
            setUser(element.data[0].name + " " + element.data[0].lastname);
        
        });
        getUserById(props.element.userId).then((element: any) => {
            setPicture(element.data[0].urlImg);
            setUserNick(element.data[0].userNick);
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
        <tr className="transition-all hover:bg-gray-100/10 hover:shadow-lg" key={props.index} onClick={toggleDetails}>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm  ">{props.element.name}</div>
                <div className="text-sm  /50">{timeElapsed}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10">
                    <Link to={'/profile/'+userNick}>
                        <Tooltip content={askedFor} className="bg-black text-white">
                            <img className="w-10 h-10 rounded-full"
                                src={picture}
                                alt="" />
                        </Tooltip>
                        </Link>

                    </div>
                </div>
            </td>

            <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                    {props.element.status}
                </span>
            </td>
            {!props.desktop && <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                <Link to={'/tasks/' + props.element.id} className="  hover:text-indigo-900">Detalle</Link>
            </td>}


        </tr>
    );
}

export default SingleTask;