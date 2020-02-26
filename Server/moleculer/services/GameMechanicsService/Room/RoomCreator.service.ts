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
	createRoom(userData) {
		userData = userData[0];

		let idRoom = this.roomList ? this.roomList.length + 1 : 1;
		//Создаём комнату того типа где последний раз был пользователь
		let typeRoom = userData.lastRoomType;
		let numberPlaces = 3;

		let room = new Room(idRoom, typeRoom, numberPlaces, 0);

		//Занимаем место увеличивая счетчик занятых мест
		room.setPlayersList(userData);


		this.roomList.push(room);
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

				return room.type === userData[0].lastRoomType;
			});

		}

		//Выбираем первую комнату где есть свободные места
		//TODO игрок может быть из этой комнаты но список будет переполнен(при вылете игрока)
		let freeRoom = userSuitableRooms.filter((item) => {
			return item.numberPlaces > item.numberTakePlaces;
		});

		//Есть ли такие комнаты
		if (freeRoom.length) {

			//Занимаем место увеличивая счетчик занятых мест
			freeRoom[0].setPlayersList(userData[0]);

		}
		//Создаём новую комнату такого типа
		else {
			this.createRoom(userData);
		}
		console.log(this.roomList, 'this.roomList');


		return new Promise((resolve, reject) => {
			//Создаём аватар игрока
			promises.push(this.addPlayerToRoom(resolveData, ctx));
			//Получаем данные карты
			promises.push(this.addMapToRoom(resolveData));
			//Добавляем противников в комнату
			promises.push(this.addEnemyToRoom(resolveData));

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
	addPlayerToRoom(resolveData, ctx) {
		return this.broker.call("DB.getPlayerData").then(result => {
				result.id = ctx.params;
				this.broker.call("PlayerController.createPlayer", result).then(
					result => {
						console.log('Создать игрока')
					},
					error => {
						console.log('Ошибка при попытке создать игрока')
					}
				);


				resolveData.player = result;
			},
			error => {
				console.log('ошибка получения данных о игроке из БД')
			})
	}

	/**
	 * Добовляем данные по карте на основе которых будет строится статика в комнате
	 * @param resolveData
	 */
	async addMapToRoom(resolveData) {
		try {
			resolveData.map = await this.broker.call("DB.getMapData");
		}
		catch (e) {
			console.log('ошибка получения данных о карте из БД', e)
		}

	}

	/**
	 * Добавляем противников на карту
	 * @param resolveData
	 */
	async addEnemyToRoom(resolveData) {
		try {
			resolveData.enemy = await this.broker.call("DB.getEnemyData");
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
