const Service = require("moleculer").Service;
const io = require('socket.io')();
import {testMapJSON} from "./GameMechanicsService/MapCreator/StaticMapData";
import Authorization from "./AccountService/ClientAuthorization/Authorization"

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
            this.checkUserAuthorization(client);
            this.getRoom(client);
            this.playerControls(client);
        });
        const portIO = 8010;
        io.listen(portIO);
    }

    /**
     * Метод принимающий данные от игрока(клавиатура тачпад) и расчитывающий его движение на сервере
     */
    playerControls(client) {
        client.on('setDataControls', (userData) => {
            // console.log(userData);
            let test = this.playerArray.filter(function (data) {
                return data.userId === userData.userId;
            });
            if (test.length === 0) {

                this.playerArray.push(userData);

            }

            if (test[0]) {
                test[0].position = userData.position;
            }
            io.emit('getUserPosition', {thisUser: test[0], arrayUser: this.playerArray});
        });
    }

    /**
     * Метод авторизациипользователя с проверкой данных из БД
     * @param client
     */
    checkUserAuthorization(client) {
        client.on('checkUserAuthorization', (userData) => {
            this.broker.call("AccountService.checkUserAuthorization", userData).then(result => {
                this.connectionPlayerName = result.id;

                io.emit('resultUserAuthorization', result);
            })
        });
    }

    /**
     * Отдаём пользователю комнату вкоторой должен быть инициализирован его персоонаж
     * @param client
     */
    getRoom(client) {
        client.on('getRoomData', () => {
            this.broker.call("RoomCreator.getRoom", this.connectionPlayerName).then(result => {
                console.log(this.connectionPlayerName);
                io.emit('returnRoomData', {
                    result,
                    playerName: this.connectionPlayerName,
                    allPlayerArray: this.playerArray
                });
            })
        });
    }
}

module.exports = ServicesController;
