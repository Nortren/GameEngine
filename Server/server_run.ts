import AI from "./AI/AI";
import mapData from "./MapCreator/StaticMapData"
import Authorization from "./ClientAuthorization/Authorization"

const express = require('express');
const io = require('socket.io')();
const http = require('http');
const port = process.env.Port || 3000;
const app = express();
const server = http.createServer(app);

const authorization = new Authorization();

io.on('connection', (client) => {

    var ID = (client.id).toString().substr(0, 5);
    console.log(ID);
    client.on('getMapStatic', () => {
        io.emit('returnMapStaticData', mapData);
    });

    client.on('getPlayersData', () => {
        io.emit('returnMapStaticData', mapData);
    });

    client.on('checkUserAuthorization', (userData) => {
        let result = authorization.checkAuthorizationData(userData);
        io.emit('resultUserAuthorization', result);
    });
});


const portIO = 8010;
io.listen(portIO);

server.listen(port, () => console.log(`server started on port ${port}`));
