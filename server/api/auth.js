import {Router} from 'express'
import { query } from '../db/query.js'
const router = Router()

router.get("/auth",async (req,res)=>{
    if(req.session.auth){
      const admin =req.session.admin
      const owner =req.session.owner
      const user_id = req.session.user_id
      return res.send({auth:true,admin,owner,user_id})
    }
    res.send({auth:false,admin:false,owner:false,user_id:null})
})

export default router