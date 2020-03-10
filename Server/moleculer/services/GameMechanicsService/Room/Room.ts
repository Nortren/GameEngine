interface BasicProperty {
	id: number;
	type: string;
	numberPlaces: number;
	numberTakePlaces: number;
	playersInTheRoom: Array<object>;
	map: object;
	enemy: Array<object>;
}

/**
 * Базовый класс создания комнаты
 */
export default class Room implements BasicProperty {

	id: number;
	type: string;
	numberPlaces: number;
	numberTakePlaces: number;
	playersInTheRoom: Array<object> = [];
	map: object;
	enemy: Array<object>;

	constructor(id: number, type: string, numberPlaces: number, numberTakePlaces: number, map: object, enemy: Array<object>) {
		this.id = id;
		this.numberPlaces = numberPlaces;
		this.numberTakePlaces = numberTakePlaces;
		this.type = type;
		this.map = map;
		this.enemy = enemy;
	}

	getNumberPlaces() {
		return this.numberPlaces;
	}

	setNumberPlaces(count: number) {
		this.numberPlaces = count;
	}

	getNumberTakePlaces() {
		return this.numberTakePlaces;
	}

	setNumberTakePlaces(count: number) {
		this.numberTakePlaces = count;
	}

	getPlayersList() {
		return this.playersInTheRoom;
	}

	getPlayerInRoom(player) {

		return this.playersInTheRoom.filter((playerInRoom) => {
			return playerInRoom.id === player.id;
		});
		// return this.playersInTheRoom;
	}

	removePlayerInRoom(playerID) {
		this.playersInTheRoom.forEach((item, i) => {
			if (item.id === playerID) {
				this.playersInTheRoom.splice(i, 1)
			}
		});
		this.setNumberTakePlaces(this.getNumberTakePlaces() - 1);
		console.log(this.playersInTheRoom);
		return this.playersInTheRoom;
	}


	setPlayersList(player: object) {

		let isTherePlayer = [];
		if (this.playersInTheRoom) {
			isTherePlayer = this.playersInTheRoom.filter(playerInList => {

				return player.id === playerInList.id;
			});
		}

		if (isTherePlayer.length === 0) {

			this.playersInTheRoom.push(player);
			this.setNumberTakePlaces(this.getNumberTakePlaces() + 1);
		}
	}


}





