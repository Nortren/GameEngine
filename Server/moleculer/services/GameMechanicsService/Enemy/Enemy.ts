export default class Enemy {
    id: string;
    src: string;
    collaid: string;
    scope: string;
    scopeRadius: number;
    colliderWidth: number;
    colliderHeight: number;
    colliderLength: number;
    pursuitZone: number;
    persecutionRadius: string;
    health: number;
    damage: number;
    attackDistance: number;
    attackSpeed: number;
    colliderPositionX: number;
    colliderPositionY: number;
    colliderPositionZ: number;

    constructor(id: string,
                src: string,
                collaid: string,
                scope: string,
                scopeRadius: number,
                colliderPositionX: number,
                colliderPositionY: number,
                colliderPositionZ: number,
                colliderWidth: number,
                colliderHeight: number,
                colliderLength: number,
                pursuitZone: number,
                persecutionRadius: string,
                health: number,
                damage: number,
                attackDistance: number,
                attackSpeed: number) {

        this.id = id;
        this.src = src;
        this.collaid = collaid;
        this.scope = scope;
        this.scopeRadius = scopeRadius;
        this.colliderPositionX = colliderPositionX;
        this.colliderPositionY = colliderPositionY;
        this.colliderPositionZ = colliderPositionZ;
        this.colliderWidth = colliderWidth;
        this.colliderHeight = colliderHeight;
        this.colliderLength = colliderLength;
        this.pursuitZone = pursuitZone;
        this.persecutionRadius = persecutionRadius;
        this.health = health;
        this.damage = damage;
        this.attackDistance = attackDistance;
        this.attackSpeed = attackSpeed;


    }

    create() {


    }

    update(newData: Array<object>, oldData: Array<object>) {

    }

    move(data) {
        this.colliderPositionX = this.colliderPositionX + 1;
    }

    attack() {

    }

    death() {

    }

}





