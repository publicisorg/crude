
import {useAuth0} from '@auth0/auth0-react'

export const LoginButton = () => {

    const{loginWithRedirect} = useAuth0()

  return (
    <div>
        <button onClick={() => loginWithRedirect()}>Login</button>
    </div>
  )
}
export const Logout = () => {

  const{logout} = useAuth0()

return (
  <div>
      <button onClick={() => logout()}>Cerrar Sesion </button>
  </div>
)
}
