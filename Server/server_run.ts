
import Authorization from "./AccountService/ClientAuthorization/Authorization"

const express = require('express');
const io = require('socket.io')();
const http = require('http');
const port = process.env.Port || 3000;
const app = express();
const server = http.createServer(app);

const authorization = new Authorization();

io.on('connection', (client) => {

    client.on('checkUserAuthorization', (userData) => {
        let result = authorization.checkAuthorizationData(userData);
        io.emit('resultUserAuthorization', result);
    });
});


const portIO = 8010;
io.listen(portIO);

server.listen(port, () => console.log(`server started on port ${port}`));
