import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser";
import { app,server } from "./socket/socket.js"; 

import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'
import connectToMongodb from "./db/connectToMongodb.js";
dotenv.config();

// midddlewares
app.use(express.json())  // to  parse the inccoming json data from client
app.use(cookieParser()); // to set ccookis on th serveer anddd seend it 
app.use(cors({
    origin:"https://web-chat-0xdb.onrender.com",
    credentials:true
}))    // diffrent omains can mak rquest to seerver



// user routes
app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)
app.use('/api/users',userRoutes)


server.listen(process.env.PORT || 5000,()=>{
    connectToMongodb()
    console.log("Backend Server? I'm Listening!")
})