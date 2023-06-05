import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SelectRole(props: any) {

    const [showSelect, setShowSelect] = useState(false);
    const navigate = useNavigate();

    function handleChange(event: any) {
        props.function(event.target.value);
        props.setMenuSelected("/");
        navigate('/');
    }

    function buildOptions() {
        const optionsJSX: any = [];
        var possibleRoles = props.possibleRoles.filter((rol: any) => rol != "admin");
        if (props.possibleRoles.filter((rol: any) => rol == "admin").length > 0) {
            possibleRoles = ["user", "supervisor", "director", "account"];
        }
        possibleRoles.forEach((role: any, index: any) => {
            var displayRole = "";
            switch (role) {
                case "user":
                    displayRole = "Usuario";
                    break;
                case "supervisor":
                    displayRole = "Supervisor";
                    break;
                case "director":
                    displayRole = "Director";
                    break;
                case "account":
                    displayRole = "Cuentas";
                    break;
                default:
                    displayRole = "ERROR";
                    break;
            }
            optionsJSX.push(<option key={index} value={role}>{displayRole}</option>)
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
    }, [props.possibleRoles])

    return (
        <select onChange={(e) => handleChange(e)}
            className={`${showSelect ? "" : "hidden"} border hover:brightness-150 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center duration-300 w-3/4`}
            style={{ borderColor: props.borderColor, backgroundColor: props.secondaryColor }}>
            {buildOptions()}
        </select>
    )
}

export default SelectRole
