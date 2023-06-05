import { useEffect, useState } from "react";
import { supabase } from "../../../supabase/client";
import moment from 'moment';
import { Link } from "react-router-dom";
import { Tooltip } from "flowbite-react";
import { MultipleProfiles } from "../../common/profileUser";
import { GenericSelect } from "../../common/selectors/selectUsers";

const buttonStyle = "border hover:brightness-150 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center duration-300";

function SingleTask(props: any) {

    const [askedFor, setAsker] = useState("");
    const [timeElapsed, setTimeElapsed] = useState("");
    const [askedForNick, setAskerNick] = useState("");
    const [askerPicture, setAskerPicture] = useState("");
    const [state, setState] = useState(props.element.status);
    const [priority, setPriority] = useState(props.element.priority);

    async function getUserById(userUUID: any) {
        const data: any = await supabase.from('users').select('name, lastname, urlImg, userNick').eq("uuid", userUUID);
        return data;
    }

    async function changeState() {
        if (state != "") {
            const result = await supabase.from('tasks').update({
                status: state
            }).eq("id", props.element.id);
            return result;
        }
    }

    useEffect(() => {
        changeState();
    }, [state])

    async function changePriority() {
        if (priority != "") {
            const result = await supabase.from('tasks').update({
                priority: priority
            }).eq("id", props.element.id);
            return result;
        }
    }

    useEffect(() => {
        changePriority();
    }, [priority])

    const taskStates = [
        { value: "SIN ASIGNAR", displayValue: "SIN ASIGNAR" },
        { value: "ASIGNADO", displayValue: "ASIGNADO" },
        { value: "AJUSTES", displayValue: "AJUSTES" },
        { value: "ENVIADO", displayValue: "ENVIADO" },
        { value: "EN TESTEO", displayValue: "EN TESTEO" },
        { value: "APROBADO", displayValue: "APROBADO" },
        { value: "FINALIZADO", displayValue: "FINALIZADO" }];

    const taskPriority = [
        { value: "NINGUNA", displayValue: "NINGUNA" },
        { value: "POCA", displayValue: "POCA" },
        { value: "NORMAL", displayValue: "NORMAL" },
        { value: "ALTA", displayValue: "ALTA" },
        { value: "MUY ALTA", displayValue: "MUY ALTA" },
        { value: "URGENTE", displayValue: "URGENTE" }];

    useEffect(() => {

        getUserById(props.element.userId).then((element: any) => {
            setAsker(element.data[0].name + " " + element.data[0].lastname);
            setAskerPicture(element.data[0].urlImg);
            setAskerNick(element.data[0].userNick);
        });

        setState(props.element.status);
        setPriority(props.element.priority);

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
        <div className="border-b flex flex-row justify-between" key={props.index} style={{ borderColor: props.borderColor }}>
            <div className={`px-6 py-4 truncate ${props.desktop ? "w-1/3" : "w-1/6"}`}>
                <div className="text-sm">{props.element.name}</div>
                <div className="text-sm">{timeElapsed}</div>
            </div>
            <MultipleProfiles users={props.element.user} isSupervisor={props.isSupervisor} isAccount={props.isAccount} borderColor={props.borderColor} secondaryColor={props.secondaryColor} />
            {!props.isAccount && !(props.desktop && props.isSupervisor) && <div className={`px-6 py-4 whitespace-nowrap ${props.desktop ? "w-1/3" : "w-1/6"}`}>
                <div className="flex items-center justify-center">
                    <div className="flex-shrink-0 w-10 h-10">
                        <Link to={'/profile/' + askedForNick}>
                            <Tooltip content={askedFor} className="bg-black text-white">
                                <img className="w-10 h-10 rounded-full border-2"
                                    style={{ borderColor: props.borderColor }}
                                    src={askerPicture}
                                    alt="" />
                            </Tooltip>
                        </Link>
                    </div>
                </div>
            </div>}

            <div className={`px-6 py-4 whitespace-nowrap flex justify-center items-center ${props.desktop ? "w-1/3" : "w-1/6"}`}>
                {(!props.isAccount && !props.isSupervisor) && <span className="px-6 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-lg h-10 flex justify-center items-center">
                    {props.element.status}
                </span>}
                {(props.isAccount || props.isSupervisor) && <GenericSelect value={state} required={true} data={taskStates} onChange={setState} secondaryColor={props.secondaryColor} borderColor={props.borderColor} />}
            </div>
            {!props.desktop && <div className={`px-6 py-4 whitespace-nowrap flex justify-center items-center ${props.desktop ? "w-1/3" : "w-1/6"}`}>
                {(!props.isAccount && !props.isSupervisor) && <span className="px-6 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-lg h-10 flex justify-center items-center">
                    {props.element.priority}
                </span>}
                {(props.isAccount || props.isSupervisor) && <GenericSelect value={priority} required={true} data={taskPriority} onChange={setPriority} secondaryColor={props.secondaryColor} borderColor={props.borderColor} />}
            </div>}
            {!props.desktop && <div className={`px-6 py-4 text-sm font-medium text-right whitespace-nowrap ${props.desktop ? "w-1/3" : "w-1/6"}`}>
                <Link to={'/tasks/' + props.element.id}>
                    <button className={`${buttonStyle}`} style={{ borderColor: props.borderColor, backgroundColor: props.secondaryColor }}>
                        Detalle
                    </button>
                </Link>
            </div>}


        </div>
    );
}

export default SingleTask;