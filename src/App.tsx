import './App.css'
import Main from './components/containers/main';
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from './components/common/LoginButton';

function App() {

  const { isAuthenticated } = useAuth0();

  const mainBgColors = "bg-stone-200 dark:bg-black";
  const textColors = "text-black dark:text-white";

  return (

    <main className={`w-full ${mainBgColors} ${textColors}`}>

      {!isAuthenticated &&
        <div className="w-full h-screen flex flex-col justify-center items-center gap-8">
          <img src="logo.svg" className="w-48"/>
          <h1 className="text-2xl">Bienvenido a la herramienta interna de Publicis Groupe Argentina</h1>
          <Auth0Provider domain={'thepub.us.auth0.com'} clientId={'aTPMnb756S8dZiOWZZjIJ6nZj0stWqDp'} authorizationParams={{ redirect_uri: window.location.origin }}>
            <LoginButton />
          </Auth0Provider>
        </div>}
        
      {isAuthenticated && <div className={`w-full ${mainBgColors} ${textColors}`}>
        <Main />
      </div>}
    </main >
  )
}

export default App
