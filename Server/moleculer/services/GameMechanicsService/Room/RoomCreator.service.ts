const Service = require("moleculer").Service;

class RoomCreator extends Service {
    roomList: Array<object>;

    constructor(broker) {

        super(broker);
        this.parseServiceSchema({
            name: "RoomCreator",
            // version: "v2",
            meta: {
                scalable: true
            },
            settings: {
                upperCase: true,
            },
            actions: {
                createRoom: this.createRoom,
            },
            events: {},
            created: this.serviceCreated,
            started: this.serviceStarted,
            stopped: this.serviceStopped,
        });
    }


    createRoom(ctx) {
        const promises = [];
        let resolveData = {};


        return new Promise((resolve, reject) => {
            promises.push(this.broker.call("DB.getMapData").then(result => {
                    resolveData.map = result;
                },
                error => {
                    console.log('ошибка получения данных о карте из БД')
                }));
                    promises.push(this.broker.call("DB.getPlayerData").then(result => {
                    result.id = ctx.params;
                    this.broker.call("PlayerController.createPlayer", result).then(
                        result => {
                            console.log('Создать игрока',result)
                        },
                        error => {
                            console.log('Ошибка при попытке создать игрока')
                        }
                    );


                    resolveData.player = result;
                },
                error => {
                    console.log('ошибка получения данных о игроке из БД')
                }));
                promises.push(this.broker.call("DB.getEnemyData").then(result => {
                    resolveData.enemy = result;
                },
                error => {
                    console.log('ошибка получения данных о противнике из БД')
                }));
            Promise.all(promises).then(() => {
                resolve(resolveData);
            });
        });
    }


    serviceCreated() {
        this.logger.info("ES6 Service created.");
    }

    serviceStarted() {
        this.logger.info("ES6 Service started.");
    }

    serviceStopped() {
        this.logger.info("ES6 Service stopped.");
    }
}

module.exports = RoomCreator;