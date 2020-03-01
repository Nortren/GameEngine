"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PlayerMainClass_1 = require("./PlayerMainClass");
class Player extends PlayerMainClass_1.default {
    constructor(id, health, damage, attackSpeed, moveSpeed, attackDistance) {
        super(id, health, damage, attackSpeed, moveSpeed, attackDistance);
        this.userSetting = {
            id,
            health,
            damage,
            attackSpeed,
            moveSpeed,
            attackDistance
        };
    }
    create() {
    }
    update(newData, oldData) {
    }
    move() {
    }
    attack() {
    }
    death() {
    }
}
exports.default = Player;
//# sourceMappingURL=PlayerAvatar.js.map