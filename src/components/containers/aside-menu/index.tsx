import { useEffect, useState } from "react";
import MenuButton from "./complementary/menu-buttons"
import { AiOutlineHome, AiOutlineContainer, AiOutlineFolder, AiOutlinePieChart, AiOutlineBell, AiFillSetting, AiOutlineStar } from "react-icons/ai";
import SelectRole from "./complementary/select-role";
import Profile from "../../common/profileUser";
import { supabase } from "../../../supabase/client";
import { Link } from "react-router-dom";


function MenuAside(props: any) {
    const [tasks, setTasks] = useState([]);
    const [menuSelected, setMenuSelected] = useState("/");
    const [possibleRoles, setPossibleRoles] = useState(props.possibleRoles);
    const [isAdmin, setAdmin] = useState(true);
    const [showAdmin, setShowAdmin] = useState(false);

    const possibleRolesProps = props.possibleRoles;

    useEffect(() => {
        getTasksData().then((data: any) => {
            setTasks(data.data);
        })
        props.changeContent(menuSelected);
    }, [menuSelected])

    useEffect(() => {
        if (props.possibleRoles.length > 0) {
            if (props.possibleRoles.filter((rol: any) => rol == 'admin').length > 0) {
                setShowAdmin(true);
            } else {
                setShowAdmin(false);
            }
        }
    })

    async function getTasksData() {
        if (props.userFilter == "*") {
            const data = await supabase.from('tasks').select('*');
            return data;
        } else {
            const data = await supabase.from('tasks').select('*').eq('user', props.userFilter).eq('done', false);
            return data;
        }
    }

    function handlePosibleRoles() {
        if (!isAdmin) {
            setPossibleRoles(possibleRolesProps.filter((rol: any) => rol != "admin"));
            setAdmin(true);
        } else {
            setPossibleRoles(possibleRolesProps);
            setAdmin(false);
        }
    }

    function notificationDing() {
        if (tasks.length > 0) {
            const jsx: any = [];
            tasks.forEach((element: any, index: any) => {
                jsx.push(
                    <span key={index} className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 right-0 bottom-0"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>)
            });
            return jsx;
        } else {
            return "";
        }
    }

    return (
        <aside className="h-screen fixed gap-2 bg-gradient-to-b from-black/40 to-black/10 dark:from-white/25 dark:to-white/10 w-80 border-r border-black/10 dark:border-white/25 flex justify-between flex-col  items-center">
            <div className="flex flex-col justify-evenly">
                <div className="pb-8 px-6  w-full flex justify-center">
                    <div className="my-9 w-full flex justify-center items-center p-2">
                        <img className="w-1/2" src="http://localhost:5173/ThePub-Black.png" />
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center w-full gap-1 px-4 ">
                    <MenuButton secondaryColor={props.secondaryColor} borderColor={props.borderColor} function={setMenuSelected} arguments="/" selected={menuSelected} px="px-8"><AiOutlineStar />   Noticias</MenuButton>
                    <MenuButton secondaryColor={props.secondaryColor} borderColor={props.borderColor} function={setMenuSelected} arguments="desktop" selected={menuSelected} px="px-8"><AiOutlineHome />   Escritorio</MenuButton>
                    <MenuButton secondaryColor={props.secondaryColor} borderColor={props.borderColor} function={setMenuSelected} arguments="notifications" selected={menuSelected} px="px-8">
                        <AiOutlineBell />
                        Actividad
                        {notificationDing()}
                    </MenuButton>
                    <MenuButton secondaryColor={props.secondaryColor} borderColor={props.borderColor} function={setMenuSelected} arguments="tasks" selected={menuSelected} px="px-8"><AiOutlineContainer />Tareas</MenuButton>
                    {props.role == "supervisor" && <MenuButton secondaryColor={props.secondaryColor} borderColor={props.borderColor} function={setMenuSelected} arguments="createtasks" selected={menuSelected} px="px-8"><AiOutlineContainer />Crear Tareas</MenuButton>}
                    <MenuButton secondaryColor={props.secondaryColor} borderColor={props.borderColor} function={setMenuSelected} arguments="folders" selected={menuSelected} px="px-8"><AiOutlineFolder />Carpetas</MenuButton>
                    {false && <MenuButton secondaryColor={props.secondaryColor} borderColor={props.borderColor} function={setMenuSelected} arguments="databases" selected={menuSelected} px="px-8"><AiOutlinePieChart />Bases de Datos</MenuButton>}
                </div>
            </div>
            <div className="flex flex-col justify-center items-center w-full gap-6">
                {showAdmin && <div className="flex flex-row gap-2 justify-center items-center">
                    <input type="checkbox" name="admin" onClick={handlePosibleRoles} defaultChecked={false} />
                    <label htmlFor="admin">Permisos Admin</label>
                </div>}
                <SelectRole function={props.setRole} possibleRoles={possibleRoles} setMenuSelected={setMenuSelected} />
                <div className="flex flex-row justify-evenly items-center bg-black/10 dark:bg-white/25 w-full">
                    <Link to="myprofile">
                        <Profile name={props.name} lastName={props.lastName} urlImg={props.urlImg} changeBg={props.changeBg} changeText={props.setTextColors} />
                    </Link>

                    <Link to="setting">  <div className="p-4">
                        <AiFillSetting />

                    </div>
                    </Link>
                </div>
            </div>


        </aside>
    )
}

export default MenuAside
