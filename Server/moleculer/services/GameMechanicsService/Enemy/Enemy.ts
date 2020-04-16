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
    countLee: number;
    countMove: number;
    resultSearch: boolean | object;

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
        this.countLee = 0;
        this.countMove = 0;
        this.resultSearch = {};
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
        const map = roomData.map;
        //Количество тиков прежде чем вновь вызвать поиск пути
        this.countLee++;


        // this.correctMove(enemyInTheRoom);
        this.persecutionObjectOldNew(roomData, map);


    }


    persecutionObjectOldNew(roomData, map) {

        const playersInTheRoom = roomData.playersInTheRoom;
        const grid = this.createGridMap(map);

        //TODO Нужно обсчитать по нормальному например принимая что точка в которой стоит this.Enemy свободно ,а то он упирается в нее и не может идти
        // this.dynamicGridObjects(roomData, grid);

        const startPointX = this.findPointToLeeArray(Math.ceil(this.colliderPositionX), map.width);
        const startPointZ = this.findPointToLeeArray(Math.ceil(this.colliderPositionZ), map.length);
        const needPlayer = this.nearestEnemy(playersInTheRoom);
        const findObjectX = this.findPointToLeeArray(Math.ceil(needPlayer.colliderPositionX), map.width);
        const findObjectZ = this.findPointToLeeArray(Math.ceil(needPlayer.colliderPositionZ), map.length);
        const mapLength = map.length;
        const mapWidth = map.width;
        this.enemyAnimationRotation(needPlayer);

        if (this.countLee >= 100) {
            this.resultSearch = this.lee(grid, startPointX, startPointZ, findObjectX, findObjectZ, mapLength, mapWidth);
        }

        this.enemyMove(this.resultSearch, mapLength, mapWidth, grid);
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
     * Метод отвечающий за добавление динамических объектов на сетку карты
     * @param grid
     * @param enemy
     */
    dynamicGridObjects(roomData, grid) {
        const enemyArray = roomData.enemy;
        const mapWidth = roomData.map.width;
        const mapLegth = roomData.map.length;

        enemyArray.forEach((enemy) => {
            let x = this.findPointToLeeArray(enemy.colliderPositionX, mapWidth);
            let z = this.findPointToLeeArray(enemy.colliderPositionZ, mapLegth);
            if (grid[z][x] !== -2) {
                grid[z][x] = -2;
            }
            console.log(grid, x, z, 'EnemyPosition');
        });


    }

    recalculationCoordinates(oldPositionX, pldPositionZ, newPositionX, newPositionZ, grid) {
        if (grid[newPositionZ][newPositionX] !== -2) {
            grid[pldPositionZ][oldPositionX] = -1;
            grid[newPositionZ][newPositionX] = -2;
        }
    }


    /**
     * Метод создания сетки игрового поля(для определения препятствий)
     * @param mapStaticData
     * @returns {Array}
     */
    createGridMap(mapStaticData) {
        const width = mapStaticData.width;
        const length = mapStaticData.width;
        const mapElementCoordinate = [];

        for (let x = 0; x < width; x++) {
            mapElementCoordinate.push([]);
            for (let z = 0; z < width; z++) {
                mapElementCoordinate[x][z] = -1;
            }
        }


        for (let key in mapStaticData.mapElement) {
            let mapElementObject = mapStaticData.mapElement[key];
            let positionX = Math.ceil(mapElementObject.colliderPositionX + width / 2);
            let positionZ = Math.ceil(mapElementObject.colliderPositionZ + length / 2);

            let colliderWidth = Math.ceil(mapElementObject.colliderWidth / 2);
            let colliderLength = Math.ceil(mapElementObject.colliderLength / 2);

            for (let z = 1; z <= colliderLength; z++) {
                for (let x = 1; x <= colliderWidth; x++) {
                    // [positionX + x -1] [positionX + z -1] для центрирования элемента т.к 0 считаем положительным числом
                    mapElementCoordinate[positionZ - z][positionX + x - 1] = -2;
                    mapElementCoordinate[positionZ - z][positionX - x] = -2;
                    mapElementCoordinate[positionZ + z - 1][positionX + x - 1] = -2;
                    mapElementCoordinate[positionZ + z - 1][positionX - x] = -2;
                }
            }

        }


        return mapElementCoordinate;
    }

    nearestEnemy(playerArray) {

        let needPlayer = playerArray[0];

        playerArray.forEach((player) => {
            //Проверяем этот игрок вообще в зоне видимости
            if (this.nearestPlayer(player)) {
                //Сравниваем его с предыдущим игроком и смотрим кто ближе
                if (Math.abs(player.colliderPositionX) < Math.abs(needPlayer.colliderPositionX)
                    || Math.abs(player.colliderPositionZ) < Math.abs(needPlayer.colliderPositionZ)) {
                    needPlayer = player;
                }
            }
        });
        return needPlayer;
    }

    lee(grid, startPointX, startPointZ, searchPointX, searchPointZ, mapLength, mapWidth): object | boolean  // поиск пути из ячейки (ax, ay) в ячейку (bx, by)
    {

        const widthPlayingField = mapLength; // ширина рабочего поля
        const lengthPlayingField = mapWidth;// высота рабочего поля
        const wall = -2; // непроходимая ячейка
        const blank = -1; // свободная непомеченная ячейка


        let pathX = [widthPlayingField * lengthPlayingField], pathZ = [widthPlayingField * lengthPlayingField]; // координаты ячеек, входящих  путь
        let lengthPath;// длина пути


        // Перед вызовом lee() массив grid заполнен значениями WALL и BLANK

        let offsetX = [1, 0, -1, 0];   // смещения, соответствующие соседям ячейки
        let offsetZ = [0, 1, 0, -1];   // справа, снизу, слева и сверху
        let waveNumber;
        let stop;

        if (grid[startPointZ][startPointX] == wall || grid[searchPointZ][searchPointX] == wall) return false;  // ячейка (ax, ay) или (bx, by) - стена

        // распространение волны
        waveNumber = 0;
        grid[startPointZ][startPointX] = 0;            // стартовая ячейка помечена 0

        do {
            stop = true;               // предполагаем, что все свободные клетки уже помечены
            for (let z = 0; z < lengthPlayingField; ++z)
                for (let x = 0; x < widthPlayingField; ++x)
                    if (grid[z][x] == waveNumber)                         // ячейка (x, y) помечена числом d
                    {
                        for (let k = 0; k < 4; ++k)                    // проходим по всем непомеченным соседям
                        {
                            let iy = z + offsetZ[k], ix = x + offsetX[k];
                            if (iy >= 0 && iy < lengthPlayingField && ix >= 0 && ix < widthPlayingField &&
                                grid[iy][ix] == blank) {
                                stop = false;              // найдены непомеченные клетки
                                grid[iy][ix] = waveNumber + 1;      // распространяем волну
                            }
                        }
                    }
            waveNumber++;
        } while (!stop && grid[searchPointZ][searchPointX] == blank);


        if (grid[searchPointZ][searchPointX] == blank) return false;  // путь не найден

        // восстановление пути
        // восстановление пути
        lengthPath = grid[searchPointZ][searchPointX];            // длина кратчайшего пути из (ax, ay) в (bx, by)

        waveNumber = lengthPath;
        while (waveNumber > 0) {
            pathX[waveNumber] = searchPointX;
            pathZ[waveNumber] = searchPointZ;                   // записываем ячейку (x, y) в путь
            waveNumber--;
            for (let k = 0; k < 4; ++k) {
                let iy = searchPointZ + offsetZ[k], ix = searchPointX + offsetX[k];
                if (iy >= 0 && iy < lengthPlayingField && ix >= 0 && ix < widthPlayingField &&
                    grid[iy][ix] == waveNumber) {
                    searchPointX = searchPointX + offsetX[k];
                    searchPointZ = searchPointZ + offsetZ[k];           // переходим в ячейку, которая на 1 ближе к старту
                    break;
                }
            }
        }
        pathX[0] = startPointX;
        pathZ[0] = startPointZ;
        const resultSearch = {pathX, pathZ, lengthPath};
        // теперь px[0..len] и py[0..len] - координаты ячеек пути
        return resultSearch;
    }


    enemyMove(point, mapLength, mapWidth, grid) {

        let oldPositionX = this.findPointToLeeArray(Math.ceil(this.colliderPositionX), mapWidth);
        let pldPositionZ = this.findPointToLeeArray(Math.ceil(this.colliderPositionZ), mapLength);

        let newPositionX = this.findPointToLeeArray(Math.ceil(this.colliderPositionX), mapWidth);
        let newPositionZ = this.findPointToLeeArray(Math.ceil(this.colliderPositionZ), mapLength);

        if (Object.keys(point).length) {
            if (this.colliderPositionX !== point.pathX[point.lengthPath] &&
                this.colliderPositionZ !== point.pathZ[point.lengthPath]
            ) {


                if (this.countMove < point.lengthPath) {
                    if (oldPositionX < point.pathX[this.countMove]) {
                        this.colliderPositionX = this.colliderPositionX + this.moveSpeed;
                    }
                    else if (oldPositionX > point.pathX[this.countMove]) {
                        this.colliderPositionX = this.colliderPositionX - this.moveSpeed;
                    }
                    else if (pldPositionZ < point.pathZ[this.countMove]) {
                        this.colliderPositionZ = this.colliderPositionZ + this.moveSpeed;
                    }
                    else if (pldPositionZ > point.pathZ[this.countMove]) {
                        this.colliderPositionZ = this.colliderPositionZ - this.moveSpeed;
                    }
                    else {
                        this.countMove++;
                    }
                    // this.colliderPositionX = newPositionX;
                    // this.colliderPositionZ = newPositionZ;
                    //
                    // newPositionX = this.findPointToLeeArray(Math.ceil(this.colliderPositionX), mapWidth);
                    // newPositionZ = this.findPointToLeeArray(Math.ceil(this.colliderPositionZ), mapLength);
                    //
                    // this.recalculationCoordinates(oldPositionX,pldPositionZ,newPositionX,newPositionZ,grid);
                } else {
                    this.countMove = 0;
                }

            }
        }
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
                if (this.colliderPositionX > this.colliderOldPositionX) {
                    this.colliderPositionX = this.colliderOldPositionX - this.moveSpeed;
                }
                else if (this.colliderPositionX < this.colliderOldPositionX) {
                    this.colliderPositionX = this.colliderOldPositionX + this.moveSpeed;
                }
                else {
                    this.colliderPositionX = this.colliderOldPositionX + this.moveSpeed;
                }

                if (this.colliderPositionZ > this.colliderOldPositionZ) {
                    this.colliderPositionZ = this.colliderOldPositionZ - this.moveSpeed;
                }
                else if (this.colliderPositionZ < this.colliderOldPositionZ) {
                    this.colliderPositionZ = this.colliderOldPositionZ + this.moveSpeed;
                }
                else {
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

    /**
     * Вычисляем правилный размер коллайдера относительно оси y
     * @param collaider
     * @param colliderPositionY
     * @param colliderHeight
     */
    calculatingCorrectHeightCollider(colliderPositionY, colliderHeight) {
        let yPosition = colliderPositionY + colliderHeight / 2;
        return yPosition;

    }
}





