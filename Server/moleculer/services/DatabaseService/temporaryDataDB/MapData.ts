export const MapJSON = {
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
/*            home1: {
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
            },*/
            /*    tree2: {
             src: "./Client/image/treeTest.png",
             startPositionX: 0,
             startPositionY: 0,
             startPositionZ: -8,
             width: 5,
             height: 5,
             collaid: "./Client/image/collaid.png",
             colliderPositionX: 0,
             colliderPositionY: 0.01,
             colliderPositionZ: -8,
             colliderWidth: 0.5,
             colliderHeight: 0.5,
             zIndex: 1,
             },
             */
        }

    },
    testRoom: {
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
                startPositionX: 70,
                startPositionY: 0,
                startPositionZ: 3,
                width: 10,
                height: 10,
                collaid: "./Client/image/collaid.png",
                colliderPositionX: 3,
                colliderPositionY: 0,
                colliderPositionZ: 2,
                colliderWidth: 0.5,
                colliderHeight: 0.5,
                colliderLength: 5,
                zIndex: 1,
            },
            tree1: {
                src: "./Client/image/treeTest.png",
                startPositionX: -3,
                startPositionY: 0,
                startPositionZ: 0,
                width: 3,
                height: 3,
                collaid: "./Client/image/collaid.png",
                colliderPositionX: -3,
                colliderPositionY: 0,
                colliderPositionZ: 0,
                colliderWidth: 5,
                colliderHeight: 0.5,
                colliderLength: 0.5,
                zIndex: 1,
            }
        },
        enemyOnMap: [
            {
                typeEnemy: 'enemy1',
                count: 1,
                startPoint: {x:-10,y:0,z:0},
                distanceBetweenEnemies: 1
            },
            {
                typeEnemy: 'enemy2',
                count: 0,
                startPoint:{x:40,y:0,z:0},
                distanceBetweenEnemies: 2
            },
            {
                typeEnemy: 'enemy3',
                count: 0,
                startPoint: {x:0,y:0,z:-40},
                distanceBetweenEnemies: 0.5
            },
            {
                typeEnemy: 'enemy4',
                count: 0,
                startPoint: {x:0,y:0,z:40},
                distanceBetweenEnemies: 0.5
            },
        ]

    },

};
