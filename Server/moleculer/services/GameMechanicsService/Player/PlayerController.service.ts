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


        const id = ctx.params.playerID;
        const player =ctx.params.playerDBData;
        const health = player.health;
        const damage = player.damage;
        const attackDistance = player.attackDistance;
        const attackSpeed = player.attackSpeed;
        const moveSpeed = player.moveSpeed;

        const colliderPositionX = player.colliderPositionX;
        const colliderPositionY = player.colliderPositionY;
        const colliderPositionZ = player.colliderPositionZ;
        const colliderWidth = player.colliderWidth;
        const colliderHeight = player.colliderHeight;
        const colliderLength = player.colliderLength;
        const sprite = player.sprite;
        const collaid = player.collaid;

        const playerAvatar = new PlayerAvatar(id,health,damage,
            attackSpeed,moveSpeed,attackDistance,
            colliderPositionX,colliderPositionY,colliderPositionZ,
            colliderWidth,colliderHeight,colliderLength,
			sprite,collaid
        );

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
