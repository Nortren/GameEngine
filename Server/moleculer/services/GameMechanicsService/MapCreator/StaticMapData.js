"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testMapJSON = {
    map: {
        src: "./Client/image/testRepeatGround.png",
        startPositionX: 0,
        startPositionY: 0,
        width: 100,
        height: 100,
        zIndex: 3,
        mapSizeX: 1000,
        mapSizeY: 1000,
        mapElement: {
            home1: {
                src: "./Client/image/home.png",
                startPositionX: 7,
                startPositionY: 0,
                startPositionZ: 3,
                width: 10,
                height: 10,
                collaid: "./Client/image/collaid.png",
                colliderPositionX: 7,
                colliderPositionY: 2,
                colliderPositionZ: 0,
                colliderWidth: 10,
                colliderHeight: 5,
                colliderLength: 3,
                zIndex: 1,
            },
            tree1: {
                src: "./Client/image/treeTest.png",
                startPositionX: -5,
                startPositionY: 0,
                startPositionZ: -5,
                width: 3,
                height: 3,
                collaid: "./Client/image/collaid.png",
                colliderPositionX: -5,
                colliderPositionY: 0,
                colliderPositionZ: -5,
                colliderWidth: 3,
                colliderHeight: 3,
                colliderLength: 1,
                zIndex: 1,
            },
        }
    },
    player: {
        src: "./Client/image/Player_v0.0.3.png",
        collaid: "./Client/image/collaid.png",
        colliderPositionX: 0,
        colliderPositionY: 0,
        colliderPositionZ: 0,
        colliderWidth: 1,
        colliderHeight: 2,
        colliderLength: 1,
        health: 100,
        damage: 2,
        attackDistance: 1,
        attackSpeed: 10
    },
    enemy: {
        src: "./Client/image/hero.png",
        collaid: "./Client/image/collaid.png",
        scope: "./Client/image/persecutionRadius.png",
        scopeRadius: 16,
        colliderPosition: {
            x: 3,
            y: 0.01,
            z: 3,
        },
        colliderWidth: 1,
        colliderHeight: 1,
        colliderLength: 1,
        pursuitZone: 60,
        persecutionRadius: "./Client/image/persecutionRadius.png",
        health: 100,
        damage: 1,
        attackDistance: 1,
        attackSpeed: 10
    }
};
//# sourceMappingURL=StaticMapData.js.map