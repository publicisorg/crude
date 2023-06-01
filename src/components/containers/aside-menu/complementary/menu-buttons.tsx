import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MenuButton(props: any) {

    const [selected, setSelected] = useState(false);
    const [menuColor, setMenuColor] = useState(props.secondaryColor);
    const [borderColor, setBorderColor] = useState(props.borderColor);

    useEffect(() => {
        if (props.selected == props.arguments) {
            setSelected(true);
        } else {
            setSelected(false);
        }

        setMenuColor(props.secondaryColor);
        setBorderColor(props.borderColor);
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
        <Link to={props.arguments} onClick={handleClick} className="w-full">
            <div style={{ backgroundColor: menuColor, borderColor: borderColor }} className={`${selected ? "font-bold opacity-100" : "opacity-50"} ${props.px} hover:brightness-125 rounded-xl h-14 my-1 w-full duration-300 py-1 border text-left flex gap-2 justify-start items-center`} >
                {props.children}
            </div>
        </Link>
    )
}

export default MenuButton
