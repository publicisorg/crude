import React from 'react'
import { supabase } from "../supabase/client";

export const Home = () => {
  return (
    <div>Home

      <button onClick={()=> supabase.auth.signOut()}>LogOut</button>
    </div>
  )
}
export default Home;