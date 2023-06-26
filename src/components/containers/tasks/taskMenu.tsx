import { useEffect, useState } from "react";
import WysiwygTextarea from "../../common/Textarea";
import GenericButton from "../../common/buttons";
import { GenericSelect } from "../../common/selectors/selectUsers"
import { supabase } from "../../../supabase/client";
import { Link, useParams } from "react-router-dom";
import MultipleUsers from "../../common/Taskform/multipleUsers";

export function TaskMenu(props: any) {
    const [priority, setPriority] = useState("");
    const [priorityDesc, setPriorityDesc] = useState("");
    const [previousPriority, setPreviousPriority] = useState("");

    const [status, setStatus] = useState("");
    const [statusDesc, setStatusDesc] = useState("");
    const [previousStatus, setPreviousStatus] = useState("");

    const [comment, setComment] = useState<any>([]);
    const [commentText, setCommentText] = useState<any>([]);
    const [actualComment, setActualComment] = useState<any>({});
    const [commentCount, setCommentCount] = useState(0);
    const [authUser, setAuthUser] = useState("SIN ASIGNAR");
    const [user, setUser] = useState([]);
    const [userData, setUserData] = useState<any>([]);
    const [users, setUsers] = useState<any>([]);
    const [lastChangeDesc, setLastChangeDesc] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [successOpacity, setSuccessOpacity] = useState("opacity-0");

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
            if (user?.length < 1 || user == undefined) {
                setUser(props.task.user);
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
        if (user?.length > 0) {
            const userInfo: any = [];
            user.forEach((element: any) => {
                getUserById(element.userId).then((userData: any) => {
                    userInfo.push({
                        name: userData[0].name,
                        lastname: userData[0].lastname,
                        userNick: userData[0].userNick,
                        urlImg: userData[0].urlImg
                    })
                    if (userInfo.length == user.length) {
                        setUserData(userInfo);
                    }
                })
            });

        }
    }, [user])

    useEffect(() => {
        getAuthUser();
        setUserData([]);
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
        if (comment.length > 0 && comment != props.task.comment) {
            updateDataInTable().then((response: any) => {
                if (response.status == 204) {
                    setShowSuccess(true);
                    setTimeout(() => {
                        setSuccessOpacity('opacity-100');
                    }, 10);
                    setTimeout(() => {
                        setSuccessOpacity('opacity-0');
                    }, 3010);
                    setTimeout(() => {
                        setShowSuccess(false);
                    }, 3320);
                } else {
                    console.log(response);
                }

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
        setCommentText(value);
    };

    useEffect(() => {
        setActualComment(
            {
                id: commentCount,
                comment: commentText,
                lastChange: lastChangeDesc,
                userId: authUser,
                time: Date.now()
            }
        );
    }, [commentCount, commentText, lastChangeDesc, authUser])

    async function updateDataInTable() {
        if (users?.length < 1) {
            const result = await supabase.from('tasks').update({
                status: status,
                priority: priority,
                comment: comment
            }).eq('id', id);
            return result;
        } else {
            const result = await supabase.from('tasks').update({
                user: users,
                status: status,
                priority: priority,
                comment: comment
            }).eq('id', id);
            return result;
        }
    }

    function addUser(id: any, userId: any, hours: any, price: any, userFullname: any) {
        setUsers([
            ...users,
            { id: id, userId: userId, hours: hours, price: price, userFullname: userFullname }
        ])
    }

    function removeUser(id: any) {
        setUsers(users.filter((user: any) => user.id !== id));
    }

    async function getUserById(userId: any) {
        if (userId != undefined) {
            const { data, error } = await supabase
            .from('users')
            .select('name, lastname, urlImg, userNick')
            .eq("uuid", userId);
        if (error) {
            console.error(error);
            return null;
        }
        return data;
        } else {
            return null;
        }
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
        <div className="p-4 rounded-lg shadow-lg w-1/2 border flex flex-col gap-4" style={{ borderColor: props.borderColor }}>
            <div className="flex flex-row justify-start items-center gap-2">
                <p className="text-sm">Nombre de tarea:</p>
                <p className="text-sm">{props.task.name}</p>
            </div>
            <div className="flex flex-row justify-start items-center gap-2">
                <p className="text-sm">Marca:</p>
                <p className="text-sm">{props.task.marca}</p>
            </div>
            <div className="flex flex-row justify-start items-center gap-2">
                <p className="text-sm">Cliente:</p>
                <p className="text-sm">{props.task.client}</p>
            </div>
            <div className="flex flex-row w-full gap-4">
                <GenericSelect value={status} onChange={setStatus} label="Estado:" data={taskStates} borderColor={props.borderColor} secondaryColor={props.secondaryColor} />
                {props.role != "user" && <GenericSelect value={priority} onChange={setPriority} label="Prioridad:" data={taskPriority} borderColor={props.borderColor} secondaryColor={props.secondaryColor} />}
                {props.role == "user" &&
                    <div className="w-full">
                        <div className="flex flex-col">
                            <div className="mb-2 block">
                                <label className="text-sm font-medium" data-testid="flowbite-label">Prioridad:</label>
                            </div>
                            <div
                                className="border font-medium rounded-lg text-sm px-5 py-2.5 text-left w-full"
                                style={{ borderColor: props.borderColor, backgroundColor: props.secondaryColor }}>
                                {priority}
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className="flex flex-col">
                <p className="text-sm">Usuarios asignados:</p>
                <div className="flex flex-row flex-wrap mt-2 gap-4">
                    {
                        userData.map((singleUser: any) => {
                            if (singleUser.name != undefined) {
                                return (
                                    <Link to={"/profile/" + singleUser.userNick} className="flex flex-row gap-2 justify-center items-center">
                                        <img src={singleUser.urlImg} alt="" className="rounded-full w-10 h-10 border-2" width="40" height="40" style={{ borderColor: props.borderColor }} />
                                        <h6 className="font-bold mb-0 fs-4 ml-2">{singleUser.name + " " + singleUser.lastname}</h6>
                                    </Link>
                                )
                            }
                        })}
                </div>
            </div>
            {props.role != "user" && <MultipleUsers addUser={addUser} removeUser={removeUser} users={users} secondaryColor={props.secondaryColor} borderColor={props.borderColor} />}
            <WysiwygTextarea required={true} function={handleTextareaChange} borderColor={props.borderColor} secondaryColor={props.secondaryColor} />
            <GenericButton function={handleSubmit} label="Enviar" borderColor={props.borderColor} secondaryColor={props.secondaryColor} />
            {showSuccess && <div className={`${successOpacity} w-full flex flex-row justify-center items-center py-2 px-4 rounded-lg bg-lime-600 duration-300`}>La tarea se ha actualizado correctamente.</div>}
        </div>

    )
}

export default TaskMenu