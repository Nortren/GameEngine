"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlayerMainClass {
    constructor(id, health, damage, attackSpeed, moveSpeed, attackDistance, colliderPositionX, colliderPositionY, colliderPositionZ, colliderWidth, colliderHeight, colliderLength, sprite, collaid) {
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
        this.sprite = sprite;
        this.collaid = collaid;
    }
    create() {
    }
    changeSocketIOID() {
    }
    update(room) {
    }
    move() {
    }
    attack() {
    }
    death() {
    }
}
exports.default = PlayerMainClass;
//# sourceMappingURL=PlayerMainClass.js.map