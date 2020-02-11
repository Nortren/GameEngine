import AI from "./AI/AI";

const express = require('express');
const io = require('socket.io')();
const http = require('http');
const port = process.env.Port || 3000;
const app = express();
const server = http.createServer(app);

io.on('connection', (client) => {
    client.on('getAIStatus', (interval, data) => {
        console.log('getAIStatus', data);
        // const generator = new StatusGenerator();
        setInterval(() => {
            io.emit('setAIStatus', {test:123});
        }, interval);
    });
});


const portIO = 8010;
io.listen(portIO);

server.listen(port, () => console.log(`server started on port ${port}`));
