import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app); 
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("User is connected");

  socket.on("message", (message) => {
    console.log("Received message:", message);
    io.emit("message", message); 
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

httpServer.listen(3001, () => {
  console.log("Server is listening to port 3001");
});