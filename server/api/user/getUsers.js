import {Router} from 'express'
import { query } from '../../db/query.js'
import authMiddleware from '../../middleware/authMiddleware.js'
import ownerMiddleware from '../../middleware/ownerMiddleware.js'
const router = Router()


router.get("/users",[authMiddleware,ownerMiddleware],async (req,res)=>{
    
    try {
        const users = await query("SELECT user_id,login, admin, owner FROM users")

        res.send({users:users.rows})
    } catch (error) {
        res.status(500).send({message:"Не удалось получить доступ к пользователям"})
    }
})

export default router
