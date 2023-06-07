import { useEffect, useState } from "react";
import { supabase } from '../../../supabase/client'
import { Link } from "react-router-dom";

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




    <>
     {activeUsers.map((user) => ( <div className="flex flex-shrink-0" key={user.id}>
        <div className="flex-2">
          <div className="flex items-center
          ">
            <div>
              <img className="w-[50px] h-[50px] w-auto rounded-full"
                src={user.urlImg} alt={user.name} />
            </div>
            <div className="ml-3 mt-3">
              <p className="text-base leading-6 font-medium text-white">
              {user.name} {user.lastname}
              </p>
              <p
                className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                @{user.userNick}
              </p>
            </div>
          </div>

        </div>
        <div className="flex-1 px-4 py-2 m-2">
          
        <Link to={"/profile/"+user.userNick} className=" float-right">
            <button
              className="bg-transparent hover:bg-black/10 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded-full">
              ir al perfil
            </button>
            </Link>

        </div>
      </div> ))}









    </>


  );
}

export default ActiveUsers;
