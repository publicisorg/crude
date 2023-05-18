import { useEffect, useState } from "react";
import MenuButton from "./complementary/menu-buttons"
import { AiOutlineHome, AiOutlineContainer, AiOutlineFolder, AiOutlinePieChart, AiOutlineBell } from "react-icons/ai";

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
                    <MenuButton function={setMenuSelected} arguments="databases" selected={menuSelected}><AiOutlinePieChart />Bases de Datos</MenuButton>
                </div>
            </div>
            <div className="flex justify-start items-center gap-5  py-3 bg-white/5   px-6   w-full">
                <div>
                    <div className="relative">
                        <img alt="" className="rounded w-12 rounded" src="./profile.png" />
                        <span className="absolute h-3.5 w-3.5 rounded-full border-2 border-white dark:border-gray-800 bg-green-400 -top-1 -left-1"></span></div>

                </div>
                <div>
                    <p>Hola Julian!</p>
                    <a href="#"><small className="text-gray-500">Cerrar Sesion</small></a>
                </div>
            </div>

        </aside>
    )
}

export default MenuAside
