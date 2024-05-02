import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`user entered ${data} with ${socket.id}`);
  });

  socket.on("send_random_number",()=>{
      let randomNumber =  Math.random();
      let scaledNumber = 1+ randomNumber*(10-1);
      let roundedNumber = parseFloat(scaledNumber.toFixed(2));
      console.log(roundedNumber)
      socket.emit("recieve_random_number",roundedNumber);

  })
});

server.listen(3001, () => {
  console.log("server listing in port 3001");
});
