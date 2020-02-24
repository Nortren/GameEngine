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
                checkAuthorization: this.checkAuthorization,
            },
            events: {},
            created: this.serviceCreated,
            started: this.serviceStarted,
            stopped: this.serviceStopped,
        });
    }


    getMapData(ctx) {
        return MapJSON.map;
    }

    getPlayerData(ctx) {
        return PlayerJson.player;
    }

    getEnemyData(ctx) {
        return NPCJson.enemy;
    }

    checkAuthorization(ctx) {
        const authorizationParams = ctx.params;
        let result = UserDataJSON.filter((user) => {
            return user.password === authorizationParams.password
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