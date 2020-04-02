export const MapJSON = {

    map: {
        src: "./Client/image/square-border.png",
        startPositionX: 0,
        startPositionY: 0,
        width: 100,
        height: 0,
        length: 100,
        zIndex: 3,
        mapSizeX: 1000,
        mapSizeY: 1000,
        mapElement: {
            // home1: {
            //     src: "./Client/image/home.png",
            //     startPositionX: 0,
            //     startPositionY: 0,
            //     startPositionZ: 0,
            //     width: 10,
            //     height: 10,
            //     collaid: "./Client/image/collaid.png",
            //     colliderPositionX: 5,
            //     colliderPositionY: 0,
            //     colliderPositionZ: 2,
            //     colliderWidth: 2,
            //     colliderHeight: 1,
            //     colliderLength: 5,
            //     zIndex: 1,
            // },
            // tree1: {
            //     src: "./Client/image/treeTest.png",
            //     startPositionX: 0,
            //     startPositionY: 0,
            //     startPositionZ: 0,
            //     width: 3,
            //     height: 3,
            //     collaid: "./Client/image/collaid.png",
            //     colliderPositionX: 0,
            //     colliderPositionY: 0,
            //     colliderPositionZ: 0,
            //     colliderWidth: 4,
            //     colliderHeight: 1,
            //     colliderLength: 2,
            //     zIndex: 1,
            // }
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
