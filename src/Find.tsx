import React,{useState,useRef} from 'react'
import { GoSearch } from 'react-icons/go'
import { Link } from 'react-router-dom'

interface TopicType {
    id: number | string
    title:string
}

const Find:React.FC = () =>{
    const [topic,setTopic] = useState([])
    const inputRef = useRef<any>(null)
    const findTopic = () =>{
        const text = inputRef.current.value?.trim()
        if(!text) return

        fetch(`/api/find/?title=${text}`)
        .then(async (res:Response)=>{
            if(res.ok){
                const {topic} = await res.json()
                setTopic(topic)
            }
        })

    }

    return (
    <div style={{color:"rgb(176, 169, 159)"}} className="w-full mt-2 lg:flex lg:justify-center">
        <div className='p-2 mx-2 lg:w-2/4'>
            <div>
                 <h1 className='text-center mb-2 text-xl'>Поиск раздела</h1>
            </div>
            <div className='flex'>
                <input ref={inputRef} className='bg-slate-700 w-full p-2 rounded-md' />
                <div onClick={findTopic} className='w-14 cursor-pointer text-green-400  flex justify-center items-center text-2xl border-b-2 ml-1'><GoSearch/></div>
            </div> 
            <div>
                {topic.map((t:TopicType)=>(
                    <Link key={t.id} to={`/topic/${t.id}`} style={{ backgroundColor: "rgb(58, 63, 66)" }} className='p-2 mt-2 flex flex-col rounded-sm'>{t.title}</Link>
                ))}
            </div>
        </div>
    </div>
    )
}

export default Find