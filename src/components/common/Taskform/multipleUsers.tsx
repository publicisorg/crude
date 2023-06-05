import { useEffect, useState } from "react";
import GenericInput from "../inputs/inputs";
import SelectUser from "../selectors/selectUsers";
import GenericButton from "../buttons";
import { supabase } from "../../../supabase/client";

export function MultipleUsers(props: any) {

    const [userId, setUser] = useState("")
    const [hours, setHours] = useState(0)
    const [price, setPrice] = useState(0)
    const [id, setId] = useState("")
    const [userFullname, setFullname] = useState("");

    function handleClick() {
        const now = Date.now();
        setId(userId + now.toString());
        props.addUser(id, userId, hours, price, userFullname);
    }

    useEffect(() => {
        getUserData(userId).then((user: any) => {
            setFullname(user.data[0].name + ' ' + user.data[0].lastname);
        })
    }, [userId])

    async function getUserData(userId: any) {
        const data = await supabase.from('users').select('name, lastname').eq('uuid', userId);
        return data;
    }

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full flex flex-row justify-center items-center gap-4">
                <SelectUser setUser={setUser} secondaryColor={props.secondaryColor} borderColor={props.borderColor} />
                <GenericInput function={setHours} name="hours" id="hours" label="Horas estimadas:" type="number" defaultValue={0} secondaryColor={props.secondaryColor} borderColor={props.borderColor} />
                <GenericInput function={setPrice} name="price" id="price" label="Precio hora:" type="number" defaultValue={0} secondaryColor={props.secondaryColor} borderColor={props.borderColor} />
                <GenericButton className="mt-8" function={handleClick} label="+" secondaryColor={props.secondaryColor} borderColor={props.borderColor} />
            </div>
            {props.users.length > 0 && <div className="flex flex-col justify-start items-center w-full mt-4 gap-2">
                <div className="flex flex-row justify-around items-center w-full py-2 rounded-lg border" style={{ backgroundColor: props.secondaryColor, borderColor: props.borderColor }}>
                    <p className="w-24 text-center">Nombre</p>
                    <p className="w-24 text-center">Horas</p>
                    <p className="w-24 text-center">Precio Hora</p>
                    <p className="w-24 text-center">Total</p>
                    <p className="w-24 text-center"></p>
                </div>
                {props.users.map((user: any, index: number) => {
                    return (
                        <div className="flex flex-row justify-around items-center w-full py-2 rounded-lg border" key={index} style={{ backgroundColor: props.secondaryColor, borderColor: props.borderColor }}>
                            <p className="w-24 text-center">{user.userFullname}</p>
                            <p className="w-24 text-center">{user.hours} Hs.</p>
                            <p className="w-24 text-center">$ {user.price}</p>
                            <p className="w-24 text-center">$ {user.hours * user.price}</p>
                            <GenericButton function={() => props.removeUser(user.id)} label="Quitar" className="w-24 text-center" secondaryColor={props.secondaryColor} borderColor={props.borderColor} />
                        </div>
                    )
                })}
            </div>}
        </div>
    )
}

export default MultipleUsers