import { Avatar, Tooltip } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../supabase/client";

export const Profile = (props: any) => {

  return (
    <div className="flex justify-start items-center gap-2 py-3 hover:bg-white/25 px-2 w-full">
      <div>
        <div className="relative">
          <img alt={props.name} className="w-[42px] h-[42px] rounded-full" src={props.urlImg} />
          <span className="absolute h-3.5 w-3.5 rounded-full border-2 border-white dark:border-gray-800 bg-green-400 -top-1 -left-1"></span>
        </div>
      </div>
      <div>{props.name + " " + props.lastName}
      </div>
    </div>
  );
};

export function MultipleProfiles(props: any) {

  const [users, setUsers] = useState<any>([]);

  async function getUserById(userUUID: any) {
    const data: any = await supabase.from('users').select('name, lastname, urlImg, userNick').eq("uuid", userUUID);
    return data;
  }


  useEffect(() => {
    const usuarios: any = [];
    props.users.forEach((user: any) => {
      getUserById(user.userId).then((userData: any) => {
        usuarios.push(
          {
            name: userData.data[0].name,
            lastname: userData.data[0].lastname,
            urlImg: userData.data[0].urlImg,
            userNick: userData.data[0].userNick
          }
        );
        console.log("VARIABLE USUARIOS");
        console.log(usuarios);
      });
      setUsers(usuarios);
    });
  }, [])

  useEffect(() => {
    console.log("USERS");
    console.log(users);
  }, [users])

  return (
    <>
      {(props.isSupervisor || props.isAccount) && props.users != undefined && <td className="w-1/5 flex justify-center items-center flex-wrap gap-2">
        <Avatar.Group>
          {users.length > 1 &&
            users.map((user: any) => {
              return (
                <Link className="flex -space-x-4" to={'/profile/' + user.userNick}>
                  <Tooltip content={user.name + " " + user.lastname} className="bg-black text-white">
                    <img
                      className="rounded-full w-10 h-10 border-2"
                      src={user.urlImg}
                      style={{ borderColor: props.borderColor, backgroundColor: props.secondaryColor }}
                    />
                  </Tooltip>
                </Link>
              )
            })
          }
        </Avatar.Group>
        {users.length == 1 &&
          users.map((user: any) => {
            return (
              <Link className="" to={'/profile/' + user.userNick}>
                <Tooltip content={user.name + " " + user.lastname} className="bg-black text-white">
                  <img
                    src={user.urlImg}
                    className="w-10 h-10 rounded-full border-2"
                    style={{ borderColor: props.borderColor, backgroundColor: props.secondaryColor }}
                  />
                </Tooltip>
              </Link>
            )
          })
        }

      </td>}
      {(props.isSupervisor || props.isAccount) && props.users == undefined && <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex justify-center items-center">
          <span className="inline-flex px-2 text-xs font-semibold leading-5 text-red-200 bg-red-600 rounded-full">
            SIN ASIGNAR
          </span>
        </div>
      </td>}
    </>
  )
}

export default Profile;
