import {testMapJSON} from "./moleculer/services/GameMechanicsService/MapCreator/StaticMapData"
import Authorization from "./moleculer/services/AccountService/ClientAuthorization/Authorization"

const express = require('express');
const io = require('socket.io')();
const http = require('http');
const port = process.env.Port || 3000;
const app = express();
const server = http.createServer(app);

const authorization = new Authorization();

this.playerArray = [];
this.connectionPlayerName;
io.on('connection', (client) => {


    client.on('getMapStatic', () => {
        io.emit('returnMapStaticData', {
            testMapJSON,
            playerName: this.connectionPlayerName,
            allPlayerArray: this.playerArray
        });
    });

    client.on('checkUserAuthorization', (userData) => {
        let result = authorization.checkAuthorizationData(userData);
        this.connectionPlayerName = result.name;

        io.emit('resultUserAuthorization', result);
    });

    client.on('setDataControls', (userData) => {

        let test = this.playerArray.filter(function (data) {
            return data.userId === userData.userId;
        });
        if (test.length === 0) {
            this.playerArray.push(userData);

        }

        if(test[0]) {
            test[0].position = userData.position;

        }
        console.log(this.playerArray);
        io.emit('getUserPosition', {thisUser:test[0],arrayUser:this.playerArray});
    });
});


const portIO = 8010;
io.listen(portIO);

server.listen(port, () => console.log(`server started on port ${port}`));