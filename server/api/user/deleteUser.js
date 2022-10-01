import {Router} from 'express'
import { query } from '../../db/query.js'
import authMiddleware from '../../middleware/authMiddleware.js'
import ownerMiddleware from '../../middleware/ownerMiddleware.js'
const router = Router()

router.post("/user/delete",[authMiddleware,ownerMiddleware],async (req,res)=>{
    const body = req.body

    try {
        await query("DELETE FROM users WHERE user_id = $1",[body.id])

        res.send({message:"Пользователь успешно удален"})
    } catch (error) {
        res.status(500).send({message:"Не удалось удалить пользователя"})
    }
})

export default router