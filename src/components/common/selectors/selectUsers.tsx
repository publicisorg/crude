import { useEffect, useState } from "react"
import { supabase } from "../../../supabase/client"

function SelectUser(props: any) {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then((result:any) => {
            setUsers(result.data);
        });
    }, [])

    async function getUsers() {
        const data = await supabase.from('users').select('uuid, name, lastname');
        return data;
    }

    return (
        <div>
            <div className="mb-2 block"><label className="text-sm font-medium text-gray-900 dark:text-gray-300" data-testid="flowbite-label">Asignar a: </label></div>
            <div className="flex">
                <div className="relative w-full">
                    <select required
                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 rounded-lg shadow-sm dark:shadow-sm-light p-2.5 text-sm"
                        onChange={e => props.setUser(e.target.value)}
                    >
                        {users.map((user:any, index:number) => {
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
