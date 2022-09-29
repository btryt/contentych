import React, { useRef,useState,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import Alert from './Alert'
import TextEditor from './TextEditor'

interface CreateProps{
    getTopic: () => void
    id:number | string | undefined
}

const Create:React.FC<CreateProps> = ({getTopic,id}) =>{
    const location = useNavigate()
    const [errorMessage,setErrorMessage] = useState("")
    const titleRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLInputElement>(null)
    const contentRef = useRef<HTMLInputElement>(null)

    const create = () =>{
        if(!titleRef.current?.value.trim().length){
            return setErrorMessage("Отсутствует название темы")
        }
        if(!contentRef.current?.value.trim().length){
            return setErrorMessage("Нет содержания темы")
        }
        const title = titleRef.current.value.trim()
        const description = descriptionRef.current ? descriptionRef.current.value.trim() : ""
        const content = contentRef.current.value.trim()
        fetch("/api/create",{method:"POST",headers: { "Content-Type": "application/json" },body:JSON.stringify({title,description,content,id})})
        .then(async (res:Response)=>{
            if(res.ok){
                getTopic()
            }
            else {
                const {message} = await res.json()
                setErrorMessage(message)
            }
        })
        
    }
    useEffect(()=>{
        if(errorMessage){
            setTimeout(()=>{
                setErrorMessage("")
            },10000)
        }
    },[errorMessage])

    return (
    <div style={{color:"rgb(176, 169, 159)"}} className=' mt-3 rounded-md h-full  flex lg:justify-center'>
        <div style={{backgroundColor:"rgb(38, 43, 41)"}}  className='flex flex-col h-full shadow-lg lg:w-2/3'>
        <div style={{borderColor:"rgb(140, 130, 115)"}} className=' border-b-2'>
            <h1 className='text-2xl p-2 text-center'>
                Создание темы
            </h1>
        </div>
            <div className='m-2 p-2 flex flex-col'>
                <label htmlFor='title'>Название темы *</label>
                <input style={{backgroundColor:"rgb(47, 51, 53)"}} ref={titleRef} className='p-1 rounded-sm ' id='title' type="text" />
            </div>
            <div className='m-2 p-2 flex flex-col'>
                <label htmlFor='description'>Описание темы (необязательно)</label>
                <input style={{backgroundColor:"rgb(47, 51, 53)"}} ref={descriptionRef} className='p-1 rounded-sm' id='description' type="text" />
            </div>
            <div className='m-2 p-2 flex flex-col'>
             <TextEditor ref={contentRef} />
            </div>
            <div className='p-2 w-full flex justify-end' >
                <button onClick={create} className='border-2 border-black transition-colors p-3 rounded-md hover:bg-green-700  mx-2'>Создать</button>
            </div>
            {errorMessage && <Alert>{errorMessage}</Alert>}
        </div>
    </div>
    )
}

export default React.memo(Create)