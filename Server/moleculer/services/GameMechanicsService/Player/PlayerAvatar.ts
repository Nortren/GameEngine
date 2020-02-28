import PlayerMainClass from "./PlayerMainClass";
export default class PlayerAvatar extends PlayerMainClass {


    constructor(id: number, health: number, damage: number, attackSpeed: number, moveSpeed: number, attackDistance: number) {
        super(id, health, damage, attackSpeed, moveSpeed, attackDistance);

        this.id = id;
        this.health = health;
        this.damage = damage;
        this.attackSpeed = attackSpeed;
        this.moveSpeed = moveSpeed;
        this.attackDistance = attackDistance;


    }

    create() {


    }

    update(newData: Array<object>, oldData: Array<object>) {

    }

    move() {

    }

    attack() {

    }

    death() {

    }

}





