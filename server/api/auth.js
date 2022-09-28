import {Router} from 'express'
import { query } from '../db/query.js'
const router = Router()

router.get("/auth",async (req,res)=>{
    if(req.session.auth){
      return res.send({auth:true})
    }
    res.send({auth:false})
})

export default router