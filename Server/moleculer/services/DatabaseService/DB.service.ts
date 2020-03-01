const Service = require("moleculer").Service;
import {MapJSON} from './temporaryDataDB/MapData';
import {PlayerJson} from './temporaryDataDB/PlayerData';
import {NPCJson} from './temporaryDataDB/NPCData';
import {UserDataJSON} from './temporaryDataDB/UserData';

class DB extends Service {
    constructor(broker) {
        super(broker);
        this.parseServiceSchema({
            name: "DB",
            // version: "v2",
            meta: {
                scalable: true
            },
            settings: {
                upperCase: true,
            },
            actions: {
                getMapData: this.getMapData,
                getPlayerData: this.getPlayerData,
                getEnemyData: this.getEnemyData,
                getUserData: this.getUserData,
                checkAuthorization: this.checkAuthorization,
            },
            events: {},
            created: this.serviceCreated,
            started: this.serviceStarted,
            stopped: this.serviceStopped,
        });
    }


    getMapData(ctx) {
        return MapJSON[ctx.params];
    }

    //TODO метод получения данных самого пользователя id,name,password наименование последней локации где был игрок одним словом самые главные данные
    getUserData(ctx) {

        const userID = ctx.params;
        let result = UserDataJSON.filter((user) => {
            return user.id === userID;
        });

        return result[0];
    }

    //TODO временный эмулятор данных БД по которому создаётся аватар игрока
    getPlayerData(ctx) {

        const playerID = ctx.params.id;
        return PlayerJson[playerID];
    }

    getEnemyData(ctx) {
        const enemyMap = new Map();

        ctx.params.forEach((enemy) => {
            let enemyType = enemy.typeEnemy;
            let enemyProperty = NPCJson[enemyType];

            enemyMap.set(enemyType,enemyProperty);
        });
        return enemyMap;
    }

    checkAuthorization(ctx) {
        const authorizationParams = ctx.params;
        let result = UserDataJSON.filter((user) => {
            return user.password === authorizationParams.password;
            // return (user.password === authorizationParams.password) && (user.name === authorizationParams.name)
        });

        if (result) {
            result[0].status = true;
        }

        return result[0];
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

module.exports = DB;
