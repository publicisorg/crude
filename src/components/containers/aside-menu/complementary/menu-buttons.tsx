import { useEffect, useState } from "react";

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
        <button className={`${selected ? "font-bold  dark:!bg-[#7364d0] dark:!text-white !text-black" : "" } rounded-xl h-14 my-1 w-full dark:bg-black/25 bg-white/25 hover:bg-[#7364d0]/50  hover:text-black/50 hover:dark:text-white/50 text-gray-800 dark:text-gray-400 duration-250 py-1 dark:border-white/25 border-black/25 text-left flex gap-2 justify-start items-center px-8 duration-300 ${opacity}`} onClick={handleClick}>{props.children}</button>
    )
}

export default MenuButton
