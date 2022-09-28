import React, { useEffect, useRef, useState } from "react"
import { Link, Outlet } from "react-router-dom"
import Create from "./Create"

type SectionsProp = { id?: number | string | undefined }

type SectionState = { id: number; title: string }

const Sections: React.FC<SectionsProp> = ({ id }) => {
  const [sections, setSections] = useState<any>([])
  const inputRef = useRef<any>(null)
  const getSections = () => {
    fetch(`/api/sections${id === undefined ? "" : `?id=${id}`} `).then(
      async (res: Response) => {
        if (res.ok) {
          const data = await res.json()
          setSections(data.sections)
        }
      }
    )
  }

  useEffect(() => {
    getSections()
  }, [id])

  const createSection = () => {
    if (inputRef.current.value.trim()) {
      const value = inputRef.current.value.trim()
      fetch("/api/section/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: value,
          parent_id: id !== undefined ? id : null,
        }),
      })
      .then((res:Response) =>{
        if(res.ok){
            getSections()
        }
      })
    }
  }

  const deleteSection = (id:string | number) =>{
    console.log(id)
      let resume = confirm("При удалении раздела удалятся все вложенные разделы и темы. Продолжить?")
      if(resume){
        fetch("/api/section/delete",{method:"POST",headers: { "Content-Type": "application/json" },body:JSON.stringify({id})})
        .then((res:Response)=>{
          if(res.ok){
            getSections()
          }
        })
      }
  }
  return (
    <div
      style={{ backgroundColor: "rgb(38, 43, 41)", color: "white" }}
      className="w-full lg:flex lg:justify-center"
    >
      <div className="lg:w-2/4 p-2 m-2 ">
        <div className="flex justify-center">
          <input
            ref={inputRef}
            type="text"
            style={{ backgroundColor: "rgb(62, 67, 69)" }}
            placeholder="Создать раздел"
            className="p-2 rounded-sm w-full md:w-1/2"
          />
          <button onClick={createSection} className="bg-green-500 p-3 ml-1 w-20 text-white rounded-sm">
            Создать
          </button>
        </div>
        <div className="max-h-72 mt-5 overflow-y-auto break-all section">
          {sections.length ? (
            sections.map((section: SectionState) => (
              <div
                style={{ backgroundColor: "rgb(58, 63, 66)" }}
                className="flex mt-3 items-center section__item"
                key={section.id}
              >
                <Link to={`/topic/${section.id}`} className="flex-1 p-3 ">
                  {section.title}
                </Link>
                <div onClick={()=>deleteSection(section.id)} className="text-2xl mr-2 p-1 w-10 text-center cursor-pointer text-red-500">
                  X
                </div>
              </div>
            ))
          ) : (
            <span>Список разделов пуст</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sections
