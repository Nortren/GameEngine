export default class Enemy {
    id: string;
    sprite: string;
    collaid: string;
    scope: string;
    scopeRadius: number;
    colliderWidth: number;
    colliderHeight: number;
    colliderLength: number;
    pursuitZone: number;
    persecutionRadius: string;
    health: number;
    damage: number;
    attackDistance: number;
    attackSpeed: number;
    colliderPositionX: number;
    colliderPositionY: number;
    colliderPositionZ: number;
    colliderOldPositionX: number;
    colliderOldPositionY: number;
    colliderOldPositionZ: number;
    moveSpeed: number;
    directionMove: string;
    attackStatus: boolean;

    constructor(id: string,
                sprite: string,
                collaid: string,
                scope: string,
                scopeRadius: number,
                colliderPositionX: number,
                colliderPositionY: number,
                colliderPositionZ: number,
                colliderWidth: number,
                colliderHeight: number,
                colliderLength: number,
                pursuitZone: number,
                persecutionRadius: string,
                health: number,
                damage: number,
                attackDistance: number,
                attackSpeed: number,
                moveSpeed: number) {

        this.id = id;
        this.sprite = sprite;
        this.collaid = collaid;
        this.scope = scope;
        this.scopeRadius = scopeRadius;
        this.colliderPositionX = colliderPositionX;
        this.colliderPositionY = colliderPositionY;
        this.colliderPositionZ = colliderPositionZ;
        this.colliderWidth = colliderWidth;
        this.colliderHeight = colliderHeight;
        this.colliderLength = colliderLength;
        this.pursuitZone = pursuitZone;
        this.persecutionRadius = persecutionRadius;
        this.health = health;
        this.damage = damage;
        this.attackDistance = attackDistance;
        this.attackSpeed = attackSpeed;
        this.moveSpeed = moveSpeed;


    }

    create() {


    }

    update(roomData) {
        this.move(roomData);
        this.health <= 0 ? this.death(roomData) : null;
    }

    move(roomData) {
        const playersInTheRoom = roomData.playersInTheRoom;
        const enemyInTheRoom = roomData.enemy;
        const collisionInTheRoom = roomData.map.mapElement;


        this.correctMove(enemyInTheRoom);


        this.persecutionObjectOld(playersInTheRoom, collisionInTheRoom);
    }


    death(roomData) {

        roomData.removeEnemyInRoom(this.id);


    }

    /**
     * Метод генерации случайного числа
     * @param max
     * @returns {number}
     */
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }


    /**
     * Метод проверки корректности позиции бота т.е если бот стоит на той же точке что и другой бот один из них должен уступить эту позицию
     * @param enemyInTheRoom
     */
    correctMoveStatic(staticElement, huntedPlayer) {

        let currentEnemypositionX = this.colliderPositionX;
        let currentEnemypositionZ = this.colliderPositionZ;

        let move = true;

        for (var key in staticElement) {
            if (!this.collisionStatusMapElement(staticElement[key], currentEnemypositionX, currentEnemypositionZ)) {
                this.colliderPositionX = currentEnemypositionX;
                this.colliderPositionZ = currentEnemypositionZ;
            }
            else {
                move = false;
            }

            if (move) {
                this.goToThePlayer(huntedPlayer);
                this.colliderOldPositionX = this.colliderPositionX;
                this.colliderOldPositionZ = this.colliderPositionZ;
            }
            else {
                if(this.colliderPositionX > this.colliderOldPositionX){
                    console.log("x >");
                    this.colliderPositionX = this.colliderOldPositionX- this.moveSpeed;
                }
                else if(this.colliderPositionX < this.colliderOldPositionX){
                    console.log("x <");
                    this.colliderPositionX = this.colliderOldPositionX + this.moveSpeed;
                }
                else{
                    console.log("x =");
                    this.colliderPositionX = this.colliderOldPositionX  + this.moveSpeed;
                }

                if(this.colliderPositionZ > this.colliderOldPositionZ){
                    console.log("z >");
                    this.colliderPositionZ = this.colliderOldPositionZ - this.moveSpeed;
                }
                else if(this.colliderPositionZ < this.colliderOldPositionZ){
                    console.log("z <");
                    this.colliderPositionZ = this.colliderOldPositionZ + this.moveSpeed;
                }
                else{
                    console.log("z =");
                    this.colliderPositionZ = this.colliderOldPositionZ + this.moveSpeed;
                }
                this.colliderOldPositionX = this.colliderPositionX;
                this.colliderOldPositionZ = this.colliderPositionZ;
            }

        }
    }

    /**
     * Определяем есть ли пересечение с объектом по обеим точкам если да значит обьекты столкнулись
     * @param colliderObject
     * @returns {boolean}
     */
    collisionStatusMapElement(colliderObject, currentEnemypositionX, currentEnemypositionZ) {

        let CollisionX = this.checkCollisionAxis(currentEnemypositionX, this.colliderWidth, colliderObject.colliderPositionX, colliderObject.colliderWidth);
        let CollisionZ = this.checkCollisionAxis(currentEnemypositionZ, this.colliderLength, colliderObject.colliderPositionZ, colliderObject.colliderLength);

        if (!CollisionZ || !CollisionX) {
            return false;
        }
        return true;
    }

    /**
     * Метод проверки корректности позиции бота т.е если бот стоит на той же точке что и другой бот один из них должен уступить эту позицию
     * @param enemyInTheRoom
     */
    correctMove(enemyInTheRoom) {
        enemyInTheRoom.forEach((enemy) => {


            if (this.id !== enemy.id) {
                if (this.collisionStatus(enemy)) {
                    //Тут мы проверяем если есть колизия то случайно перемещаем бота в свободную точку
                    switch (this.getRandomInt(4)) {
                        case 0:
                            this.colliderPositionX += this.moveSpeed;
                            break;
                        case 1:
                            this.colliderPositionZ += this.moveSpeed;
                            break;
                        case 2:
                            this.colliderPositionX -= this.moveSpeed;
                            break;
                        case 3:
                            this.colliderPositionZ -= this.moveSpeed;
                            break;

                    }


                }

            }

        });

    }

    persecutionObjectOld(playersInTheRoom: Array<object>, collisionInTheRoom) {


        if (playersInTheRoom) {
            //Вычисляем ближайшего к нам игрока
            let huntedPlayer = playersInTheRoom.filter((player) => {
                return this.nearestPlayer(player)
            })[0];
            this.correctMoveStatic(collisionInTheRoom, huntedPlayer);


        }
    }

    /**
     * Определяем ближайшего к врагу игрока
     * @param player
     * @param enemy
     * @returns {boolean}
     */
    nearestPlayer(player) {
        this.attackStatus = false;
        /*TODO в дальнейшем надол сделать так чтоб определялся самый ближайший игрок а не первый попавшийся в радиусе видимости из массива с игроками плюс учет количества жизней игрока(в зависимости от типа монстра
         кто-то будет за самым побитым кто-то за самым сильным и т.д)*/
        //Тут идёт умножение ширины и длинны на 0.5 т.к они считаются от центра т.е половину откладываем в одну сторону половину в другую
        if (this.scopeRadius + Math.abs(this.colliderPositionX) >= Math.abs(Math.abs(player.colliderPositionX) - player.colliderWidth * 0.5) &&
            this.scopeRadius + Math.abs(this.colliderPositionZ) >= Math.abs(Math.abs(player.colliderPositionZ) - player.colliderLength * 0.5)) {
            return true;
        }
    }

    /**
     * Двигаемся к выбранному игроку
     */
    goToThePlayer(huntedPlayer) {

        const speedMove = this.moveSpeed;
        if (this && huntedPlayer) {
            if (!this.collisionStatus(huntedPlayer) && !this.attack(huntedPlayer)) {

                //Движение за игроком по оси X
                if (this.colliderPositionX.toFixed(1) !== huntedPlayer.colliderPositionX.toFixed(1)) {
                    if (this.colliderPositionX < huntedPlayer.colliderPositionX) {
                        this.colliderPositionX = this.colliderPositionX + speedMove;
                    }
                    if (this.colliderPositionX > huntedPlayer.colliderPositionX) {
                        this.colliderPositionX = this.colliderPositionX - speedMove;
                    }
                }

                //Движение за игроком по оси Z
                if (this.colliderPositionZ.toFixed(1) !== huntedPlayer.colliderPositionZ.toFixed(1)) {
                    if (this.colliderPositionZ < huntedPlayer.colliderPositionZ) {
                        this.colliderPositionZ = this.colliderPositionZ + speedMove;
                    }
                    if (this.colliderPositionZ > huntedPlayer.colliderPositionZ) {
                        this.colliderPositionZ = this.colliderPositionZ - speedMove;
                    }
                }
            }


            this.enemyAnimationRotation(huntedPlayer)


        }

    }

    attack(huntedPlayer) {

        let CollisionX = this.checkCollisionAxis(this.colliderPositionX, this.colliderWidth, huntedPlayer.colliderPositionX, huntedPlayer.colliderWidth, this.attackDistance);
        let CollisionZ = this.checkCollisionAxis(this.colliderPositionZ, this.colliderLength, huntedPlayer.colliderPositionZ, huntedPlayer.colliderLength, this.attackDistance);

        if (CollisionZ && CollisionX) {
            this.attackStatus = true;

            return true;
        }
        this.attackStatus = false;
        return false;
    }

    /**
     * Определяем есть ли пересечение с объектом по обеим точкам если да значит обьекты столкнулись
     * @param colliderObject
     * @returns {boolean}
     */
    collisionStatus(colliderObject) {

        let CollisionX = this.checkCollisionAxis(this.colliderPositionX, this.colliderWidth, colliderObject.colliderPositionX, colliderObject.colliderWidth);
        let CollisionZ = this.checkCollisionAxis(this.colliderPositionZ, this.colliderLength, colliderObject.colliderPositionZ, colliderObject.colliderLength);

        if (!CollisionZ || !CollisionX) {
            return false;
        }
        return true;
    }


    /**
     * Метод проверки столкновения с чем-либо
     * @param enemyPositionAxis позиция по оси (X,Z)
     * @param enemySize размер бота(Width,Length)
     * @param positionCollision Позиция объекта столкновения (X,Z)
     * @param sizeCollision Размер объекта столкновения (Width,Length)
     * @returns {boolean}
     */
    checkCollisionAxis(enemyPositionAxis, enemySize, positionCollision, sizeCollision, attackDistance: number = 0) {

        if ((enemyPositionAxis + enemySize * 0.5 + attackDistance >= positionCollision - sizeCollision * 0.5) &&
            (enemyPositionAxis - enemySize * 0.5 <= positionCollision + sizeCollision * 0.5 + attackDistance)) {
            return true;
        }
        return false;
    }


    /**
     * Метод необходимый для валидной анимации спрайта врага
     * @param huntedPlayer
     * @param enemy
     */
    enemyAnimationRotation(huntedPlayer) {
        //Направление в которое следуем(для правильной анимации)

        this.directionMove = 'DOWN';

        if (huntedPlayer.colliderPositionX === this.colliderPositionX && huntedPlayer.colliderPositionZ >= this.colliderPositionZ) {
            this.directionMove = 'DOWN';

        }


        else if (huntedPlayer.colliderPositionX < this.colliderPositionX && huntedPlayer.colliderPositionZ > this.colliderPositionZ) {
            this.directionMove = 'DOWN_LEFT';

        }

        else if (huntedPlayer.colliderPositionX > this.colliderPositionX && huntedPlayer.colliderPositionZ > this.colliderPositionZ) {
            this.directionMove = 'DOWN_RIGHT';

        }


        else if (huntedPlayer.colliderPositionX === this.colliderPositionX && huntedPlayer.colliderPositionZ <= this.colliderPositionZ) {

            this.directionMove = 'UP';
        }


        else if (huntedPlayer.colliderPositionX < this.colliderPositionX && huntedPlayer.colliderPositionZ < this.colliderPositionZ) {
            this.directionMove = 'UP_LEFT';

        }

        else if (huntedPlayer.colliderPositionX > this.colliderPositionX && huntedPlayer.colliderPositionZ < this.colliderPositionZ) {
            this.directionMove = 'UP_RIGHT';

        }

        else if (huntedPlayer.colliderPositionX >= this.colliderPositionX && huntedPlayer.colliderPositionZ === this.colliderPositionZ) {
            this.directionMove = 'RIGHT';

        }
        else if (huntedPlayer.colliderPositionX <= this.colliderPositionX && huntedPlayer.colliderPositionZ === this.colliderPositionZ) {

            this.directionMove = 'LEFT';

        }

    }
}





