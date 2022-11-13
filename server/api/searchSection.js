import {Router} from 'express'
import { query } from '../db/query.js'
import authMiddleware from '../middleware/authMiddleware.js'
const router = Router()


router.get("/search",authMiddleware,async (req,res)=>{
    const queryParam = req.query

    try {
        const topic = await query("SELECT id, title FROM section WHERE title ~* $1",[queryParam.title])
        
        res.send({topic:topic.rows})

    } catch (error) {
        res.status(500).send({message:"Упс... Что-то поломалось"})
    }
})

export default router