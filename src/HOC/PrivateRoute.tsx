import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
const PrivateRoute:React.FC<{children:JSX.Element,forAdmin?:boolean}> = ({children,forAdmin = false}) =>{
    const {isAuth,admin,owner,loaded} = useAuth()
    if(!isAuth && loaded){
        return <Navigate to="/login"/>
    }
    if(forAdmin && loaded && !owner){
        return <Navigate to="/home"/>
    }
    return children
}

export {PrivateRoute}