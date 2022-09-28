import {Router} from 'express'
const router = Router()

router.post("/logout",(req,res)=>{
    if(req.session.auth){
      req.session.destroy((err)=>{
        if(err) return res.status(400).send(false)
      })
    }
    res.send(true)
})

export default router
