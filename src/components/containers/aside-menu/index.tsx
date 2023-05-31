import { useEffect, useState } from "react";
import MenuButton from "./complementary/menu-buttons"
import { AiOutlineHome, AiOutlineContainer, AiOutlineFolder, AiOutlinePieChart, AiOutlineBell, AiFillSetting } from "react-icons/ai";
import { Button, Tooltip } from "@material-tailwind/react";
import SelectRole from "./complementary/select-role";
import Profile from "../../common/profileUser";

function MenuAside(props: any) {

    const [menuSelected, setMenuSelected] = useState("desktop");

    useEffect(() => {
        props.changeContent(menuSelected);
    }, [menuSelected])

    return (
        <aside className="h-screen fixed gap-2 bg-gradient-to-b from-black/40 to-black/10 dark:from-white/25 dark:to-white/10 w-80 border-r border-black/10 dark:border-white/25 flex justify-between flex-col  items-center">
            <div className="flex flex-col justify-evenly">
                <div className="pb-8 px-6  w-full flex justify-center">
                    <div className="my-9 w-full flex justify-center items-center p-2">
                        <img className="w-1/2" src="ThePub-Black.png" />
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center w-full gap-1 px-4 ">
                    <MenuButton function={setMenuSelected} arguments="desktop" selected={menuSelected} px="px-8"><AiOutlineHome />   Escritorio</MenuButton>
                    <MenuButton function={setMenuSelected} arguments="notifications" selected={menuSelected} px="px-8">
                        <AiOutlineBell />Notificaciones
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 right-0 bottom-0"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                    </MenuButton>
                    <MenuButton function={setMenuSelected} arguments="tasks" selected={menuSelected} px="px-8"><AiOutlineContainer />Tareas</MenuButton>
                    <MenuButton function={setMenuSelected} arguments="createtasks" selected={menuSelected} px="px-8"><AiOutlineContainer />Crear Tareas</MenuButton>
                    <MenuButton function={setMenuSelected} arguments="folders" selected={menuSelected} px="px-8"><AiOutlineFolder />Carpetas</MenuButton>
                    {false && <MenuButton function={setMenuSelected} arguments="databases" selected={menuSelected} px="px-8"><AiOutlinePieChart />Bases de Datos</MenuButton>}
                </div>
            </div>
            <div className="flex flex-col justify-center items-center w-full gap-6">
                <SelectRole function={props.setRole} possibleRoles={props.possibleRoles} />
                <div className="flex flex-row justify-evenly items-center bg-black/10 dark:bg-white/25 w-full">
                <MenuButton function={setMenuSelected} arguments="setting" selected={menuSelected} px="!px-0 bg-black">
                          
                    <Profile name={props.name} lastName={props.lastName} urlImg={props.urlImg} />
                    <div className="p-4">
                             <AiFillSetting />
                      
                    </div>
                    </MenuButton>
                </div>
            </div>


        </aside>
    )
}

export default MenuAside
