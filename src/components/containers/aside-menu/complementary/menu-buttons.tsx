import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MenuButton(props: any) {

    const [selected, setSelected] = useState(false);
    const [menuColor, setMenuColor] = useState(props.secondaryColor);
    const [borderColor, setBorderColor] = useState(props.borderColor);
    const [px, setPx] = useState("px-4");

    useEffect(() => {
        if (props.selected == props.arguments) {
            setSelected(true);
            setPx('px-6 tracking-widest');
        } else {
            setSelected(false);
            setPx('px-4');
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
            <div style={{ backgroundColor: menuColor, borderColor: borderColor }} className={`${selected ? "" : "!bg-transparent hover:px-2"} ${px} rounded-lg h-10 w-full duration-300 text-left flex gap-2 justify-start items-center`} >
                {props.children}
            </div>
        </Link>
    )
}

export default MenuButton
