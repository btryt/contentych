import {Router} from 'express'
import { query } from '../db/query.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'
const router = Router()


router.post("/delete",[authMiddleware,adminMiddleware],async (req,res)=>{
    const {topic_id} = req.body
    try {
        await query("DELETE FROM topic WHERE topic_id = $1",[topic_id])

        res.send({message:"Тема успешно удалена"})
    } catch (error) {
        res.status(400).send({message:"Произошла ошибка при удалении темы"})
    }
})

export default router