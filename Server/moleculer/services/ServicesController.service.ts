const Service = require("moleculer").Service;
const io = require('socket.io')();
import {room} from "./GameMechanicsService/MapCreator/StaticMapData";
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
            console.log('UserConnect');
            this.checkUserAuthorization(client);
            this.getRoom(client);
            client.on('disconnect', (client) => {
                console.log('UserDisconnect');

            });
        });

        const portIO = 8010;
        io.listen(portIO);
    }

    /**
     * Метод принимающий данные от игрока(клавиатура тачпад) и расчитывающий его движение на сервере
     */
    playerControls(client, room) {
        client.on('setDataControls', (keyUserPress) => {

            let playerThatUserControls = room.playersInTheRoom.filter(function (player) {
                //Проверяем тот ли это игрок по его SocketID
                return player.clientSocketIOID === client.id;
            })[0];

            if (playerThatUserControls) {
                playerThatUserControls.updateViaController(keyUserPress);
            }

            io.to(room.id).emit('getUserPosition', {
                thisUser: playerThatUserControls,
                arrayUser: room.playersInTheRoom
            });
        });
    }

    /**
     * Метод авторизациипользователя с проверкой данных из БД
     * @param client
     */
    checkUserAuthorization(client) {
        client.on('checkUserAuthorization', (userData) => {
            console.log(userData);
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
            this.broker.call("RoomCreator.getRoom", this.connectionPlayerName).then(room => {
                this.addUserSocketID(this.connectionPlayerName, room.playersInTheRoom, client.id);
                client.join(room.id);
                io.to(room.id).emit('returnRoomData', {
                    room,
                    playerName: this.connectionPlayerName,
                });
                this.playerControls(client, room);
            })
        });
        client.on('disconnect', () => {
            this.broker.call("RoomCreator.getRoom", this.connectionPlayerName).then(room => {
            room.removePlayerInRoom(this.connectionPlayerName);
                client.leave(room.id);
                io.to(room.id).emit('returnRoomData', {
                    room,
                    playerName: this.connectionPlayerName,
                });
                this.playerControls(client, room);
            })
        });
    }

    /**
     * Метод добавления игроку socketId так нам будет проще  отслеживать его действия на клиенте
     * @param playerID
     * @param playersInTheRoom
     * @param socketId
     */
    addUserSocketID(playerID, playersInTheRoom, socketId) {

        playersInTheRoom.filter((playerAvatar) => {
            return playerID === playerAvatar.id;
        })[0].changeSocketIOID(socketId)

    }
}

module.exports = ServicesController;
