import {Router} from 'express'
import { query } from '../../db/query.js'
import authMiddleware from '../../middleware/authMiddleware.js'
import ownerMiddleware from '../../middleware/ownerMiddleware.js'
const router = Router()


router.post("/user/update/pass",[authMiddleware,ownerMiddleware],async (req,res)=>{
    const body = req.body

    try {
        await query("UPDATE users SET password = $1 WHERE user_id = $2",[body.password,body.id])

        res.send({message:"Пароль упешно изменён"})
    } catch (error) {
        res.status(500).send({message:"Ошибка при изменении пароля"})
    }
})

export default router