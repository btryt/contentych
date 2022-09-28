import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
const PrivateRoute:React.FC<{children:JSX.Element}> = ({children}) =>{
    const {isAuth,loaded} = useAuth()
    if(!isAuth && loaded){
        return <Navigate to="/login"/>
    }
    return children
}

export {PrivateRoute}