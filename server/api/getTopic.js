import {Router} from 'express'
import { query } from '../db/query.js'
import authMiddleware from '../middleware/authMiddleware.js'
const router = Router()

const queryPattern = `
WITH RECURSIVE r AS (
    SELECT id, parent_id, title,1 AS level
    FROM section
    WHERE parent_id = $1 AND id = $2
  
    UNION
  
    SELECT section.id, section.parent_id, section.title, r.level + 1 AS level
    FROM section
       JOIN r
           ON section.id = r.parent_id
  )
  
  SELECT * FROM r`

router.get("/topic/:id",authMiddleware,async (req,res)=>{
    const {id} = req.params
    try {
        const topic = await query("SELECT title, description, created_at, content FROM topic WHERE section_id = $1",[id])
        const currentSection = await query("SELECT parent_id, title FROM section WHERE id = $1",[id])
        const tree = await query(queryPattern,[currentSection.rows.length ? currentSection.rows[0].parent_id: 0,id])
         res.send({topic:topic.rows,currentSection:currentSection.rows,tree:tree.rows})

    } catch (error) {
        console.log(error)
        res.status(500).send({message:"Проблемы с доступом к теме"})
    }
    
})

export default router