import {Router} from 'express'
import { query } from '../db/query.js'
import authMiddleware from '../middleware/authMiddleware.js'
const router = Router()


router.post("/section/create",authMiddleware,async (req,res)=>{
    const body = req.body
    try {
        if(body.parent_id !== null){
            await query("INSERT INTO section (title,parent_id) VALUES ($1,$2)",[body.title,body.parent_id])
        }
        else {
            await query("INSERT INTO section (title) VALUES ($1)",[body.title])
        }
        res.send({message:"Успешно создан раздел"})
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"Проблема при создании раздела"})
    }
})

export default router