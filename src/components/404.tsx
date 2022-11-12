import React from 'react'

const NotFound:React.FC = () =>{
    
    return (
    <div style={{minHeight:"80vh"}} className='w-full flex justify-center items-center'>
        <div className='p-2 mx-2 text-slate-400' >
            
            <h1 className='text-8xl'>404</h1>
            <span>Страница не найдена</span>
        </div>
    </div>
    )
}

export default NotFound