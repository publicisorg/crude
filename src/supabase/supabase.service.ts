// @ts-nocheck

import { supabase } from './client'
import {
    IUser
  } from './types'



// Creo un nuevo usuario
export const AddNewUser = async ({
    name,
    lastname,
    puesto,
    color,
    rol,
    email,
  }: IUser): Promise<IUser[]> => {
    const { data } = await supabase
      .from('usuarios')
      .insert({ name,
        lastname,
        puesto,
        color,
        rol,
        email, })
    return data || []
  }








// obtengo data del usuario

  export const GetUser = async (): Promise<IUser[]> => {
    const user = await supabase.auth.user()
    // retornar snackbar
    const { data } = await supabase
      .from('usuarios')
      .select('id, name, email')
      .match({ email: user?.email as string })
    return data || []
  }




export const handleGetUserData = async ({
    email
  }: Pick<IUser, 'email'>): Promise<IUser[]> => {
    const { data } = await supabase.from('usuarios').select('*').eq('email', email)
    return data || []
  }
  
  export const SignUp = async ({
    name,
    lastname,
    puesto,
    color,
    rol,
    email,
    password

  }: Omit<IUser, 'id'>) => {
    const { user, session, error } = await supabase.auth.signUp({
      email,
      password
    })
    if (error) return error.message
    if (user || session) {
      await supabase.from('usuarios').insert({
        name,
    lastname,
    puesto,
    color,
    rol,
      })
    }
  
    return user || []
  }
  
  // create login NextApiRequest
  export const Login = async ({
    email,
    password
  }: Pick<IUser, 'email' | 'password'>) => {
    const { session } = await supabase.auth.signIn({
      email,
      password
    })
    return session
  }
  
  export const Logout = async () => {
    await supabase.auth.signOut()
  }

  export default GetUser;