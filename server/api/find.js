import {Router} from 'express'
import { query } from '../db/query.js'
import authMiddleware from '../middleware/authMiddleware.js'
const router = Router()


router.get("/find",authMiddleware,async (req,res)=>{
    const queryParam = req.query

    try {
        const topic = await query("SELECT topic_id, title,description FROM topic WHERE title ~* $1",[queryParam.title])
        if(topic.rows.length){
           return res.send(topic.rows)
        }
        res.send([])
    } catch (error) {
        res.status(500).send({message:"Упс... Что-то поломалось"})
    }
})

export default router