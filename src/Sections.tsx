import React, { useCallback, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { GoPencil, GoTrashcan } from "react-icons/go"
import { useAuth } from "./hooks/useAuth"
type SectionsProp = {
  id?: number | string | undefined
  title?: string
}

type SectionState = { id: number; title: string }

const Sections: React.FC<SectionsProp> = ({ id, title }) => {
  const { admin } = useAuth()
  const [sections, setSections] = useState<any>([])
  const inputRef = useRef<any>(null)
  const getSections = useCallback(() => {
    fetch(`/api/sections${id === undefined ? "" : `?id=${id}`} `).then(
      async (res: Response) => {
        if (res.ok) {
          const data = await res.json()
          setSections(data.sections)
        }
      }
    )
  }, [id])

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
      }).then((res: Response) => {
        if (res.ok) {
          inputRef.current.value = ""
          getSections()
        }
      })
    }
  }

  const deleteSection = (id: string | number) => {
    let resume = confirm(
      "При удалении раздела удалятся все вложенные разделы и темы. Продолжить?"
    )
    if (!resume) return
    fetch("/api/section/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).then((res: Response) => {
      if (res.ok) {
        getSections()
      }
    })
  }
  const updateSection = (id: string | number, title: string) => {
    const newTitle = prompt(
      "Новое название для раздела " + title,
      title
    )?.trim()
    if (!newTitle || newTitle == title) return
    fetch("/api/section/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title: newTitle }),
    }).then((res: Response) => {
      if (res.ok) {
        getSections()
      }
    })
  }
  return (
    <div
      style={{ color: "white" }}
      className="w-full lg:flex lg:justify-center"
    >
      <div className="lg:w-2/4 p-2 m-2 ">
        <h1 className="text-center mb-2 text-lg">
          Список разделов темы <b className="border-b-2">{title}</b>
        </h1>
        <div className="flex justify-center">
          <input
            ref={inputRef}
            type="text"
            style={{ backgroundColor: "rgb(62, 67, 69)" }}
            placeholder="Создать раздел"
            className="p-2 rounded-sm w-full md:w-1/2"
          />
          <button
            onClick={createSection}
            className="bg-green-500 p-3 ml-1 w-20 text-white rounded-sm"
          >
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
                {admin ? (
                  <>
                    <div
                      onClick={() => updateSection(section.id, section.title)}
                      className="text-2xl hover:animate-pulse mr-2 p-1 w-10 text-center cursor-pointer "
                    >
                      <GoPencil />
                    </div>
                    <div
                      onClick={() => deleteSection(section.id)}
                      className="text-2xl hover:animate-pulse mr-2 p-1 w-10 text-center cursor-pointer text-red-500"
                    >
                      <GoTrashcan />
                    </div>
                  </>
                ) : (
                  ""
                )}
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

export default React.memo(Sections)
