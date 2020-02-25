const Service = require("moleculer").Service;

class RoomCreator extends Service {
	roomList: Array<object>;

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
				createRoom: this.createRoom,
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

	createRoom(ctx) {

	}

	getRoom(ctx) {
		console.log('Start Room');
		const promises = [];
		let resolveData = {};


		return new Promise((resolve, reject) => {
			console.log(ctx.params, 'Создаём аватар игрока');
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
		console.log(ctx.params, 'Создаём аватар игрока1111');
		return this.broker.call("DB.getPlayerData").then(result => {
				result.id = ctx.params;
				this.broker.call("PlayerController.createPlayer", result).then(
					result => {
						console.log('Создать игрока', result)
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
	addMapToRoom(resolveData) {
		this.broker.call("DB.getMapData").then(result => {
				resolveData.map = result;
			},
			error => {
				console.log('ошибка получения данных о карте из БД')
			})
	}

	/**
	 * Добавляем противников на карту
	 * @param resolveData
	 */
	addEnemyToRoom(resolveData) {
		this.broker.call("DB.getEnemyData").then(result => {
				resolveData.enemy = result;
			},
			error => {
				console.log('ошибка получения данных о противнике из БД')
			})
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
