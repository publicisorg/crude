import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MenuButton(props: any) {

    const [opacity, setOpacity] = useState("opacity-0");
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        setOpacity("opacity-100");
    }, [])

    useEffect(() => {
        if (props.selected == props.arguments) {
            setSelected(true);
        } else {
            setSelected(false);
        }
    })

    function handleClick() {
        if (props.function != undefined) {
            if (props.arguments != undefined) {
                props.function(props.arguments);
            } else {
                props.function();
            }
        }
    }

    return (
        <Link to={props.arguments} className={`${selected ? "font-bold  dark:!bg-[#7364d0] dark:!  ! " : "" } rounded-xl h-14 my-1 w-full ${props.px} dark:bg-black/25 bg-white/25 hover:bg-[#7364d0]/50  hover: /50 hover:dark: /50   dark:  duration-250 py-1 dark:border-white/25 border-black/25 text-left flex gap-2 justify-start items-center duration-300 ${opacity}`} onClick={handleClick}>{props.children}</Link>
    )
}

export default MenuButton
