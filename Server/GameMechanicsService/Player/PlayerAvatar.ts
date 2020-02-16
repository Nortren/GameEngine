import PlayerMainClass from "./PlayerMainClass";
export default class Player extends PlayerMainClass {

    userSetting: object;

    constructor(id: number, health: number, damage: number, attackSpeed: number, moveSpeed: number, attackDistance: number) {
        super(id, health, damage, attackSpeed, moveSpeed, attackDistance);

        this.userSetting={
            id,
            health,
            damage,
            attackSpeed,
            moveSpeed,
            attackDistance
        }

    }

    create() {


    }

    update(newData:Array<object>,oldData:Array<object>) {

    }

    move() {

    }

    attack() {

    }

    death() {

    }

}





