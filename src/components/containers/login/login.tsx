import React from 'react'
import {Auth0Provider} from "@auth0/auth0-react"
import Profile from '../../common/profileUser'
import { Sesion } from '../../common/LoginButton'

export const Login = () => {


  return (
    <Auth0Provider domain={'thepub.us.auth0.com'} clientId={'aTPMnb756S8dZiOWZZjIJ6nZj0stWqDp'} authorizationParams={{
        redirect_uri: window.location.origin
      }}>
    <div>

<Profile></Profile>

     
        
        </div>
    </Auth0Provider>
  )
}
