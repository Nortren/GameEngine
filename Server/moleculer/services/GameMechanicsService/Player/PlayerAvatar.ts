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


        if (keyPress.event !== "mouseMove") {
            this.updateTouchPosition(keyPress);
        }
        if (keyPress.event === "mouseMove") {
            this.updateMousePosition(keyPress);
        }

        if (keyPress === 'KeyA' || keyPress === 'KeyW' || keyPress === 'KeyS' || keyPress === 'KeyD' || keyPress === 'keyUp' || keyPress.nameButton) {
            this.updatePosition(keyPress);
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
        const windowWidthCenter = keyPress.windowSize.width;
        const windowHeightCenter = keyPress.windowSize.height;

        let squareWidth = windowWidthCenter / 3;
        let squareHeight = windowHeightCenter / 3;
        this.mouseDirection = 'DOWN';

        if (keyPress.x <= squareWidth && keyPress.z <= squareHeight) {
            this.mouseDirection = 'UP_LEFT';

        }
        else if (keyPress.x <= squareWidth * 2 && keyPress.z <= squareHeight) {
            this.mouseDirection = 'UP';

        }
        else if (keyPress.x <= squareWidth * 3 && keyPress.z <= squareHeight) {
            this.mouseDirection = 'UP_RIGHT';

        }
        else if (keyPress.x <= squareWidth && keyPress.z <= squareHeight * 2) {
            this.mouseDirection = 'LEFT';

        }
        else if (keyPress.x <= squareWidth * 2 && keyPress.z <= squareHeight * 2) {
            this.mouseDirection = 'UP';

        }
        else if (keyPress.x <= squareWidth * 3 && keyPress.z <= squareHeight * 2) {
            this.mouseDirection = 'RIGHT';

        }
        else if (keyPress.x <= squareWidth && keyPress.z <= squareHeight * 3) {
            this.mouseDirection = 'DOWN_LEFT';

        }
        else if (keyPress.x <= squareWidth * 2 && keyPress.z <= squareHeight * 3) {
            this.mouseDirection = 'DOWN';

        }
        else if (keyPress.x <= squareWidth * 3 && keyPress.z <= squareHeight * 3) {
            this.mouseDirection = 'DOWN_RIGHT';

        }

        this.moveDirection = this.mouseDirection;
    }


    updatePosition(keyPress) {
        //TODO Чтоб игрок не дёргало , не нужно каждый раз отправлять событие перерисовки с мышью пока она не вышла из квадрата отслеживания
        this.moveContinue = true;
        if (keyPress.nameButton === 'ButtonAttack') {
            this.attackStatus = keyPress.press;
            if (!keyPress.press) {
                this.moveContinue = false;
            }
        }
        let reverseDirectionMove = 0;
        if (keyPress === 'KeyW') {
            reverseDirectionMove = 0.1;
            this.colliderPositionZ = this.colliderPositionZ - 0.1;
        }

        if (keyPress === 'KeyS') {
            this.colliderPositionZ = this.colliderPositionZ + 0.1;
            reverseDirectionMove = -0.1;
        }

        if (keyPress !== 'KeyA' && keyPress !== 'KeyD') {
            if (this.mouseDirection === 'UP_LEFT') {
                this.colliderPositionX = this.colliderPositionX - reverseDirectionMove;
                this.moveDirection = this.mouseDirection;
            }
            else if (this.mouseDirection === 'UP') {
                this.moveDirection = this.mouseDirection;
            }
            else if (this.mouseDirection === 'UP_RIGHT') {
                this.colliderPositionX = this.colliderPositionX + reverseDirectionMove;
                this.moveDirection = this.mouseDirection;
            }
            else if (this.mouseDirection === 'DOWN_LEFT') {
                this.colliderPositionX = this.colliderPositionX + reverseDirectionMove;
                this.moveDirection = this.mouseDirection;
            }
            else if (this.mouseDirection === 'DOWN') {
                this.moveDirection = this.mouseDirection;
            }

            else if (this.mouseDirection === 'DOWN_RIGHT') {
                this.colliderPositionX = this.colliderPositionX - reverseDirectionMove;
                this.moveDirection = this.mouseDirection;
            }

            else if (this.mouseDirection === 'LEFT') {
                this.colliderPositionX = this.colliderPositionX - reverseDirectionMove;
                this.moveDirection = this.mouseDirection;
            }
            else if (this.mouseDirection === 'RIGHT') {
                this.colliderPositionX = this.colliderPositionX + reverseDirectionMove;
                this.moveDirection = this.mouseDirection;
            }

        }

        if (keyPress === 'KeyA') {
            this.colliderPositionX = this.colliderPositionX - 0.1;
            this.moveDirection = this.mouseDirection;
        }
        if (keyPress === 'KeyD') {
            this.colliderPositionX = this.colliderPositionX + 0.1;
            this.moveDirection = this.mouseDirection;
        }

        //Если пользователь прекратил нажатия на клавишу то нужно оповестить об этом чтоб прекратить анимации
        if (keyPress === 'keyUp') {
            this.moveDirection = 'STOP';
            this.moveContinue = false;
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





