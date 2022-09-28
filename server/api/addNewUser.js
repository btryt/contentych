import {Router} from 'express'
import { query } from '../db/query.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'
const router = Router()


router.post("/add/user",[authMiddleware,adminMiddleware],async (req,res)=>{
    const {login,password,admin} = req.body 
    try {
        await query("INSERT INTO users (login,password,admin) VALUES ($1,$2,$3)",[login,password,admin])

        res.send({message:`Пользователь создан - ${admin  ? "(Админ)":""}`})
    } catch (error) {
        res.status(400).send({message:"Неудалось создать пользователя"})
    }
})

export default router