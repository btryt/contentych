import {Router} from 'express'
import { query } from '../db/query.js'
import authMiddleware from '../middleware/authMiddleware.js'
const router = Router()

router.post("/create",authMiddleware,async (req,res)=>{
    const {title,description,content,id} = req.body
    const userId = req.session.user_id
    if(!title.length || !content.length){
        return res.status(400).send({message:"Должено быть назавние темы и её содержание"})
    }
    try {
        const now = new Date()
        const topic = await query("INSERT INTO topic (title,description,content,created_at,user_id,section_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING topic_id",[title,description,content,now,userId,id])
        if(topic.rows.length){
           return res.send({topic_id:topic.rows[0].topic_id})
        }
        res.status(400).send({message:"Что-то пошло не так"})
    } catch (error) {
        res.status(500).send({message:"Не получилось создать тему"})
    }
})

export default router