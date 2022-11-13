import React, { useEffect, useState,useMemo } from "react"
import { GoThreeBars } from "react-icons/go"
import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
interface Links {
  title: string
  to: string
}


const Header: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const { isAuth,owner,logOut } = useAuth()
  const links: Links[] = useMemo(() =>(!owner ?[
    { title: "Разделы", to: "home" },
    { title: "Найти", to: "search" },
    { title: "Выйти", to: "" },
  ]:[
    { title:"Админ панель",to:"admin"},
    { title: "Разделы", to: "home" },
    { title: "Найти", to: "search" },
    { title: "Выйти", to: "" }
  ]),[owner])

  const open = () => {
    setOpenMenu(true)
  }

  const close = () => {
    setOpenMenu(false)
  }

  const menuHandler = () => {
    if (openMenu) {
      const burger = document.querySelector(".burger")
      const top = burger?.getBoundingClientRect().top
      if (top === 0) {
        close()
      }
    }
  }

  useEffect(() => {
    document.addEventListener("click", menuHandler)
    return () => document.removeEventListener("click", menuHandler, false)
  }, [menuHandler])


  return (
    <header style={{backgroundColor:"rgb(38, 43, 41)"}} className="w-full h-20 text-white flex items-center border-b-2 border-gray-600">
      <nav
        className={`bg-stone-600 z-10 h-min w-full flex md:hidden absolute flex-col transition-all duration-500 burger ${
          openMenu ? "top-0" : "-top-72"
        }`}
      >
        {isAuth &&
          links.map((link, i) => (
            <Link
              to={link.to}
              key={i}
              onClick={()=> !link.to && logOut?.()}
              className="burger__item w-full p-5 border-solid border-b-2 last:border-none"
            >
              {link.title}
            </Link>
          ))}
        {!isAuth && (
          <Link
            to="/login"
            className="burger__item w-full p-5 border-solid border-b-2 last:border-none" >
            Войти
          </Link>
        )}
      </nav>
      <div className="flex items-center md:hidden justify-between w-full mx-5">
        <GoThreeBars onClick={open} style={{ fontSize: "40px" }} />
        <div>Биология</div>
      </div>
      <div className="hidden md:flex mx-3 w-full justify-between">
        <div>
          <Link to="/home">Главная</Link>
        </div>
        <div>
          {isAuth && links.map((link) => (
            <Link
              key={link.to}
              style={{color:"rgb(176, 169, 159)"}}
              className="m-2 border-white hover:bg-gray-500 rounded-lg border-b-2 p-3 "
              onClick={()=> !link.to && logOut?.()}
              to={link.to}
            >
              {link.title}
            </Link>
          ))}
          {
            !isAuth && 
            <Link
              className="m-2 border-white hover:bg-gray-500 rounded-lg border-2 p-3 "
              to="/login"
            >
              Войти
            </Link>
          }
        </div>
      </div>
    </header>
  )
}

export default Header
