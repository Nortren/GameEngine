import Enemy from "../Enemy/Enemy";
const Service = require("moleculer").Service;
import Room from './Room';

class RoomCreator extends Service {
    roomList: Array<object> = [];

    constructor(broker) {

        super(broker);
        this.parseServiceSchema({
            name: "RoomCreator",
            // version: "v2",
            meta: {
                scalable: true
            },
            settings: {
                upperCase: true,
            },
            actions: {
                getRoomList: this.getRoomList,
                getRoom: this.getRoom,
            },
            events: {},
            created: this.serviceCreated,
            started: this.serviceStarted,
            stopped: this.serviceStopped,
        });
    }

    getRoomList(ctx) {
    }

    /**
     * Создание новой комнаты и наполнение ее контентом по шаблону
     * @param userData
     */
    createRoom(userData, resolveData) {


        let idRoom = this.roomList ? this.roomList.length + 1 : 1;
        //Создаём комнату того типа где последний раз был пользователь
        let typeRoom = userData.lastRoomType;
        let numberPlaces = 3;
        //Дожидаемся получения карты
        // из базы
        this.addMapToRoom(typeRoom).then((map) => {

            this.addEnemyToRoom(map).then((enemy) => {
                this.addPlayerToRoom(userData).then((player) => {

                    let room = new Room(idRoom, typeRoom, numberPlaces, 0, map, enemy);
console.log(player,'CREATE');
                    //Занимаем место увеличивая счетчик занятых мест
                    room.setPlayersList(player);
                    this.roomList.push(room);

                });
            });

        });

    }

    async getRoom(ctx) {
        const promises = [];
        let resolveData = {};
        let userSuitableRooms = null;
        //Получаем данные по игроку
        let userData = await this.broker.call("DB.getUserData", ctx.params);

        //проверяем есть ли комната подобного типа в которой последний раз был игрок
        if (this.roomList && userData) {

            userSuitableRooms = this.roomList.filter((room) => {

                return room.type === userData.lastRoomType;
            });

        }

        //Выбираем первую комнату где есть свободные места
        //TODO игрок может быть из этой комнаты но список будет переполнен(при вылете игрока)
        let freeRoom = userSuitableRooms.filter((item) => {
            return item.numberPlaces > item.numberTakePlaces;
        });

        //Есть ли такие комнаты
        if (freeRoom.length) {
            this.addPlayerToRoom(userData).then((player) => {
                console.log(player,'ADD');

                //Занимаем место увеличивая счетчик занятых мест
                freeRoom[0].setPlayersList(player);


            });


        }
        //Создаём новую комнату такого типа
        else {
            this.createRoom(userData, resolveData);
        }
        console.log(this.roomList);
        return new Promise((resolve, reject) => {
            //Создаём аватар игрока
            // promises.push(this.addPlayerToRoom(resolveData, ctx));
            //Получаем данные карты
            // promises.push(this.addMapToRoom(resolveData));
            //Добавляем противников в комнату
            // promises.push(this.addEnemyToRoom(resolveData));

            Promise.all(promises).then(() => {
                resolve(resolveData);
            });
        });
    }

    /**
     * Добовляем игрока в комнату
     * @param resolveData массив в который мы собираем данный прежде чем отдать клиенту
     * @param ctx опции переданные через action сервису
     */
    addPlayerToRoom(playerData) {

        //Получаем данные игрока (id, инвентарь,последнее месторасположение и т.д) из базы
        return this.broker.call("DB.getPlayerData", playerData).then(result => {

                const playerID = playerData.id;
                return this.broker.call("PlayerController.createPlayer", {playerID, result}).then(
                    player => {

                        console.log('Создать игрока ');

                        return player;
                    },
                    error => {
                        console.log('Ошибка при попытке создать игрока ')
                    }
                );

            },
            error => {
                console.log('ошибка получения данных о игроке из БД')
            })
    }

    /**
     * Добовляем данные по карте на основе которых будет строится статика в комнате
     * @param resolveData
     */
    async addMapToRoom(typeRoom) {
        try {
            return await this.broker.call("DB.getMapData", typeRoom);
        }
        catch (e) {
            console.log('ошибка получения данных о карте из БД', e)
        }
    }


    /**
     * Добавляем противников на карту
     */
    async addEnemyToRoom(map) {
        try {
            //Масси противников которые будут присутствовать на карте
            const roomEnemyArray = [];

            //Получаем данные о конкретном типе противника из БД
            return await this.broker.call("DB.getEnemyData", map.enemyOnMap).then((enemyMap) => {

                // console.log(enemyMap, 'enemyTypeATestCreate');
                map.enemyOnMap.forEach((enemy) => {

                    //Генерируем необходимое количество противников заданного типа
                    for (let i = 0; i < enemy.count; i++) {

                        //добавляем в массив противников на карте
                        let enemyID = enemy.typeEnemy + '_' + (i + 1);
                        roomEnemyArray.push(new Enemy(
                            this.id = enemyID,
                            this.src = enemyMap.get(enemy.typeEnemy).src,
                            this.collaid = enemyMap.get(enemy.typeEnemy).collaid,
                            this.scope = enemyMap.get(enemy.typeEnemy).scope,
                            this.scopeRadius = enemyMap.get(enemy.typeEnemy).scopeRadius,
                            //TODO сейчас пока реализовал самый простой способ размещение врагов на карте без учета колайдов зданий и других игроков
                            this.colliderPosition = {
                                x: (enemy.startPoint.x + enemy.distanceBetweenEnemies * i),
                                y: 0.01,
                                z: (enemy.startPoint.z + enemy.distanceBetweenEnemies * i)
                            },
                            this.colliderWidth = enemyMap.get(enemy.typeEnemy).colliderWidth,
                            this.colliderHeight = enemyMap.get(enemy.typeEnemy).colliderHeight,
                            this.colliderLength = enemyMap.get(enemy.typeEnemy).colliderLength,
                            this.pursuitZone = enemyMap.get(enemy.typeEnemy).pursuitZone,
                            this.persecutionRadius = enemyMap.get(enemy.typeEnemy).persecutionRadius,
                            this.health = enemyMap.get(enemy.typeEnemy).health,
                            this.damage = enemyMap.get(enemy.typeEnemy).damage,
                            this.attackDistance = enemyMap.get(enemy.typeEnemy).attackDistance,
                            this.attackSpeed = enemyMap.get(enemy.typeEnemy).attackSpeed
                        ));
                    }


                });
                return roomEnemyArray;
            });
            // console.log(mapEnemyArray, 'mapEnemyArray');
            // map.enemy

        } catch (e) {
            console.log('ошибка получения данных о противнике из БД', e)
        }
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

module.exports = RoomCreator;
