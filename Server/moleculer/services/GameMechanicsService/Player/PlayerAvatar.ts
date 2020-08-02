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


    constructor(id: number, name: string, health: number, damage: number,
                attackSpeed: number, moveSpeed: number, attackDistance: number,
                colliderPositionX: number, colliderPositionY: number, colliderPositionZ: number,
                colliderWidth: number, colliderHeight: number, colliderLength: number,
                sprite: ISprite, collaid: string) {

        super(id, name, health, damage,
            attackSpeed, moveSpeed, attackDistance,
            colliderPositionX, colliderPositionY, colliderPositionZ,
            colliderWidth, colliderHeight, colliderLength,
            sprite, collaid
        );

        this.id = id;
        this.name = name;
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
     * Метод присвоения и изменения Socket ID игрока (нужнен нам для доп проверки пользователя например управление)
     * @param IOID
     */
    changeSocketIOID(IOID) {
        return this.clientSocketIOID = IOID;
    }

    updateViaController(keyPress, room) {


        if (keyPress.event !== "mouseMove") {
            this.updateTouchPosition(keyPress, room);
        }
        if (keyPress.event === "mouseMove") {
            this.updateMousePosition(keyPress);
        }

        /*   if (keyPress === 'KeyA' || keyPress === 'KeyW' || keyPress === 'KeyS' || keyPress === 'KeyD' || keyPress === 'keyUp' || keyPress.nameButton) {
         this.updatePosition(keyPress, room);
         }*/
        if (typeof keyPress === 'object' || keyPress.nameButton || keyPress === 'keyUp') {
            this.updatePosition(keyPress, room);
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


    updatePosition(keyPress, room) {

        //TODO Чтоб игрок не дёргало , не нужно каждый раз отправлять событие перерисовки с мышью пока она не вышла из квадрата отслеживания
        this.moveContinue = true;
        if (keyPress.nameButton === 'ButtonAttack') {
            this.attackStatus = keyPress.press;
            if (!keyPress.press) {
                this.moveContinue = false;
            }
        }
        let reverseDirectionMove = 0;
        if (keyPress.length === 1 && keyPress[0] === 'KeyW') {
            reverseDirectionMove = 0.1;
            const newPositionZ = this.colliderPositionZ - 0.1;
            this.colliderPositionZ = this.checkMovePosition(this.colliderPositionX, newPositionZ, room) ? newPositionZ : this.colliderPositionZ;
        }

        if (keyPress.length === 1 && keyPress[0] === 'KeyS') {
            const newPositionZ = this.colliderPositionZ + 0.1;
            this.colliderPositionZ = this.checkMovePosition(this.colliderPositionX, newPositionZ, room) ? newPositionZ : this.colliderPositionZ;
            reverseDirectionMove = -0.1;
        }

        if (keyPress.length === 1 && keyPress[0] === 'KeyA') {
            const newPositionX = this.colliderPositionX - 0.1;
            this.colliderPositionX = this.checkMovePosition(newPositionX, this.colliderPositionZ, room) ? newPositionX : this.colliderPositionX;
            this.moveDirection = this.mouseDirection;
        }
        if (keyPress.length === 1 && keyPress[0] === 'KeyD') {
            const newPositionX = this.colliderPositionX + 0.1;
            this.colliderPositionX = this.checkMovePosition(newPositionX, this.colliderPositionZ, room) ? newPositionX : this.colliderPositionX;
            this.moveDirection = this.mouseDirection;
        }




        if (keyPress.length === 2 && (keyPress[0] === 'KeyW' && keyPress[1] === 'KeyA' || keyPress[0] === 'KeyA' && keyPress[1] === 'KeyW')) {
            const newPositionX = this.colliderPositionX - 0.1;
            const newPositionZ = this.colliderPositionZ - 0.1;

            if (this.checkMovePosition(newPositionX, newPositionZ, room)) {
                this.colliderPositionX = newPositionX;
                this.colliderPositionZ = newPositionZ;
            }
            this.moveDirection = 'UP_LEFT';
        }

        if (keyPress.length === 2 && (keyPress[0] === 'KeyW' && keyPress[1] === 'KeyD' || keyPress[0] === 'KeyD' && keyPress[1] === 'KeyW')) {
            const newPositionX = this.colliderPositionX + 0.1;
            const newPositionZ = this.colliderPositionZ - 0.1;

            if (this.checkMovePosition(newPositionX, newPositionZ, room)) {
                this.colliderPositionX = newPositionX;
                this.colliderPositionZ = newPositionZ;
            }
            this.moveDirection = 'UP_RIGHT';

        }

        if (keyPress.length === 2 && (keyPress[0] === 'KeyS' && keyPress[1] === 'KeyA' || keyPress[0] === 'KeyA' && keyPress[1] === 'KeyS')) {
            const newPositionX = this.colliderPositionX - 0.1;
            const newPositionZ = this.colliderPositionZ + 0.1;

            if (this.checkMovePosition(newPositionX, newPositionZ, room)) {
                this.colliderPositionX = newPositionX;
                this.colliderPositionZ = newPositionZ;
            }


            this.moveDirection = 'DOWN_LEFT';
        }

        if (keyPress.length === 2 && (keyPress[0] === 'KeyS' && keyPress[1] === 'KeyD' || keyPress[0] === 'KeyD' && keyPress[1] === 'KeyS')) {
            const newPositionX = this.colliderPositionX + 0.1;
            const newPositionZ = this.colliderPositionZ + 0.1;

            if (this.checkMovePosition(newPositionX, newPositionZ, room)) {
                this.colliderPositionX = newPositionX;
                this.colliderPositionZ = newPositionZ;
            }
            this.moveDirection = 'DOWN_RIGHT';

        }










        //Если пользователь прекратил нажатия на клавишу то нужно оповестить об этом чтоб прекратить анимации
        if (keyPress === 'keyUp') {
            this.moveDirection = 'STOP';
            this.moveContinue = false;
        }
        //TODO Закоментированный блок отвечал за разворот персоонажа отталкиваясь от позиции мышки на экране (пока решили убрать и оставить четкое направление движения)

        /*		if (keyPress !== 'KeyA' && keyPress !== 'KeyD') {
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

         }*/


    }


    /**
     * Метод работы с управлением на TOUCH устройствах
     * @param keyPress
     */
    updateTouchPosition(keyPress, room) {
        //TODO Временная функция атаки для тестирования
        this.moveContinue = true;
        if (keyPress.nameButton === 'ButtonAttack') {
            this.attackStatus = keyPress.press;
            this.moveContinue = false;
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


        this.directionMove = 'DOWN';


        if (this.touchStartPointZ < keyPress.z && (keyPress.x - 10 <= this.touchStartPointX && this.touchStartPointX <= keyPress.x + 10)) {
            const newPositionZ = this.colliderPositionZ + 0.1;
            this.colliderPositionZ = this.checkMovePosition(this.colliderPositionX, newPositionZ, room) ? newPositionZ : this.colliderPositionZ;

            this.moveDirection = 'DOWN';

        }
        else if (this.touchStartPointZ > keyPress.z && (keyPress.x - 10 <= this.touchStartPointX && this.touchStartPointX <= keyPress.x + 10)) {
            const newPositionZ = this.colliderPositionZ - 0.1;
            this.colliderPositionZ = this.checkMovePosition(this.colliderPositionX, newPositionZ, room) ? newPositionZ : this.colliderPositionZ;
            this.moveDirection = 'UP';
        }
        else if (this.touchStartPointX < keyPress.x && (keyPress.z - 10 <= this.touchStartPointZ && this.touchStartPointZ <= keyPress.z + 10)) {
            const newPositionX = this.colliderPositionX + 0.1;
            this.colliderPositionX = this.checkMovePosition(newPositionX, this.colliderPositionZ, room) ? newPositionX : this.colliderPositionX;
            this.moveDirection = 'RIGHT';

        }
        else if (this.touchStartPointX > keyPress.x && (keyPress.z - 10 <= this.touchStartPointZ && this.touchStartPointZ <= keyPress.z + 10)) {
            const newPositionX = this.colliderPositionX - 0.1;
            this.colliderPositionX = this.checkMovePosition(newPositionX, this.colliderPositionZ, room) ? newPositionX : this.colliderPositionX;
            this.moveDirection = 'LEFT';

        }

        else if (this.touchStartPointX > keyPress.x && this.touchStartPointZ < keyPress.z) {
            const newPositionX = this.colliderPositionX - 0.1;
            const newPositionZ = this.colliderPositionZ + 0.1;

            if (this.checkMovePosition(newPositionX, newPositionZ, room)) {
                this.colliderPositionX = newPositionX;
                this.colliderPositionZ = newPositionZ;
            }


            this.moveDirection = 'DOWN_LEFT';
        }

        else if (this.touchStartPointX < keyPress.x && this.touchStartPointZ > keyPress.z) {
            const newPositionX = this.colliderPositionX + 0.1;
            const newPositionZ = this.colliderPositionZ - 0.1;

            if (this.checkMovePosition(newPositionX, newPositionZ, room)) {
                this.colliderPositionX = newPositionX;
                this.colliderPositionZ = newPositionZ;
            }
            this.moveDirection = 'UP_RIGHT';

        }

        else if (this.touchStartPointX < keyPress.x && this.touchStartPointZ < keyPress.z) {
            const newPositionX = this.colliderPositionX + 0.1;
            const newPositionZ = this.colliderPositionZ + 0.1;

            if (this.checkMovePosition(newPositionX, newPositionZ, room)) {
                this.colliderPositionX = newPositionX;
                this.colliderPositionZ = newPositionZ;
            }
            this.moveDirection = 'DOWN_RIGHT';

        }


        else if (this.touchStartPointX > keyPress.x && this.touchStartPointZ > keyPress.z) {
            const newPositionX = this.colliderPositionX - 0.1;
            const newPositionZ = this.colliderPositionZ - 0.1;

            if (this.checkMovePosition(newPositionX, newPositionZ, room)) {
                this.colliderPositionX = newPositionX;
                this.colliderPositionZ = newPositionZ;
            }
            this.moveDirection = 'UP_LEFT';
        }


    }

    /**
     * Метод который переводит координаты объекта из глобальных координат в координаты матрици(сетки) используемый в алгоритме Ли
     * Отдельно для оси Х и Z
     * @param searchPoint
     * @param size
     * @returns {number}
     */
    findPointToLeeArray(searchPoint, size) {
        let result = Math.ceil(searchPoint + size / 2 - 1);

        return result
    }

    /**
     * метод проверки колизии с колайдерами аватара юзера
     * @param newPositionX
     * @param newPositionZ
     * @param room
     * @returns {boolean}
     */
    checkMovePosition(newPositionX, newPositionZ, room) {
        const wall = -2;
        const gridMap = room.grid;
        const width = room.map.width;
        const length = room.map.length;
        const startPointX = this.findPointToLeeArray(Math.ceil(newPositionX), width);
        const startPointZ = this.findPointToLeeArray(Math.ceil(newPositionZ), length);

        return gridMap[startPointZ][startPointX] !== wall;
    }

    move(map, gridMap) {


    }

    update(room): void {
        //TODO Пока стрельба только по ботам (потом нужно допилить и стрельбу по игрокам)
        this.attack(room.enemy);

    }


    attack(enemy) {

        if (this.attackStatus) {
            enemy.forEach((target) => {
                if (this.immediateObjective(target)) {
                    target.health = target.health - this.damage;
                }
            })
        }
    }


    /**
     * Определение ближайшей цели
     * @param target
     */
    immediateObjective(target) {

        let CollisionX = this.checkCollisionAxis(this.colliderPositionX, this.colliderWidth, target.colliderPositionX, target.colliderWidth, this.attackDistance);
        let CollisionZ = this.checkCollisionAxis(this.colliderPositionZ, this.colliderLength, target.colliderPositionZ, target.colliderLength, this.attackDistance);

        if (CollisionZ && CollisionX) {
            this.attackStatus = true;

            return true;
        }
        return false;

    }


    /**
     * Проверка на попадание в цель
     * @param enemyPositionAxis
     * @param enemySize
     * @param positionCollision
     * @param sizeCollision
     * @param attackDistance
     */
    checkCollisionAxis(enemyPositionAxis, enemySize, positionCollision, sizeCollision, attackDistance) {

        if ((enemyPositionAxis + enemySize * 0.5 + attackDistance >= positionCollision - sizeCollision * 0.5) &&
            (enemyPositionAxis - enemySize * 0.5 <= positionCollision + sizeCollision * 0.5 + attackDistance)) {
            return true;
        }
        return false;
    }


    death() {

    }

}





