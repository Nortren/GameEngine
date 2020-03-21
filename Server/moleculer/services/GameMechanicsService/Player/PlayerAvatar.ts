import PlayerMainClass from "./PlayerMainClass";


interface ISprite {
    src: string,
    numberOfFramesX: number,
    numberOfFramesY: number,
    firstFrameMove: number,
    lastFrameMove: number,
    firstFrameAttack: number,
    lastFrameAttack: number,
    firstFrameDeath: number,
    lastFrameDeath: number,
}

export default class PlayerAvatar extends PlayerMainClass {


    constructor(id: number, health: number, damage: number,
                attackSpeed: number, moveSpeed: number, attackDistance: number,
                colliderPositionX: number, colliderPositionY: number, colliderPositionZ: number,
                colliderWidth: number, colliderHeight: number, colliderLength: number,
                sprite: ISprite, collaid: string) {

        super(id, health, damage,
            attackSpeed, moveSpeed, attackDistance,
            colliderPositionX, colliderPositionY, colliderPositionZ,
            colliderWidth, colliderHeight, colliderLength,
            sprite, collaid
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
        this.sprite = sprite;
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
        if (keyPress === 'KeyA' || keyPress === 'KeyW' || keyPress === 'KeyS' || keyPress === 'KeyD' || keyPress === 'keyUp' || keyPress.nameButton) {
            this.updatePosition(keyPress);
        }

        if (keyPress.event !== "mouseMove") {
            this.updateTouchPosition(keyPress);
        }
        if (keyPress.event === "mouseMove") {
            this.updateMousePosition(keyPress);
        }

    }

    /**
     * NТут нам приходят памраметры игровой области..нам нужно определить центр и разбить область на четыре части в зависимости от того на какой части находится
     * курсор мыши будет определять куда смотрит персоонаж
     *
     * @param keyPress
     */
    updateMousePosition(keyPress) {
        //TODO Временная функция атаки для тестирования
        if (keyPress.nameButton === 'ButtonAttack') {
            this.attackStatus = keyPress.press;
        }
        const windowWidthCenter = keyPress.windowSize.width/2;
        const windowHeightCenter = keyPress.windowSize.height/2;

        console.log(windowWidthCenter,windowHeightCenter,'_______',keyPress.x,keyPress.z);


        this.mouseDirection = 'DOWN';
        if (windowWidthCenter > keyPress.x) {
            // this.colliderPositionX = this.colliderPositionX;
            this.mouseDirection = 'LEFT';
        }
        if (windowWidthCenter < keyPress.x) {
            // this.colliderPositionX = this.colliderPositionX;
            this.mouseDirection = 'RIGHT';
        }
        if (windowHeightCenter > keyPress.z) {
            // this.colliderPositionZ = this.colliderPositionZ;
            this.mouseDirection = 'UP';
        }
        if (windowHeightCenter < keyPress.z) {
            // this.colliderPositionZ = this.colliderPositionZ;
            this.mouseDirection = 'DOWN';
        }
        this.moveDirection = this.mouseDirection ;
    }



    updatePosition(keyPress) {
        if (keyPress.nameButton === 'ButtonAttack') {
            this.attackStatus = keyPress.press;
        }

        if (keyPress === 'KeyA') {
            this.colliderPositionX = this.colliderPositionX - 0.1;
            this.moveDirection = this.mouseDirection ;
        }
        if (keyPress === 'KeyD') {
            this.colliderPositionX = this.colliderPositionX + 0.1;
            this.moveDirection = this.mouseDirection ;
        }
        if (keyPress === 'KeyW') {
            this.colliderPositionZ = this.colliderPositionZ - 0.1;
            this.moveDirection = this.mouseDirection ;
        }
        if (keyPress === 'KeyS') {
            this.colliderPositionZ = this.colliderPositionZ + 0.1;
            this.moveDirection = this.mouseDirection ;
        }
        //Если пользователь прекратил нажатия на клавишу то нужно оповестить об этом чтоб прекратить анимации
        if (keyPress === 'keyUp') {
            this.moveDirection = 'STOP';
        }


    }



    /**
     * Метод работы с управлением на TOUCH устройствах
     * @param keyPress
     */
    updateTouchPosition(keyPress) {
        //TODO Временная функция атаки для тестирования
        if (keyPress.nameButton === 'ButtonAttack') {
            this.attackStatus = keyPress.press;
        }

        if (keyPress.event === 'touchstart') {
            this.touchStartPointX = keyPress.x;
            this.touchStartPointZ = keyPress.z;
        }
        if (keyPress.event === 'touchend') {
            this.touchStartPointX = false;
            this.touchStartPointZ = 0;
            //Если пользователь прекратил нажатия на экран Touch устройства то нужно оповестить об этом чтоб прекратить анимации
            this.moveDirection = 'STOP';
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

    move() {

    }

    attack() {

    }

    death() {

    }

}





