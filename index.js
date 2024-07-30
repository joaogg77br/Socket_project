const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path")
const { Server } = require("socket.io")

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "frontEnd/index.html"))
})


io.on("connection", (socket) => {
    console.log('A user connected');
    socket.on('chat message', (msg) => io.emit('chat message', msg));
    socket.on("disconnect", () => {
        console.log("user disconnect");
    })
})

server.listen(3000, () => (console.log("Server conected")));