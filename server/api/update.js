import {Router} from 'express'
import { query } from '../db/query.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'
const router = Router()


router.post("/update",[authMiddleware,adminMiddleware],async (req,res)=>{
    const {topic_id,title,description,content} = req.body
    if(!title.trim().length || !content.trim().length){
        return res.status(400).send({message:"Должено быть назавние темы и её содержание"})
    }
    try {
        await query("UPDATE topic SET content = $1, title = $2, description = $3 WHERE section_id = $4",[content,title,description,topic_id])
        
        res.send({message:"Тема была успешно обновлена"})
    } catch (error) {
        res.status(400).send({message:"Произошла ошибка при обновлении темы"})
    }
})

export default router