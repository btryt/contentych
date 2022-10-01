import {Router} from 'express'
import { query } from '../../db/query.js'
import authMiddleware from '../../middleware/authMiddleware.js'
import ownerMiddleware from '../../middleware/ownerMiddleware.js'
const router = Router()


router.post("/add/user",[authMiddleware,ownerMiddleware],async (req,res)=>{
    const {login,password,admin,owner} = req.body 
    try {
        await query("INSERT INTO users (login,password,admin,owner) VALUES ($1,$2,$3,$4)",[login,password,admin,owner])

        res.send({message:`Пользователь создан - ${admin  ? "(Админ)":""}`})
    } catch (error) {
        res.status(400).send({message:"Неудалось создать пользователя"})
    }
})

export default router