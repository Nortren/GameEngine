import PlayerMainClass from "./PlayerMainClass";
export default class PlayerAvatar extends PlayerMainClass {


    constructor(id: number, health: number, damage: number,
                attackSpeed: number, moveSpeed: number, attackDistance: number,
                colliderPositionX: number, colliderPositionY: number, colliderPositionZ: number,
                colliderWidth: number, colliderHeight: number, colliderLength: number,
                src: string, collaid: string) {

        super(id, health, damage,
            attackSpeed, moveSpeed, attackDistance,
            colliderPositionX, colliderPositionY, colliderPositionZ,
            colliderWidth, colliderHeight, colliderLength,
            src, collaid
        );

        this.id = id;
        this.health = health;
        this.damage = damage;
        this.attackSpeed = attackSpeed;
        this.moveSpeed = moveSpeed;
        this.attackDistance = attackDistance;

        this.colliderPositionX = colliderPositionX;
        this.colliderPositionY = colliderPositionY;
        this.colliderPositionZ = colliderPositionZ;
        this.colliderWidth = colliderWidth;
        this.colliderHeight = colliderHeight;
        this.colliderLength = colliderLength;
        this.src = src;
        this.collaid = collaid;
    }

    create() {


    }

    /**
     * Методж присвоения и изменения Socket ID игрока (нужнен нам для доп проверки пользователя например управление)
     * @param IOID
     */
    changeSocketIOID(IOID) {
        return this.clientSocketIOID = IOID;
    }

    updateViaVontroller(keyPress) {

        if (keyPress === 'KeyA' || keyPress === 'KeyW' || keyPress === 'KeyS' || keyPress === 'KeyD') {
            this.updatePosition(keyPress);
        }


    }

    updatePosition(keyPress) {

        if (keyPress === 'KeyA') {
            this.colliderPositionX += this.colliderPositionX + 0.01;
        }
        if (keyPress === 'KeyD') {
            this.colliderPositionX -= this.colliderPositionX + 0.01;
        }
        if (keyPress === 'KeyW') {
            this.colliderPositionZ += this.colliderPositionZ + 0.01;
        }
        if (keyPress === 'KeyS') {
            this.colliderPositionZ -= this.colliderPositionZ + 0.01;
        }


    }

    move() {

    }

    attack() {

    }

    death() {

    }

}





