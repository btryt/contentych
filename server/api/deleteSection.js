import {Router} from 'express'
import { query } from '../db/query.js'
import adminMiddleware from '../middleware/adminMiddleware.js'
import authMiddleware from '../middleware/authMiddleware.js'
const router = Router()


router.post("/section/delete",[authMiddleware,adminMiddleware],async (req,res)=>{
    const body = req.body
    try {
        await query("DELETE FROM section WHERE id = $1",[body.id])
        res.send({message:"Успешно удален раздел"})
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"Проблема при создании раздела"})
    }
})

export default router