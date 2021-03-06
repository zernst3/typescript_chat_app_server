import express from "express";
import http from "http";
import { PORT } from "./config/constants";
const cors = require("cors");
import * as dotenv from "dotenv";
dotenv.config();

const socketio = require("socket.io");
const router = require("./routes/router");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["content-type"],
  },
});

// handle sockets
require("./socket")(io);

app.use(router);

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
