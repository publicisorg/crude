import { useEffect, useState } from "react";

function SelectRole(props: any) {

    const [showSelect, setShowSelect] = useState(false);

    function handleChange(event: any) {
        props.function(event.target.value);
    }

    function buildOptions() {
        const optionsJSX: any = [];
        var possibleRoles = props.possibleRoles.filter((rol: any) => rol != "admin");
        if (props.possibleRoles.filter((rol: any) => rol == "admin").length > 0) {
            possibleRoles = ["user", "supervisor", "director", "account"];
        }
        possibleRoles.forEach((role: any, index: any) => {
            optionsJSX.push(<option key={index} value={role}>{role}</option>)
        })
        return optionsJSX;
    }

    useEffect(() => {
        var possibleRoles = props.possibleRoles.filter((rol: any) => rol != "admin");
        if (possibleRoles.length > 1 || props.possibleRoles.filter((rol: any) => rol == "admin").length > 0) {
            setShowSelect(true);
        } else {
            setShowSelect(false);
        }
        props.function(possibleRoles[0]);
    }, [props.possibleRoles])

    return (
        <select onChange={(e) => handleChange(e)} className={`${showSelect ? "" : "hidden"} w-3/4 p-2 bg-white/25 dark:bg-black/25 rounded-xl   dark: " name="roles" id="roles`}>
            {buildOptions()}
        </select>
    )
}

export default SelectRole
