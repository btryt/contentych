import React, { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

interface ContextType {
  isAuth?: boolean
  loaded?: boolean
  login?: (login: string, password: string) => void
  logOut?: () => void
}

const AuthContext = React.createContext<ContextType>({})
const AuthProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const location = useNavigate()
  const [isAuth, setIsAuth] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const checkAuth =  () => {
      setLoaded(false)
      fetch("/api/auth")
      .then(async (res:Response) =>{
         const data = await res.json() 
         setIsAuth(data.auth)  
      })
      .finally(()=>setLoaded(true))
    
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const login = async (login: string, password: string) => {
    try {
      let response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ login, password }),
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
      })
      if (response.ok) {
        checkAuth()
        location("/home",{replace:true})
      }
    } catch (error) {}
  }

  const logOut = async () => {
    const respons = await fetch("/api/logout", { method: "POST" })
    if (respons.ok) {
      checkAuth()
      location("/login",{replace:true})
    }
  }

  return (
    <AuthContext.Provider value={{ isAuth, loaded, login, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  return useContext(AuthContext)
}

export { useAuth }
export default AuthProvider
