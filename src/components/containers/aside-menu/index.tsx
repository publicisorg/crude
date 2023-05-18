import { useEffect, useState } from "react";
import MenuButton from "./complementary/menu-buttons"
import { AiOutlineHome, AiOutlineContainer, AiOutlineFolder, AiOutlinePieChart, AiOutlineBell, AiFillSetting } from "react-icons/ai";
import { Button, Tooltip } from "@material-tailwind/react";
import Profile from "../../common/profileUser";
import { Login } from "../login/login";

function MenuAside(props: any) {

    const [menuSelected, setMenuSelected] = useState("desktop");

    useEffect(() => {
        props.changeContent(menuSelected);
    }, [menuSelected])

    return (
        <aside className="h-screen fixed gap-2 bg-[#1f2128] dark:bg-gradient-to-b from-[#1F1F1F] to-[#1f2128] w-80 border-r border-[#434343] dark:border-white/25  flex justify-between flex-col  items-center">
            <div className="flex flex-col justify-evenly">
                <div className="pb-8 px-6  w-full flex justify-center">
                    <div className="my-9 w-full flex justify-center items-center p-2">
                        <img className="w-1/2" src="ThePub-Black.png" />
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center w-full gap-1 px-4 ">
                    <MenuButton function={setMenuSelected} arguments="desktop" selected={menuSelected}><AiOutlineHome />Escritorio</MenuButton>
                    <MenuButton function={setMenuSelected} arguments="notifications" selected={menuSelected}>
                        <AiOutlineBell />Notificaciones
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 right-0 bottom-0"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>

                    </MenuButton>


                    <MenuButton function={setMenuSelected} arguments="tasks" selected={menuSelected}><AiOutlineContainer />Tareas</MenuButton>
                    <MenuButton function={setMenuSelected} arguments="folders" selected={menuSelected}><AiOutlineFolder />Carpetas</MenuButton>
                    {false && <MenuButton function={setMenuSelected} arguments="databases" selected={menuSelected}><AiOutlinePieChart />Bases de Datos</MenuButton>}
                </div>
            </div>
            <div className="flex justify-between items-center  bg-white/5   w-full">
            <Login></Login> 

                <div className="p-4">
                    <div className="absolute inline-block z-10 rounded-lg py-2 px-3 text-sm font-medium shadow-sm transition-opacity duration-300 invisible opacity-0 bg-gray-900 text-white dark:bg-gray-700"><div className="relative z-20">Tooltip content</div><div className="absolute z-10 h-2 w-2 rotate-45 bg-gray-900 dark:bg-gray-700" >&nbsp;</div></div>

                    <Tooltip content="Ajustes de usuario">
                        <Button>
                            <AiFillSetting />
                        </Button>
                    </Tooltip>
                </div>
            </div>

        </aside>
    )
}

export default MenuAside
