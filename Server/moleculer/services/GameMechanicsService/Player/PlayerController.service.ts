const Service = require("moleculer").Service;
import PlayerAvatar from "./PlayerAvatar";

class PlayerController extends Service {

    constructor(broker) {


        super(broker);

        this.parseServiceSchema({
            name: "PlayerController",
            // version: "v2",
            meta: {
                scalable: true
            },
            settings: {
                upperCase: true
            },
            actions: {
                createRoom:this.createRoom,
                createPlayer:this.createPlayer,
                getRoomsList:this.getRoomsList,

            },
            events: {},
            created: this.serviceCreated,
            started: this.serviceStarted,
            stopped: this.serviceStopped,
        });
    }

    createPlayer(ctx) {

        let id = ctx.params.id;
        let health = ctx.params.health;
        let damage = ctx.params.damage;
        let attackDistance = ctx.params.attackDistance;
        let attackSpeed = ctx.params.attackSpeed;
        let moveSpeed = ctx.params.moveSpeed;

        let playerAvatar = new PlayerAvatar(id,health,damage,attackSpeed,moveSpeed,attackDistance);
        return playerAvatar;

    }
    createRoom(ctx) {
        let playerAvatar = new PlayerAvatar();
        // console.log('Test createPlayer',ctx.params);
    }
    getRoomsList(ctx) {
        let playerAvatar = new PlayerAvatar();
        // console.log('Test createPlayer',ctx.params);
    }



    userAuthorization(ctx) {
        console.log(ctx.params);
        return '';
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

module.exports = PlayerController;
