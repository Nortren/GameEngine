import Enemy from "../Enemy/Enemy";
const Service = require("moleculer").Service;
import Room from './Room';
import {BrokerNode} from "moleculer";

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

        if(this.roomList.length && !this.roomList[0].enemy.length){

            const enemy = this.addEnemyToRoom(this.roomList[0].map).then((itemEnemy)=>{
                this.roomList[0].addEnemyInRoom(itemEnemy);
            });


        }


        return this.roomList;

    }

    /**
     * Создание новой комнаты и наполнение ее контентом по шаблону
     * @param userData
     */
    async createRoom(userData): Promise<void> {
        const idRoom = this.roomList ? this.roomList.length + 1 : 1;
        //Создаём комнату того типа где последний раз был пользователь
        const typeRoom = userData.lastRoomType;
        const numberPlaces = 3;
        //Дожидаемся получения карты  из базы

        const map = await this.addMapToRoom(typeRoom);
        const enemy = await this.addEnemyToRoom(map);
        const player = await this.addPlayerToRoom(userData);
        const room = new Room(idRoom, typeRoom, numberPlaces, 0, map, enemy);
        //Занимаем место увеличивая счетчик занятых мест
        room.setPlayersList(player);
        this.roomList.push(room);
    }

    async getRoom(ctx: BrokerNode) {
        let userRoom;
        let userSuitableRooms = null;
        //Получаем данные по игроку
        const userData = await this.broker.call("DB.getUserData", ctx.params);

        //проверяем есть ли комната подобного типа в которой последний раз был игрок
        if (this.roomList && userData) {
            userSuitableRooms = this.roomList.filter((room) => {
                return room.type === userData.lastRoomType;
            });
        }

        //проверяем есть ли игрок в одной из комнат подобного типа(если вдруг он вышел или перезалогинился)
        const userInThisRoom = userSuitableRooms.filter((room) => {

            return !!room.getPlayerInRoom(userData).length;

        });


        //Выбираем первую комнату где есть свободные места
        let freeRoom = [];
        if (!userInThisRoom.length) {
            freeRoom = userSuitableRooms.filter((item) => {
                return item.numberPlaces > item.numberTakePlaces;
            });

            //Есть ли такие комнаты
            if (freeRoom.length) {
                const player = await this.addPlayerToRoom(userData);
                freeRoom[0].setPlayersList(player);
            }
            //Создаём новую комнату такого типа
            else {
                await this.createRoom(userData);
            }
        }
        //Получаем комнату где находится пользователь
        this.roomList.forEach((room) => {
            if (room.getPlayerInRoom(userData).length) {
                userRoom = room;
            }
        });

        return userRoom;
    }

    //TODO ненадо передавать все данные игрока только id
    /**
     * Добовляем игрока в комнату
     * @param playerData данные аккаунта игрока
     *
     */
    async addPlayerToRoom(playerData: object) {
        try {
            //Получаем данные игрока (id, инвентарь,последнее месторасположение и т.д) из базы
            const playerDBData = await this.broker.call("DB.getPlayerData", playerData);
            const playerID = playerData.id;
            const player = await this.broker.call("PlayerController.createPlayer", {playerID, playerDBData});
            return player;
        } catch (e) {
            console.log('Ошибка при попытке создать игрока ', e);
        }
    }

    async removePlayerToRoom(playerData: object) {
        try {
            //Получаем данные игрока (id, инвентарь,последнее месторасположение и т.д) из базы
            const playerDBData = await this.broker.call("DB.getPlayerData", playerData);
            const playerID = playerData.id;
            const player = await this.broker.call("PlayerController.createPlayer", {playerID, playerDBData});
            return player;
        } catch (e) {
            console.log('Ошибка при попытке создать игрока ', e);
        }
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
            //Массив противников которые будут присутствовать на карте
            const roomEnemyArray = [];
            //Получаем данные о конкретном типе противника из БД
            const enemyMap = await this.broker.call("DB.getEnemyData", map.enemyOnMap);
            map.enemyOnMap.forEach((enemy) => {
                //Генерируем необходимое количество противников заданного типа
                for (let i = 0; i < enemy.count; i++) {
                    //добавляем в массив противников на карте
                    let enemyID = enemy.typeEnemy + '_' + (i + 1);
                    roomEnemyArray.push(new Enemy(
                        this.id = enemyID,
                        this.sprite = enemyMap.get(enemy.typeEnemy).sprite,
                        this.collaid = enemyMap.get(enemy.typeEnemy).collaid,
                        this.scope = enemyMap.get(enemy.typeEnemy).scope,
                        this.scopeRadius = enemyMap.get(enemy.typeEnemy).scopeRadius,
                        this.colliderPositionX = enemy.startPoint.x,
                        this.colliderPositionY = enemy.startPoint.y,
                        this.colliderPositionZ = enemy.startPoint.z,
                        this.colliderWidth = enemyMap.get(enemy.typeEnemy).colliderWidth,
                        this.colliderHeight = enemyMap.get(enemy.typeEnemy).colliderHeight,
                        this.colliderLength = enemyMap.get(enemy.typeEnemy).colliderLength,
                        this.pursuitZone = enemyMap.get(enemy.typeEnemy).pursuitZone,
                        this.persecutionRadius = enemyMap.get(enemy.typeEnemy).persecutionRadius,
                        this.health = enemyMap.get(enemy.typeEnemy).health,
                        this.damage = enemyMap.get(enemy.typeEnemy).damage,
                        this.attackDistance = enemyMap.get(enemy.typeEnemy).attackDistance,
                        this.attackSpeed = enemyMap.get(enemy.typeEnemy).attackSpeed,
                        this.moveSpeed = enemyMap.get(enemy.typeEnemy).moveSpeed
                    ));
                }
            });
            return roomEnemyArray;
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
