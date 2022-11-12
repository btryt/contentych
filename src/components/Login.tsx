import React,{useRef,MutableRefObject} from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'
const Login:React.FC = () =>{
    const {isAuth,login,loaded} = useAuth()
    const loginRef = useRef() as MutableRefObject<HTMLInputElement>
    const passwordRef = useRef() as MutableRefObject<HTMLInputElement>

    if(isAuth && loaded){
        return <Navigate to="/"/>
    }

    const submit = (e:any) =>{
        e.preventDefault()
        const userLogin = loginRef.current.value.trim()
        const userPassword = passwordRef.current.value.trim()
        if(userLogin && userPassword ){
           login?.(userLogin,userPassword)
        }
    }

    return (
    <div style={{minHeight:"80vh"}} className='flex justify-center items-center '>
        <div className='px-3 w-full mx-3 flex justify-center'>
            <div style={{backgroundColor:"rgb(38, 43, 41)",color:"rgb(176, 169, 159)"}} className='w-full opacity-80 sm:w-1/2 rounded-md p-4 flex flex-col items-center shadow-lg
            ' >
                <span className=' text-lg'>Войти</span>
                <form className='flex flex-col w-full' onSubmit={submit}>
                    <input ref={loginRef} className='my-2 p-2 rounded-md bg-slate-700 ' placeholder='Логин'/>
                    <input ref={passwordRef} className='my-2 p-2 rounded-md bg-slate-700 ' placeholder='Пароль'/>
                    <button className='border-black text-white  p-2 rounded-md bg-green-700 hover:bg-green-600'>Войти</button>
                </form>
            </div>
        </div>
    </div>
    )
}

export default Login