import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BreadCrumbs from './BreadCrumbs'
import Create from './Create'
import { useAuth } from '../hooks/useAuth'
import Sections from './Sections'

interface TopicState {
    title:string,
    content:string
    description: string
}

interface CurrentSectionState{
    parent_id:number | null
    title:string
}

interface TreeState{
    id:number
    parent_id:number | null
    title:string
    level:number
}

const Topic:React.FC = () =>{
    const {admin} = useAuth()
    const params = useParams()
    const location = useNavigate()
    const [topic,setTopic] = useState<TopicState>({title:"",description:"",content:""})
    const [tree,setTree] = useState<TreeState[] | []>([])
    const [currentSection,setCurrentSection] = useState<CurrentSectionState>({parent_id:null,title:""})
    const [hasTopic,setHasTopic] = useState(false)

    const getTopic = useCallback(() =>{
        fetch("/api/topic/" + params.id)
        .then(async (res:Response) =>{
            if(res.ok){
                const data = await res.json()
                if(data.topic.length > 0) {
                    setHasTopic(true)
                    const topic = data.topic[0]
                    setTopic({title: topic.title, content:topic.content, description: topic.description?.length ? topic.description : "" })
                }
                else {
                    setHasTopic(false)
                    setTopic({title:"",description:"",content:""})
                }
                if(data.currentSection.length > 0){
                    const parentData = data.currentSection[0]
                    setCurrentSection({parent_id:parentData.parent_id,title:parentData.title})
                }
                else{
                    location("/home")
                }
                if(data.tree.length > 0){
                    setTree(data.tree)
                }
            }
        })
    },[params.id])

    useEffect(()=>{
        getTopic()
    },[params.id])

    const editTopic = () =>{
        location(`/edit/${params.id}`)
    }
    const deleteTopic = () =>{
        const resume = confirm("Удалить эту тему?")
        if(!resume) return
        fetch("/api/delete",{method:"POST",headers: { "Content-Type": "application/json" },body:JSON.stringify({section_id:params.id})})
        .then(async (res:Response)=>{
            const {message} = await res.json()
            if(res.ok){
                getTopic()
            }
        })
    }
    return (
    <>
    <Sections id={params.id} title={currentSection.title}/>
    <div className='w-full px-4 pb-2'>
        <BreadCrumbs tree={tree} current={currentSection} />
    </div>
    {hasTopic ? <div className='w-full mt-2 lg:flex lg:justify-center '>
        <div  className='mx-3 p-2 text-slate-400  rounded-sm break-all lg:w-3/4 border-2 border-slate-700'>
            <div><h1 className='text-2xl break-all border-b-2 border-gray-600" p-2'><b>Тема - {topic.title}</b></h1></div>
            <div><h2 className='text-xl mt-2 break-all p-2 ml-2'></h2><b>{!topic.description.length ? "Описание отсутствует":`Описание: ${topic.description}`}</b></div>
            <div className='mt-5 border-t-2 border-gray-600"' dangerouslySetInnerHTML={{__html:topic.content}}></div>
            <div style={{display:!admin ? "none":"flex"}} className='flex justify-end mt-7'>
                <button onClick={deleteTopic} className='p-2 m-1 border-2 rounded-md border-black bg-red-800 text-neutral-200 hover:bg-red-600 transition-colors'>Удалить тему</button>
                <button onClick={editTopic} className='p-2 m-1 border-2 rounded-md border-black bg-neutral-600 hover:bg-neutral-800 transition-colors'>Редактировать тему</button>
            </div>
        </div>
    </div>:<Create id={params.id} getTopic={getTopic}/>}
    </>
    )
}

export default Topic