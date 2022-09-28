import React, { useRef,useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Alert from './Alert'
import TextEditor from './TextEditor'

const Edit:React.FC = () =>{
    const params = useParams()
    const location = useNavigate()
    const [errorMessage,setErrorMessage] = useState("")
    const contentRef = useRef<HTMLInputElement>(null)
    const titleRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLInputElement>(null)
    const [content,setContent] = useState("")
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")

    useEffect(()=>{
        fetch("/api/topic/" + params.id)
        .then(async (res:Response) =>{
            if(res.ok){
                const data = await res.json()
                const topic = data.topic[0]
                setContent(topic.content)
                setTitle(topic.title)
                if(topic.description?.length){
                    setDescription(topic.description)
                }
            }
        })
    },[params.id])

    const update = () =>{
        const isConfirm = confirm("Тема будет обновлена?")
        if(!isConfirm) return
        if(!titleRef.current?.value.trim().length){
            return setErrorMessage("Отсутствует название темы")
        }
        if(!contentRef.current?.value.trim().length){
            return setErrorMessage("Нет содержания темы")
        }
        const title = titleRef.current.value.trim()
        const description = descriptionRef.current ? descriptionRef.current.value.trim() : ""
        const content = contentRef.current.value.trim()
        fetch("/api/update",{method:"POST",headers: { "Content-Type": "application/json" },body:JSON.stringify({title,description,content,topic_id:params.id})})
        .then(async (res:Response)=>{
            if(res.ok){
                const topic_id = params.id
                location(`/topic/${topic_id}`,{replace:true})
            }
            else {
                const {message} = await res.json()
                setErrorMessage(message)
            }
        })
        
    }


    const backToTopic = () =>{
        location(`/topic/${params.id}`,{replace:true})
    }

    useEffect(()=>{
        if(errorMessage){
            setTimeout(()=>{
                setErrorMessage("")
            },10000)
        }
    },[errorMessage])

    return (
        <div className='p-3 mx-3 mt-3 rounded-md h-full lg:flex lg:justify-center '>
        <div className='flex flex-col h-full bg-gray-400 shadow-lg lg:w-2/3'>
        <div className=' border-b-2 border-black'>
            <h1 className='text-2xl p-2 text-center break-all'>
                Изменение темы - <b>{title}</b>
            </h1>
        </div>
            <div className='m-2 p-2 flex flex-col'>
                <label htmlFor='title'>Название темы *</label>
                <input defaultValue={title} ref={titleRef}  className='p-1 rounded-sm bg-gray-300' id='title' type="text" />
            </div>
            <div className='m-2 p-2 flex flex-col'>
                <label htmlFor='description'>Описание темы (необязательно)</label>
                <input defaultValue={description} ref={descriptionRef} className='p-1 rounded-sm bg-gray-300' id='description' type="text" />
            </div>
            <div className='m-2 p-2 flex flex-col'>
             <TextEditor content={content} setContent={setContent} ref={contentRef} />
            </div>
            <div className='p-2 w-full flex justify-end' >
                <button onClick={backToTopic} className='border-2 border-black transition-colors p-3 rounded-md hover:bg-green-400  mx-2'>Вернуться к теме</button>
                <button onClick={update} className='border-2 border-black transition-colors p-3 rounded-md hover:bg-green-400  mx-2'>Сохранить изменения</button>
             </div>
             {errorMessage && <Alert>{errorMessage}</Alert>}
        </div>
    </div>
    )
}

export default Edit