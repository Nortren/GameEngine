interface BasicProperty {
    id: number;
    health: number;
    damage: number;
    attackSpeed: number;
    moveSpeed: number;
    attackDistance: number;
    create();
    update();
    move();
    attack();
    death();
}

export default class PlayerMainClass implements BasicProperty {

    health: number;
    damage: number;
    attackSpeed: number;
    moveSpeed: number;
    attackDistance: number;
    id: number;

    constructor(id: number, health: number, damage: number, attackSpeed: number, moveSpeed: number, attackDistance: number) {
        this.id = id;
        this.health = health;
        this.damage = damage;
        this.attackSpeed = attackSpeed;
        this.moveSpeed = moveSpeed;
        this.attackDistance = attackDistance;
    }

    create() {

    }

    update() {

    }

    move() {

    }

    attack() {

    }

    death() {

    }

}





