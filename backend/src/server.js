import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
            origin: "http://localhost:3001",
            methods: ["GET", "POST"]
  }
});




io.on("connection", (socket) => {
    // 
  });

console.log("Server is listening to port ....");
httpServer.listen(3001);

