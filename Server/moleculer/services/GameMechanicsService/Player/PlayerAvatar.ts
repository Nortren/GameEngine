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

    updateViaController(keyPress) {
        if (keyPress === 'KeyA' || keyPress === 'KeyW' || keyPress === 'KeyS' || keyPress === 'KeyD') {
            this.updatePosition(keyPress);
        }
        if (keyPress.event) {
            this.updateTouchPosition(keyPress);
        }

    }

    /**
     * Метод работы с управлением на TOUCH устройствах
     * @param keyPress
     */
    updateTouchPosition(keyPress) {

        console.log(keyPress);

        if (keyPress.event === 'touchstart') {
            this.touchStartPointX = keyPress.x;
            this.touchStartPointZ = keyPress.z;
        }
        if (keyPress.event === 'touchend') {
            this.touchStartPointX = false;
            this.touchStartPointZ = 0;

        }

        if (this.touchStartPointX > keyPress.x) {
            this.colliderPositionX = this.colliderPositionX - 0.1;
            this.moveDirection = 'LEFT';
        }
        if (this.touchStartPointX < keyPress.x) {
            this.colliderPositionX = this.colliderPositionX + 0.1;
            this.moveDirection = 'RIGHT';
        }
        if (this.touchStartPointZ > keyPress.z) {
            this.colliderPositionZ = this.colliderPositionZ - 0.1;
            this.moveDirection = 'UP';
        }
        if (this.touchStartPointZ < keyPress.z) {
            this.colliderPositionZ = this.colliderPositionZ + 0.1;
            this.moveDirection = 'DOWN';
        }


    }

    updatePosition(keyPress) {
        if (keyPress === 'KeyA') {
            this.colliderPositionX = this.colliderPositionX - 1;
            this.moveDirection = 'LEFT';
        }
        if (keyPress === 'KeyD') {
            this.colliderPositionX = this.colliderPositionX + 1;
            this.moveDirection = 'RIGHT';
        }
        if (keyPress === 'KeyW') {
            this.colliderPositionZ = this.colliderPositionZ - 1;
            this.moveDirection = 'UP';
        }
        if (keyPress === 'KeyS') {
            this.colliderPositionZ = this.colliderPositionZ + 1;
            this.moveDirection = 'DOWN';
        }


    }

    move() {

    }

    attack() {

    }

    death() {

    }

}





