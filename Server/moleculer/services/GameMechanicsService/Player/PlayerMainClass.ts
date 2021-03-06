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
    moveDirection: string;
    attackStatus: boolean;
    moveContinue: boolean;
    clientSocketIOID: string;

    create();

    update(room);

    move();

    attack();

    death();

    changeSocketIOID();
}

interface ISprite {
    src: string,
    numberOfFramesX: number,
    numberOfFramesY: number,
    firstFrameMove: number,
    lastFrameMove: number,
    firstFrameAttack: number,
    lastFrameAttack: number,
    firstFrameDeath: number,
    lastFrameDeath: number,
}

export default class PlayerMainClass implements BasicProperty {

    health: number;
    damage: number;
    attackSpeed: number;
    moveSpeed: number;
    attackDistance: number;
    id: number;
    name: string;

    colliderPositionX: number;
    colliderPositionY: number;
    colliderPositionZ: number;
    colliderWidth: number;
    colliderHeight: number;
    colliderLength: number;
    sprite: ISprite;
    collaid: string;
    moveDirection: string;
    attackStatus: boolean;
    moveContinue: boolean;
    clientSocketIOID: string;

    constructor(id: number,name:string, health: number, damage: number,
                attackSpeed: number, moveSpeed: number, attackDistance: number,
                colliderPositionX: number, colliderPositionY: number, colliderPositionZ: number,
                colliderWidth: number, colliderHeight: number, colliderLength: number,
                sprite: ISprite, collaid: string) {
        this.id = id;
        this.name = name;
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
        this.sprite = sprite;
        this.collaid = collaid;
    }

    create() {

    }

    changeSocketIOID() {

    }

    update(room): void {

    }

    move() {

    }

    attack() {

    }

    death() {

    }

}





