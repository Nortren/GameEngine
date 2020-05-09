export const NPCJson = {
    enemy1: {
        sprite: {
            src: "./Client/image/Player_v0_0_4.png",
            numberOfFramesX: 17,
            numberOfFramesY: 14,
            firstFrameMove: 2,
            lastFrameMove: 9,
            frameMoveUp: 1,
            frameMoveUpRight: 3,
            frameMoveUpLeft: 31,

            frameMoveDown: 17,
            frameMoveDownRight: 14,
            frameMoveDownLeft: 20,
            //Нам нужен реверс кадра в клиенте у нас выставленна опция THREE.MirroredRepeatWrapping которая делает зеркальное отражения и нам просто нужно посчитать номер кадра по зеркалу
            frameMoveLeft: 27,
            frameMoveRight: 9,
            firstFrameAttack: 10,
            lastFrameAttack: 11,
            firstFrameDeath: 0,
            //Тут надо перемещать по X а Y остаётся прежним
            lastFrameDeathX: 8,
        },
        collaid: "./Client/image/collaid.png",
        scope: "./Client/image/scope_circle.png",
        scopeRadius: 10,

        colliderPosition: {
            x: 0,
            y: 0.01,
            z: 0,
        },
        colliderWidth: 1,
        colliderHeight: 1,
        colliderLength: 1,
        pursuitZone: 60,
        persecutionRadius: "./Client/image/scope_circle.png",
        health: 10,
        damage: 1,
        attackDistance: 10,
        attackSpeed: 10,
        moveSpeed: 0.1
    },
    enemy2: {
        sprite: {
            src: "./Client/image/Player_v0_0_4.png",
            numberOfFramesX: 17,
            numberOfFramesY: 14,
            firstFrameMove: 2,
            lastFrameMove: 9,
            frameMoveUp: 1,
            frameMoveUpRight: 3,
            frameMoveUpLeft: 31,

            frameMoveDown: 17,
            frameMoveDownRight: 14,
            frameMoveDownLeft: 20,
            //Нам нужен реверс кадра в клиенте у нас выставленна опция THREE.MirroredRepeatWrapping которая делает зеркальное отражения и нам просто нужно посчитать номер кадра по зеркалу
            frameMoveLeft: 27,
            frameMoveRight: 9,
            firstFrameAttack: 10,
            lastFrameAttack: 11,
            firstFrameDeath: 0,
            //Тут надо перемещать по X а Y остаётся прежним
            lastFrameDeathX: 8,
        },
        collaid: "./Client/image/collaid.png",
        scope: "./Client/image/scope_circle.png",
        scopeRadius: 17,

        colliderPosition: {
            x: 3,
            y: 0.01,
            z: 3,
        },
        colliderWidth: 1,
        colliderHeight: 1,
        colliderLength: 1,
        pursuitZone: 60,
        persecutionRadius: "./Client/image/scope_circle.png",
        health: 10,
        damage: 1,
        attackDistance: 10,
        attackSpeed: 10,
        moveSpeed: 0.1
    },
    enemy3: {
        sprite: {
            src: "./Client/image/Player_v0_0_4.png",
            numberOfFramesX: 17,
            numberOfFramesY: 14,
            firstFrameMove: 2,
            lastFrameMove: 9,
            frameMoveUp: 1,
            frameMoveUpRight: 3,
            frameMoveUpLeft: 31,

            frameMoveDown: 17,
            frameMoveDownRight: 14,
            frameMoveDownLeft: 20,
            //Нам нужен реверс кадра в клиенте у нас выставленна опция THREE.MirroredRepeatWrapping которая делает зеркальное отражения и нам просто нужно посчитать номер кадра по зеркалу
            frameMoveLeft: 27,
            frameMoveRight: 9,
            firstFrameAttack: 10,
            lastFrameAttack: 11,
            firstFrameDeath: 0,
            //Тут надо перемещать по X а Y остаётся прежним
            lastFrameDeathX: 8,
        },
        collaid: "./Client/image/collaid.png",
        scope: "./Client/image/scope_circle.png",
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
        persecutionRadius: "./Client/image/scope_circle.png",
        health: 100,
        damage: 1,
        attackDistance: 10,
        attackSpeed: 10,
        moveSpeed: 0.1
    }, enemy4: {
        sprite: {
            src: "./Client/image/Player_v0_0_4.png",
            numberOfFramesX: 17,
            numberOfFramesY: 14,
            firstFrameMove: 2,
            lastFrameMove: 9,
            frameMoveUp: 1,
            frameMoveUpRight: 3,
            frameMoveUpLeft: 31,

            frameMoveDown: 17,
            frameMoveDownRight: 14,
            frameMoveDownLeft: 20,
            //Нам нужен реверс кадра в клиенте у нас выставленна опция THREE.MirroredRepeatWrapping которая делает зеркальное отражения и нам просто нужно посчитать номер кадра по зеркалу
            frameMoveLeft: 27,
            frameMoveRight: 9,
            firstFrameAttack: 10,
            lastFrameAttack: 11,
            firstFrameDeath: 0,
            //Тут надо перемещать по X а Y остаётся прежним
            lastFrameDeathX: 8,
        },
        collaid: "./Client/image/collaid.png",
        scope: "./Client/image/scope_circle.png",
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
        persecutionRadius: "./Client/image/scope_circle.png",
        health: 100,
        damage: 1,
        attackDistance: 10,
        attackSpeed: 10,
        moveSpeed: 0.1
    },
};
