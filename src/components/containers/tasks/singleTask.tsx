import { useEffect, useState } from "react";
import { supabase } from "../../../supabase/client";
import moment from 'moment';
import { Link } from "react-router-dom";
import { Tooltip } from "flowbite-react";
import { MultipleProfiles } from "../../common/profileUser";

const buttonStyle = "border hover:brightness-150 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center duration-300";

function SingleTask(props: any) {

    const [askedFor, setAsker] = useState("");
    const [timeElapsed, setTimeElapsed] = useState("");
    const [askedForNick, setAskerNick] = useState("");
    const [askerPicture, setAskerPicture] = useState("");

    async function getUserById(userUUID: any) {
        const data: any = await supabase.from('users').select('name, lastname, urlImg, userNick').eq("uuid", userUUID);
        return data;
    }

    useEffect(() => {
        getUserById(props.element.userId).then((element: any) => {
            setAsker(element.data[0].name + " " + element.data[0].lastname);
            setAskerPicture(element.data[0].urlImg);
            setAskerNick(element.data[0].userNick);
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
        <tr className="border-b" key={props.index} style={{ borderColor: props.borderColor }}>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm">{props.element.name}</div>
                <div className="text-sm">{timeElapsed}</div>
            </td>
            <MultipleProfiles users={props.element.user} isSupervisor={props.isSupervisor} isAccount={props.isAccount}/>
            {!props.isAccount && !(props.desktop && props.isSupervisor) && <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center justify-center">
                    <div className="flex-shrink-0 w-10 h-10">
                        <Link to={'/profile/' + askedForNick}>
                            <Tooltip content={askedFor} className="bg-black text-white">
                                <img className="w-10 h-10 rounded-full border"
                                    style={{ borderColor: props.borderColor }}
                                    src={askerPicture}
                                    alt="" />
                            </Tooltip>
                        </Link>

                    </div>
                </div>
            </td>}

            <td className="px-6 py-4 whitespace-nowrap flex justify-center items-center">
                <span className="px-6 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-lg h-10 flex justify-center items-center">
                    {props.element.status}
                </span>
            </td>
            {!props.desktop && <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                <Link to={'/tasks/' + props.element.id}>
                    <button className={`${buttonStyle}`} style={{ borderColor: props.borderColor, backgroundColor: props.secondaryColor }}>
                        Detalle
                    </button>
                </Link>
            </td>}


        </tr>
    );
}

export default SingleTask;