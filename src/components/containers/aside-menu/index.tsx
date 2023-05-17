import { useEffect, useState } from "react";
import MenuButton from "./complementary/menu-buttons"


function MenuAside(props:any) {

    const [menuSelected, setMenuSelected] = useState("desktop");

    useEffect(() => {
        props.changeContent(menuSelected);
    }, [menuSelected])

    return (
        <aside className="h-screen fixed gap-4 bg-black/5 dark:bg-white/5 w-80 border-r border-black/25 dark:border-white/25 py-4 flex flex-col justify-between items-center">
            <img className="h-28" src="ThePub-Black.png" />
            
            <div className="flex flex-col justify-center items-center w-full gap-1">
                <MenuButton function={setMenuSelected} arguments="desktop" selected={menuSelected}>Escritorio</MenuButton>
                <MenuButton function={setMenuSelected} arguments="tasks" selected={menuSelected}>Tareas</MenuButton>
                <MenuButton function={setMenuSelected} arguments="folders" selected={menuSelected}>Carpetas</MenuButton>
                <MenuButton function={setMenuSelected} arguments="databases" selected={menuSelected}>Bases de Datos</MenuButton>
            </div> 

            <div className="flex justify-center flex-col items-center">
                <p>Hola Julian</p>
                <p>Perfil</p>
                <p>Cerrar Sesion</p>
            </div>

        </aside>
    )
}

export default MenuAside
