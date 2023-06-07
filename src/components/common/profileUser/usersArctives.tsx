import { useEffect, useState } from "react";
import { supabase } from '../../../supabase/client'
import { Link } from "react-router-dom";
import { GenericButtonDummy } from "../buttons";

interface User {
  id: string;
  name: string;
  lastname: string;
  urlImg: string;
  userNick: string;
}

function ActiveUsers(props: any) {
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  useEffect(() => {

    async function fetchActiveUsers() {
      const { data, error } = await supabase.from("users").select("*").eq("active", "isActive");
      if (error) {
        console.error("Error fetching active users:", error);
      } else {
        if (data) {
          const filteredUsers = data.filter((user: any) => user.id && user.name) as User[];
          setActiveUsers(filteredUsers);
        }
      }
    }

    fetchActiveUsers();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {activeUsers.map((user) => (
        <div className="flex flex-shrink-0 items-center justify-between" key={user.id}>
          <div className="flex-2">
            <div className="flex flex-row justify-center items-center gap-2">
              <img className="w-10 h-10 rounded-full" src={user.urlImg} alt={user.name} />
              <div className="flex flex-col">
                <p className="text-base leading-6 font-medium text-white">
                  {user.name} {user.lastname}
                </p>
                <p
                  className="text-sm leading-5 font-medium opacity-70">
                  @{user.userNick}
                </p>
              </div>
            </div>
          </div>
          <Link to={"/profile/" + user.userNick} className="float-right">
            <GenericButtonDummy label="Perfil" borderColor={props.borderColor} secondaryColor={props.secondaryColor} />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ActiveUsers;
