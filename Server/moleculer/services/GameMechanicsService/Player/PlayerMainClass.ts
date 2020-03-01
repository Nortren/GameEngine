interface BasicProperty {
    id: number;
    health: number;
    damage: number;
    attackSpeed: number;
    moveSpeed: number;
    attackDistance: number;
    colliderPositionX: number;
    colliderPositionY: number;
    colliderPositionZ: number;
    colliderWidth: number;
    colliderHeight: number;
    colliderLength: number;
    src: string;
    collaid: string;
    clientSocketIOID: string;
    create();
    update();
    move();
    attack();
    death();
    changeSocketIOID();
}

export default class PlayerMainClass implements BasicProperty {

    health: number;
    damage: number;
    attackSpeed: number;
    moveSpeed: number;
    attackDistance: number;
    id: number;

    colliderPositionX: number;
    colliderPositionY: number;
    colliderPositionZ: number;
    colliderWidth: number;
    colliderHeight: number;
    colliderLength: number;
    src: string;
    collaid: string;
    clientSocketIOID: string;

    constructor(id: number, health: number, damage: number,
                attackSpeed: number, moveSpeed: number, attackDistance: number,
                colliderPositionX: number, colliderPositionY: number, colliderPositionZ: number,
                colliderWidth: number, colliderHeight: number, colliderLength: number,
                src: string, collaid: string) {
        this.id = id;
        this.health = health;
        this.damage = damage;
        this.attackSpeed = attackSpeed;
        this.moveSpeed = moveSpeed;
        this.attackDistance = attackDistance;

        this.colliderPositionX = colliderPositionX;
        this.colliderPositionY = colliderPositionY;
        this.colliderPositionZ = colliderPositionZ;
        this.colliderWidth = colliderWidth;
        this.colliderHeight = colliderHeight;
        this.colliderLength = colliderLength;
        this.src = src;
        this.collaid = collaid;
    }

    create() {

    }
    changeSocketIOID(){

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





