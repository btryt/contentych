import React, { useEffect, useRef, useState } from 'react'
import { GoPencil, GoTrashcan } from "react-icons/go"
import { useAuth } from './hooks/useAuth'

interface UserState {
  user_id:number
  login:string
  password:string
  admin:boolean
  owner:boolean
}

const AdminPage:React.FC = () =>{
    const {user_id} = useAuth() 
    const [users,setUsers] = useState([])
    const loginRef = useRef<any>(null)
    const passwordRef = useRef<any>(null)
    const adminRef = useRef<any>(null)
    const ownerRef = useRef<any>(null)
    const getUsers = () =>{
      fetch("/api/users")
      .then(async (res:Response)=>{
          if(res.ok){
            const {users} = await res.json()
            setUsers(users)
          }
          else{
            const {message} = await res.json()
            alert(message)
          }
      })
    }

    useEffect(()=>{
      getUsers()
    },[])

    const addNewUser = () =>{
      const login = loginRef.current.value?.trim()
      const password = passwordRef.current.value?.trim()
      const admin = adminRef.current.checked
      const owner = ownerRef.current.checked
      if(!login || !password || login.length > 10 || password.length < 7 || password.length > 20) return alert("Логин до 10 смволов. Пароль от 7 до 20 символов")
      fetch("/api/add/user",{method:"POST",headers: { "Content-Type": "application/json" },body:JSON.stringify({login,password,admin:admin,owner:owner})})
      .then(async (res:Response)=>{
        if(res.ok){
          const {message} = await res.json()
          getUsers()
          alert(message)
        }
      })
    }

    const changePassword = (id:number,login:string) =>{
      const newPassword = prompt("Новый пароль для пользователя -" + login,"")?.trim()
      if(!newPassword || newPassword.length <7 || newPassword.length > 20) return alert("Пароль от 7 до 20 символов")
      fetch("/api/user/update/pass",{method:"POST",headers: { "Content-Type": "application/json" },body:JSON.stringify({id,password:newPassword})})
      .then(async (res:Response)=>{
        if(res.ok){
          const {message} = await res.json()
          alert(message)
        }
      })
    }

    const deleteUser = (id:number,login:string) =>{
      const resume = confirm("Удалить пользователя " + login)
      if(!resume) return
      if(users.length < 2) return
      if(user_id == id) return
      fetch("/api/user/delete",{method:"POST",headers: { "Content-Type": "application/json" },body:JSON.stringify({id})})
      .then(async (res:Response)=>{
        if(res.ok){
          getUsers()
        }
      })
    }
    return (
    <div style={{color:"rgb(176, 169, 159)"}} className="w-full mt-2 lg:flex lg:flex-col lg:items-center" >
      <div className='p-2 mx-2 lg:w-2/4  '>
        <h1 className='text-center text-xl mb-2'>Страница администрации</h1>
        <div className='flex justify-center '>
          <div className=' w-full '>
          <h2 className='mb-2'>Создание пользователей</h2>
          <div><input ref={loginRef} className='p-2 mb-2 bg-slate-700 w-full' placeholder='Логин'/></div>
          <div><input ref={passwordRef} className='p-2 mb-2 bg-slate-700 w-full' placeholder='Пароль'/></div>
          <div>
            <p>Админ</p>
            <input ref={adminRef} type="checkbox" className='p-2 appearance-none w-8 h-8 rounded-sm bg-slate-700 checked:bg-green-400'/>
          </div>
          <div>
            <p>Полный доступ</p>
            <input ref={ownerRef} type="checkbox" className='p-2 appearance-none w-8 h-8 rounded-sm bg-slate-700 checked:bg-green-400'/>
          </div>
          <div>
            <button onClick={addNewUser} className='bg-green-700 p-2 rounded-md hover:bg-green-600 text-white'>Создать пользователя</button>
          </div>
          </div>
        </div>
        <div className='mt-4'>
          <h3>Список всех пользователей</h3>
          {users.map((user:UserState)=>(
            <div key={user.user_id} className='bg-slate-600 mt-2 p-2 rounded-sm flex justify-between items-center'>
              <div>
                <p>
                  Логин - {user.login}
                </p>
              <p>
                Роли:
              </p>
              <p>
                {user.admin && "Админ"}
              </p>
              <p>
                {user.owner && "Полный доступ"}
              </p>
              </div>
              <div className='text-2xl flex'>
                <div onClick={()=>changePassword(user.user_id,user.login)} className='mx-2 cursor-pointer'>
                  <GoPencil />
                </div>
                <div onClick={()=> deleteUser(user.user_id,user.login)} className='mx-2 cursor-pointer text-red-600 '>
                  <GoTrashcan/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    )
}

export default AdminPage