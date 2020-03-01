"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Service = require("moleculer").Service;
const io = require('socket.io')();
const StaticMapData_1 = require("./GameMechanicsService/MapCreator/StaticMapData");
class ServicesController extends Service {
    constructor(broker) {
        super(broker);
        this.parseServiceSchema({
            name: "ServicesController",
            meta: {
                scalable: true
            },
            settings: {
                upperCase: true
            },
            actions: {
                createClientConnection: this.createClientConnection
            },
            events: {},
            created: this.serviceCreated,
            started: this.serviceStarted,
            stopped: this.serviceStopped,
        });
    }
    serviceCreated() {
        console.log('Created ServicesController');
    }
    serviceStarted() {
        this.createClientConnection();
        console.log('Started ServicesController');
    }
    serviceStopped() {
        console.log('Stopped ServicesController');
    }
    createClientConnection() {
        this.playerArray = [];
        this.connectionPlayerName;
        io.on('connection', (client) => {
            console.log('connection');
            client.on('getMapStatic', () => {
                io.emit('returnMapStaticData', {
                    testMapJSON: StaticMapData_1.testMapJSON,
                    playerName: this.connectionPlayerName,
                    allPlayerArray: this.playerArray
                });
            });
            client.on('checkUserAuthorization', (userData) => {
                this.broker.call("AccountService.checkUserAuthorization", userData).then(result => {
                    this.connectionPlayerName = result.name;
                    io.emit('resultUserAuthorization', result);
                });
            });
            client.on('setDataControls', (userData) => {
                let test = this.playerArray.filter(function (data) {
                    return data.userId === userData.userId;
                });
                if (test.length === 0) {
                    this.playerArray.push(userData);
                }
                if (test[0]) {
                    test[0].position = userData.position;
                }
                io.emit('getUserPosition', { thisUser: test[0], arrayUser: this.playerArray });
            });
        });
        const portIO = 8010;
        io.listen(portIO);
    }
}
module.exports = ServicesController;
//# sourceMappingURL=ServicesController.service.js.map