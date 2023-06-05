import { useEffect, useState } from "react"
import { supabase } from "../../../supabase/client"

export function GenericSelect(props: any) {

    return (
        <div>
            <div className={`${props.label != undefined ? "mb-2" : ""} block`}><label className="text-sm font-medium" data-testid="flowbite-label">{props.label}</label></div>
            <div className="flex">
                <div className="relative w-full">
                    <select
                        className="border hover:brightness-150 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-left w-full duration-300"
                        onChange={e => props.onChange(e.target.value)}
                        required={props.required}
                        value={props.value}
                        style={{ backgroundColor: props.secondaryColor, borderColor: props.borderColor }}>
                        {props.data.map((element: any, index: number) => {
                            return (
                                <option key={index} value={element.value}>{element.displayValue}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
        </div >
    )
}

export function SelectUser(props: any) {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then((result: any) => {
            setUsers(result.data);
        });
    }, [])

    async function getUsers() {
        const data = await supabase.from('users').select('uuid, name, lastname');
        return data;
    }

    return (
        <div className="w-full">
            <div className="mb-2 block"><label className="text-sm font-medium    " data-testid="flowbite-label">Asignar a: </label></div>
            <div className="flex">
                <div className="relative w-full">
                    <select
                        className="border hover:brightness-150 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-left w-full duration-300"
                        onChange={e => props.setUser(e.target.value)}
                        style={{ backgroundColor: props.secondaryColor, borderColor: props.borderColor }}>
                        <option value="">Sin asignar</option>
                        {users.map((user: any, index: number) => {
                            return (
                                <option key={index} value={user.uuid}>{user.name + " " + user.lastname}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
        </div>
    )
}



export default SelectUser
