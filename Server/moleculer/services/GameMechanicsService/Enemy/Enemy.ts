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
    moveSpeed: number;
    directionMove: string;
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
    }

    move(roomData) {
        const enemy = this;
        const playersInTheRoom = roomData.playersInTheRoom;
        this.persecutionObjectOld(enemy, playersInTheRoom);

    }

    attack() {

    }

    death() {

    }

    persecutionObjectOld(enemy: object, playersInTheRoom: Array<object>) {


        if (playersInTheRoom) {
            //Вычисляем ближайшего к нам игрока
            let huntedPlayer = playersInTheRoom.filter((player) => {
                return this.nearestPlayer(player, enemy)
            })[0];


            this.goToThePlayer(huntedPlayer, enemy);
        }
    }

    /**
     * Определяем ближайшего к врагу игрока
     * @param player
     * @param enemy
     * @returns {boolean}
     */
    nearestPlayer(player, enemy) {
        /*TODO в дальнейшем надол сделать так чтоб определялся самый ближайший игрок а не первый попавшийся в радиусе видимости из массива с игроками плюс учет количества жизней игрока(в зависимости от типа монстра
         кто-то будет за самым побитым кто-то за самым сильным и т.д)*/
        //Тут идёт умножение ширины и длинны на 0.5 т.к они считаются от центра т.е половину откладываем в одну сторону половину в другую
        if (enemy.scopeRadius + Math.abs(enemy.colliderPositionX) >= Math.abs(Math.abs(player.colliderPositionX) - player.colliderWidth * 0.5) &&
            enemy.scopeRadius + Math.abs(enemy.colliderPositionZ) >= Math.abs(Math.abs(player.colliderPositionZ) - player.colliderLength * 0.5)) {
            return true;
        }
    }

    /**
     * Двигаемся к выбранному игроку
     */
    goToThePlayer(huntedPlayer, enemy) {

        const speedMove = this.moveSpeed * 0.1;
        if (enemy && huntedPlayer) {
            //Движение за игроком по оси X
            if (enemy.colliderPositionX.toFixed(1) !== huntedPlayer.colliderPositionX.toFixed(1)) {
                if (enemy.colliderPositionX <= huntedPlayer.colliderPositionX) {
                    this.colliderPositionX = this.colliderPositionX + speedMove;
                }
                if (enemy.colliderPositionX >= huntedPlayer.colliderPositionX) {
                    this.colliderPositionX = this.colliderPositionX - speedMove;
                }
            }

            //Движение за игроком по оси Z
            if (enemy.colliderPositionZ.toFixed(1) !== huntedPlayer.colliderPositionZ.toFixed(1)) {
                if (enemy.colliderPositionZ <= huntedPlayer.colliderPositionZ) {
                    this.colliderPositionZ = this.colliderPositionZ + speedMove;
                }
                if (enemy.colliderPositionZ >= huntedPlayer.colliderPositionZ) {
                    this.colliderPositionZ = this.colliderPositionZ - speedMove;
                }
            }


            //Направление в которое следуем(для правильной анимации)

            let squareWidth = (enemy.colliderPositionX + enemy.scopeRadius) / 3;
            let squareHeight = (enemy.colliderPositionZ + enemy.scopeRadius) / 3;


            this.directionMove = 'DOWN';


            if (huntedPlayer.colliderPositionX === enemy.colliderPositionX && huntedPlayer.colliderPositionZ >= enemy.colliderPositionZ) {
                this.directionMove = 'DOWN';

            }


            else if (huntedPlayer.colliderPositionX < enemy.colliderPositionX && huntedPlayer.colliderPositionZ >enemy.colliderPositionZ) {
                this.directionMove = 'DOWN_LEFT';

            }

            else if (huntedPlayer.colliderPositionX > enemy.colliderPositionX && huntedPlayer.colliderPositionZ > enemy.colliderPositionZ) {
                this.directionMove = 'DOWN_RIGHT';

            }


            else if (huntedPlayer.colliderPositionX === enemy.colliderPositionX && huntedPlayer.colliderPositionZ <= enemy.colliderPositionZ) {

                this.directionMove = 'UP';
            }


            else if (huntedPlayer.colliderPositionX < enemy.colliderPositionX && huntedPlayer.colliderPositionZ < enemy.colliderPositionZ) {
                this.directionMove = 'UP_LEFT';

            }

            else if (huntedPlayer.colliderPositionX > enemy.colliderPositionX && huntedPlayer.colliderPositionZ < enemy.colliderPositionZ) {
                this.directionMove = 'UP_RIGHT';

            }


            else if (huntedPlayer.colliderPositionX >= enemy.colliderPositionX && huntedPlayer.colliderPositionZ === enemy.colliderPositionZ) {
                this.directionMove = 'RIGHT';

            }
            else if (huntedPlayer.colliderPositionX <= enemy.colliderPositionX && huntedPlayer.colliderPositionZ === enemy.colliderPositionZ) {

                this.directionMove = 'LEFT';

            }


        }
    }

}





