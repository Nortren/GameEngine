interface BasicProperty {
	id: number;
	type: string;
	numberPlaces: number;
	numberTakePlaces: number;
	playersInTheRoom: Array<object>;
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


	constructor(id: number, type: string, numberPlaces: number, numberTakePlaces: number) {
		this.id = id;
		this.numberPlaces = numberPlaces;
		this.numberTakePlaces = numberTakePlaces;
		this.type = type;
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

	setPlayersList(player: object) {
		let isTherePlayer = [];
		if(this.playersInTheRoom) {
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





