interface BasicProperty {
    id: number;
    name: string;
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
    name: string;
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

    /**
     * Удаляем игрока из комнаты по заданному ID
     * @param playerID
     */
    removePlayerInRoom(playerID) {
        this.playersInTheRoom.forEach((item, i) => {
            if (item.id === playerID) {
                this.playersInTheRoom.splice(i, 1)
            }
        });
        this.setNumberTakePlaces(this.getNumberTakePlaces() - 1);

        return this.playersInTheRoom;
    }

    /**
     * Удаляем бота из комнаты по заданному ID
     * @param enemyID
     */
    removeEnemyInRoom(enemyID) {
        if (this.enemy.length) {
            this.enemy.forEach((item, i) => {
                if (item.id === enemyID) {
                    this.enemy.splice(i, 1)
                }
            });
        }
        return this.enemy;
    }


    /**
     * Добавляем бота в комнаты по заданному ID
     * @param enemyID
     */
    addEnemyInRoom(enemy) {
        this.enemy = enemy;
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

    /**
     * обновляемсостояние комнаты (всех сущностей нахоядихся в комнате)
     */
    //TODO пока обновляемсостояние только врагов на каждый тик сервера
    updateRoomState() {

        const room = this;
        if (this.enemy.length) {
            this.enemy.forEach((enemy) => {
                enemy.update(room);
            });
        }
        this.playersInTheRoom.forEach((playerAvatar) => {
            playerAvatar.update(room);
        })

    }


}





