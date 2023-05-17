import { useEffect, useState } from "react";
import MenuButton from "./complementary/menu-buttons"
import { AiOutlineHome, AiOutlineContainer,AiOutlineFolder,AiOutlinePieChart } from "react-icons/ai";

function MenuAside(props:any) {

    const [menuSelected, setMenuSelected] = useState("desktop");

    useEffect(() => {
        props.changeContent(menuSelected);
    }, [menuSelected])

    return (
        <aside className="h-screen fixed gap-4 bg-black/5 dark:bg-white/5 w-80 border-r border-black/25 dark:border-white/25 py-4 flex flex-col justify-between items-center">
            <img className="h-28 mt-8" src="ThePub-Black.png" />
            
            <div className="flex flex-col justify-center items-center w-full gap-1 px-4 ">
                <MenuButton function={setMenuSelected} arguments="desktop" selected={menuSelected}><AiOutlineHome/>Escritorio</MenuButton>
                <MenuButton function={setMenuSelected} arguments="tasks" selected={menuSelected}><AiOutlineContainer/>Tareas</MenuButton>
                <MenuButton function={setMenuSelected} arguments="folders" selected={menuSelected}><AiOutlineFolder/>Carpetas</MenuButton>
                <MenuButton function={setMenuSelected} arguments="databases" selected={menuSelected}><AiOutlinePieChart/>Bases de Datos</MenuButton>
            </div> 

            <div className="flex justify-start items-center gap-5 mb-4 pt-8 border-gray-800  px-6  border-t-2 w-full">
                <div>
                    <img src="./profile.png" alt="Profile" className="w-12 rounded-full" />
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
