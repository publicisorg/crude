
import {supabase} from "../../../supabase/client";

const buttonStyles = "px-4 py-2 bg-black/10 dark:bg-white/25 hover:bg-black/25 hover:dark:bg-white/50 rounded-xl duration-300";
//const buttonStylesOnlyText = "rounded-xl duration-300";

export const LoginButton = () => {

  return (
    <div>
      
    </div>
  )
}
export const Logout = () => {


  return (
    <div>
      <button onClick={() => supabase.auth.signOut()} className={`${buttonStyles}`}>Cerrar Sesion </button>
    </div>
  )
}
