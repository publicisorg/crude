
import { useAuth0 } from '@auth0/auth0-react'

const buttonStyles = "px-4 py-2 bg-black/10 dark:bg-white/25 hover:bg-black/25 hover:dark:bg-white/50 rounded-xl duration-300";
const buttonStylesOnlyText = "text-black dark:text-white hover:text-gray-500 hover:dark:text-gray-700 rounded-xl duration-300";

export const LoginButton = () => {

  const { loginWithRedirect } = useAuth0()

  return (
    <div>
      <button onClick={() => loginWithRedirect()} className={`${buttonStyles}`}>Iniciar Sesion</button>
    </div>
  )
}
export const Logout = () => {

  const { logout } = useAuth0()

  return (
    <div>
      <button onClick={() => logout()} className={`${buttonStylesOnlyText}`}>Cerrar Sesion </button>
    </div>
  )
}
