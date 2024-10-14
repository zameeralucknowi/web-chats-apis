import { Server } from "socket.io";
import http from 'http'
import express from "express";
const app = express();

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin : ['http://localhost:5173'],   // front end
        methods :["GET","POST"],
    }
});


const socketMap = {};

export const getReceiverSocketId = (receiverId) =>{
    return socketMap[receiverId];
}

io.on('connection', (socket) =>{
    console.log("a User connected ",socket.id)

    const userId = socket.handshake.query.userId;

    if(userId != "undefined"){
        socketMap[userId] = socket.id;
    }

    socket.on('sendMessage', (message) => {
        console.log('Message received:', message);
        // Broadcast message to a  client 
        const receiverSocketId = getReceiverSocketId(message.receiverId);
        io.to(receiverSocketId).emit('newMessage', message);
    })

    // io.emit('getOnlineUsers',Object.keys(socketMap));

    socket.on("disconnect", ()=>{
        console.log("User disconnected", socket.id)
        delete socketMap[userId];
        // io.emit('getOnlineUsers',Object.keys(socketMap));

    })
})

export  {app,server,io}

