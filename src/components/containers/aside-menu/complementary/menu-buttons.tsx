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
        <button className={`${selected ? "font-bold text-xl" : ""} h-20 w-full dark:bg-black/25 bg-white/25 hover:dark:bg-black/50 hover:bg-white/50 duration-300 py-6 border-t border-b dark:border-white/25 border-black/25 text-right px-8 ${opacity}`} onClick={handleClick}>{props.children}</button>
    )
}

export default MenuButton
