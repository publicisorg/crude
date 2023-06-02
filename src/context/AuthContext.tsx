// @ts-nocheck

import { Session } from '@supabase/supabase-js'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import { supabase } from '../supabase/client'
import {
  GetUser,
  Logout,
  handleGetUserData
} from '../supabase/supabase.service'
import { IUser } from '../supabase/types'

interface AuthContextProps {
  children: ReactNode
}

const AuthContext = createContext<{
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
  getUser: () => Promise<IUser[]>
  handleLogout: () => void
  user: IUser | null
  handleCloseModal: () => void
  handleopenModal: () => void
  openModal: boolean
}>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  getUser: () => Promise.resolve([]),
  handleLogout: () => {},
  user: null,
  handleCloseModal: () => {},
  handleopenModal: () => {},
  openModal: false
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<IUser | null>(null)
  const [openModal, setOpenModal] = useState<boolean>(false)

  useEffect(() => {
    const session = supabase.auth.session()
    const isAuth = Boolean(session)
    setIsAuthenticated(isAuth)
    if (isAuth) {
      handlegGetUser(session)
    }
  }, [])

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        await handlegGetUser(session)
        setIsAuthenticated(true)
      }
      if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false)
        setUser(null)
      }
    })
    return () => {
      if (data) data.unsubscribe()
    }
  }, [])

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleopenModal = () => {
    setOpenModal(true)
  }

  const handlegGetUser = async (session: Session | null) => {
    const data = await handleGetUserData({
      email: session?.user?.email as string
    })

    setUser(data[0])
  }

  const getUser = async () => {
    const response = await GetUser()
    return response
  }

  const handleLogout = async () => {
    await Logout()
  }
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        handleLogout,
        getUser,
        user,
        handleCloseModal,
        handleopenModal,
        openModal
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default useAuth;