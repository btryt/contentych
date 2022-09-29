import {Router} from 'express'
import { query } from '../db/query.js'
import authMiddleware from '../middleware/authMiddleware.js'
const router = Router()



router.post("/section/update",authMiddleware,async (req,res)=>{
    const body = req.body

    try {
        await query("UPDATE section SET title = $1 WHERE id = $2",[body.title,body.id])
        res.send({message:"Успешное изменение название раздела"})
    } catch (error) {
        res.status(500).send({message:"Ошибка при изменении названия раздела"})
    }
})

export default router