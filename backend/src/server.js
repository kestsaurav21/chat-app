import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app); // Pass the express app to the createServer function
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Assuming your React app is running on this port
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("User is connected");

  socket.on("message", (message) => {
    console.log("Received message:", message);
    io.emit("message", message); // Broadcast the message to all connected clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

httpServer.listen(3001, () => {
  console.log("Server is listening to port 3001");
});