export const MapJSON = {
//Числа должны быть кратны двум иначе будет построено на одну дополнительную точку больше
    map: {
        src: "./Client/image/square-border.png",
        startPositionX: 0,
        startPositionY: 0,
        width: 30,
        height: 0,
        length: 30,
        zIndex: 3,
        mapSizeX: 1000,
        mapSizeY: 1000,
        mapElement: {
            home1: {
                src: "./Client/image/home.png",
                startPositionX: 0,
                startPositionY: 0,
                startPositionZ: 0,
                width: 10,
                height: 10,
                collaid: "./Client/image/collaid.png",
                colliderPositionX: 5,
                colliderPositionY: 0,
                colliderPositionZ: -5,
                colliderWidth: 4,
                colliderHeight: 1,
                colliderLength: 4,
                zIndex: 1,
            },
            // tree1: {
            //     src: "./Client/image/treeTest.png",
            //     startPositionX: 0,
            //     startPositionY: 0,
            //     startPositionZ: 0,
            //     width: 3,
            //     height: 3,
            //     collaid: "./Client/image/collaid.png",
            //     colliderPositionX: -4,
            //     colliderPositionY: 0,
            //     colliderPositionZ: -6,
            //     colliderWidth: 10,
            //     colliderHeight: 1,
            //     colliderLength: 2,
            //     zIndex: 1,
            // }
            // ,
            // tree3: {
            //     src: "./Client/image/treeTest.png",
            //     startPositionX: 0,
            //     startPositionY: 0,
            //     startPositionZ: 0,
            //     width: 6,
            //     height: 6,
            //     collaid: "./Client/image/collaid.png",
            //     colliderPositionX: 0,
            //     colliderPositionY: 0,
            //     colliderPositionZ: 4,
            //     colliderWidth: 10,
            //     colliderHeight: 1,
            //     colliderLength: 2,
            //     zIndex: 1,
            // }
/*            ,
            tree4: {
                src: "./Client/image/treeTest.png",
                startPositionX: 0,
                startPositionY: 0,
                startPositionZ: 0,
                width: 6,
                height: 6,
                collaid: "./Client/image/collaid.png",
                colliderPositionX: -8,
                colliderPositionY: 0,
                colliderPositionZ: 4,
                colliderWidth: 2,
                colliderHeight: 1,
                colliderLength: 12,
                zIndex: 1,
            }*/
        },
        enemyOnMap: [
            {
                typeEnemy: 'enemy1',
                count: 1,
                startPoint: {x:-20,y:0,z:10},
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
