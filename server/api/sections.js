import {Router} from 'express'
import { query } from '../db/query.js'
import authMiddleware from '../middleware/authMiddleware.js'
const router = Router()


router.get("/sections",authMiddleware,async (req,res)=>{
    const queryParams = req.query
    try {
        let sections
        if(queryParams?.id){
            sections = await query("SELECT id, title FROM section WHERE parent_id = $1",[parseInt(queryParams.id)])
        }
         else sections = await query("SELECT id, title FROM section WHERE parent_id IS NULL")

        res.send({sections:sections.rows})
    } catch (error) {
        res.status(500).send({message:"Проблемы с доступом к данным"})
    }
})

export default router