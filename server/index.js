import express from 'express'
import dotEnv from 'dotenv'
import cors from 'cors'
import session from 'express-session'
import getTopic from './api/getTopic.js'
import login from './api/auth/login.js'
import create from './api/createTopic.js'
import find from './api/findSection.js'
import auth from './api/auth.js'
import logout from './api/logout.js'
import update from './api/updateTopic.js'
import deleteTopic from './api/deleteTopic.js'
import addNewUser from './api/user/addNewUser.js'
import changePassword from './api/user/changePassword.js'
import deleteUser from './api/user/deleteUser.js'
import getUsers from './api/user/getUsers.js'
import upload from './api/upload.js'
import sections from './api/sections.js'
import createSection from './api/createSection.js'
import deleteSection from './api/deleteSection.js'
import updateSection from './api/updateSection.js'
dotEnv.config()
const app = express()
app.use(cors({origin:process.env.ORIGIN,credentials:true}))
app.use(express.json())
app.use("/images",express.static("./images"));
app.use(session({
    secret:"qq0-1sk0(5",
    resave:true,
    saveUninitialized:false,
    cookie:{
        maxAge:60*60*24000,  
        path:"/"
    },
    
}))

app.use("/api",getTopic)
app.use("/api",sections)
app.use("/api",createSection)
app.use("/api",deleteSection)
app.use("/api",updateSection)
app.use("/api",create)
app.use("/api",find)
app.use("/api",update)
app.use("/api",upload)
app.use("/api",deleteTopic)
app.use("/api",login)
app.use("/api",auth)
app.use("/api",logout)
app.use("/api",addNewUser)
app.use("/api",changePassword)
app.use("/api",deleteUser)
app.use("/api",getUsers)


app.listen(3000)