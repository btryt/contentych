import {Router} from 'express'
import { query } from '../../db/query.js'
const router = Router()


router.post("/login",async (req,res)=>{
    if(req.session.auth){
        return res.status(400).send({message:"Уже авторизован"})
    }
    const {login,password} = req.body
    if(login.trim().length > 10){
        return res.status(400).send({message:"Длина логина не более 10 символов"})
    }
    try {
        const user = await query("SELECT login,password,owner,user_id,admin FROM users WHERE login = $1",[login])
        if(user.rows[0].login === login && user.rows[0].password === password){
            req.session.auth = true
            req.session.user_id = user.rows[0].user_id
            req.session.admin = user.rows[0].admin
            req.session.owner = user.rows[0].owner
            return res.send({message:"Успешно авторизован"})
        }
        return res.status(404).send({message:"Пользователь не найден"})
    } catch (error) {
        res.status(400).send({message:"Что-то пошло не так..."})
    }
})

export default router