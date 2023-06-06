import { useEffect, useState } from "react";
import WysiwygTextarea from "../../common/Textarea";
import GenericButton from "../../common/buttons";
import { GenericSelect } from "../../common/selectors/selectUsers"
import { supabase } from "../../../supabase/client";
import { useParams } from "react-router-dom";

export function TaskMenu(props: any) {
    const [priority, setPriority] = useState("");
    const [priorityDesc, setPriorityDesc] = useState("");
    const [previousPriority, setPreviousPriority] = useState("");

    const [status, setStatus] = useState("");
    const [statusDesc, setStatusDesc] = useState("");
    const [previousStatus, setPreviousStatus] = useState("");

    const [comment, setComment] = useState<any>([]);
    const [actualComment, setActualComment] = useState<any>({});
    const [commentCount, setCommentCount] = useState(0);
    const [authUser, setAuthUser] = useState("SIN ASIGNAR")
    const [lastChangeDesc, setLastChangeDesc] = useState("");

    const { id } = useParams();

    useEffect(() => {
        if (props.task != undefined) {
            if (priority == "" || priority == undefined) {
                setPriority(props.task.priority);
            }
            if (previousPriority == "" || previousPriority == undefined) {
                setPreviousPriority(props.task.priority);
            }
            if (status == "" || status == undefined) {
                setStatus(props.task.status);
            }
            if (previousStatus == "" || previousStatus == undefined) {
                setPreviousStatus(props.task.status);
            }
            if (commentCount == 0 || commentCount == undefined) {
                if (props.task.comment != undefined) {
                    setCommentCount(props.task.comment.length);
                    setComment(props.task.comment);
                }
            }
        }
    })

    useEffect(() => {
        getAuthUser();
    }, [])

    function getAuthUser() {
        try {
            const user: any = supabase.auth.getUser()
            user.then((userId: any) => { setAuthUser(userId.data.user.id) })
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = async () => {
        setComment([
            ...comment, actualComment
        ]);
    }

    useEffect(() => {
        if (comment.length > 0) {
            updateDataInTable().then((response:any) => {
                console.log(response);
            })
        }
    }, [comment])

    useEffect(() => {
        setStatusDesc('Se actualizo el estado de "' + previousStatus + '" a "' + status + '"');
        setPreviousStatus(status);
    }, [status])

    useEffect(() => {
        setPriorityDesc('Se actualizo la prioridad de "' + previousPriority + '" a "' + priority + '"');
        setPreviousPriority(priority);
    }, [priority])

    useEffect(() => {
        if (status == props.task.status && priority == props.task.priority) {
            setLastChangeDesc("");
        } else {
            if (status != props.task.status && priority != props.task.priority) {
                setLastChangeDesc(statusDesc + ", " + priorityDesc);
            } else {
                if (status != props.task.status) {
                    setLastChangeDesc(statusDesc);
                }
                if (priority != props.task.priority) {
                    setLastChangeDesc(priorityDesc);
                }
            }
        }
    }, [statusDesc, priorityDesc])

    const handleTextareaChange = (value: string) => {
        setActualComment(
            {
                id: commentCount,
                comment: value,
                lastChange: lastChangeDesc,
                userId: authUser,
                time: Date.now()
            }
        );
    };

    async function updateDataInTable() {
        const result = await supabase.from('tasks').update({
            status: status,
            priority: priority,
            comment: comment
        }).eq('id', id);
        return result;
    }

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

    return (
        <div className="p-4 rounded-lg shadow-lg w-1/2 border bg-white/10 flex flex-col gap-4" style={{ borderColor: props.borderColor }}>
            <div className="flex flex-row w-full gap-4">
                <GenericSelect value={status} onChange={setStatus} label="Estado:" data={taskStates} borderColor={props.borderColor} secondaryColor={props.secondaryColor} />
                <GenericSelect value={priority} onChange={setPriority} label="Prioridad:" data={taskPriority} borderColor={props.borderColor} secondaryColor={props.secondaryColor} />
            </div>

            <WysiwygTextarea function={handleTextareaChange} borderColor={props.borderColor} secondaryColor={props.secondaryColor} />
            <GenericButton function={handleSubmit} label="Enviar" borderColor={props.borderColor} secondaryColor={props.secondaryColor} />
        </div>
    )
}

export default TaskMenu