export const MapJSON = {
//Числа должны быть кратны двум иначе будет построено на одну дополнительную точку больше
    map: {
        src: "./Client/image/square-border.png",
        startPositionX: 0,
        startPositionY: 0,
        width: 10,
        height: 0,
        length: 10,
        zIndex: 3,
        mapSizeX: 1000,
        mapSizeY: 1000,
        mapElement: {},
        // mapElement: {
        //     home1: {
        //         src: "./Client/image/home.png",
        //         startPositionX: 0,
        //         startPositionY: 0,
        //         startPositionZ: 0,
        //         width: 10,
        //         height: 10,
        //         collaid: "./Client/image/collaid.png",
        //         colliderPositionX: 3,
        //         colliderPositionY: 0,
        //         colliderPositionZ: 0,
        //         colliderWidth: 2,
        //         colliderHeight: 1,
        //         colliderLength: 2,
        //         zIndex: 1,
        //     },
        //     home2: {
        //         src: "./Client/image/home.png",
        //         startPositionX: 0,
        //         startPositionY: 0,
        //         startPositionZ: 0,
        //         width: 10,
        //         height: 10,
        //         collaid: "./Client/image/collaid.png",
        //         colliderPositionX: -4,
        //         colliderPositionY: 0,
        //         colliderPositionZ: 0,
        //         colliderWidth: 2,
        //         colliderHeight: 1,
        //         colliderLength: 2,
        //         zIndex: 1,
        //     },
        //     tree2: {
        //         src: "./Client/image/treeTest.png",
        //         startPositionX: 0,
        //         startPositionY: 0,
        //         startPositionZ: 0,
        //         width: 3,
        //         height: 3,
        //         collaid: "./Client/image/collaid.png",
        //         colliderPositionX: 0,
        //         colliderPositionY: 0,
        //         colliderPositionZ: -2,
        //         colliderWidth: 2,
        //         colliderHeight: 1,
        //         colliderLength: 2,
        //         zIndex: 1,
        //     },
        //     tree3: {
        //         src: "./Client/image/treeTest.png",
        //         startPositionX: 0,
        //         startPositionY: 0,
        //         startPositionZ: 0,
        //         width: 6,
        //         height: 6,
        //         collaid: "./Client/image/collaid.png",
        //         colliderPositionX: 2,
        //         colliderPositionY: 0,
        //         colliderPositionZ: 0,
        //         colliderWidth: 2,
        //         colliderHeight: 1,
        //         colliderLength: 2,
        //         zIndex: 1,
        //     },
        //     tree4: {
        //         src: "./Client/image/treeTest.png",
        //         startPositionX: 0,
        //         startPositionY: 0,
        //         startPositionZ: 0,
        //         width: 3,
        //         height: 3,
        //         collaid: "./Client/image/collaid.png",
        //         colliderPositionX: -8,
        //         colliderPositionY: 0,
        //         colliderPositionZ: 0,
        //         colliderWidth: 2,
        //         colliderHeight: 1,
        //         colliderLength: 10,
        //         zIndex: 1,
        //     },
        //     tree5: {
        //         src: "./Client/image/treeTest.png",
        //         startPositionX: 0,
        //         startPositionY: 0,
        //         startPositionZ: 0,
        //         width: 3,
        //         height: 3,
        //         collaid: "./Client/image/collaid.png",
        //         colliderPositionX: 11,
        //         colliderPositionY: 0,
        //         colliderPositionZ: 0,
        //         colliderWidth: 8,
        //         colliderHeight: 1,
        //         colliderLength: 2,
        //         zIndex: 1,
        //     },
        //     tree6: {
        //         src: "./Client/image/treeTest.png",
        //         startPositionX: 0,
        //         startPositionY: 0,
        //         startPositionZ: 0,
        //         width: 3,
        //         height: 3,
        //         collaid: "./Client/image/collaid.png",
        //         colliderPositionX: 0,
        //         colliderPositionY: 0,
        //         colliderPositionZ: -10,
        //         colliderWidth: 8,
        //         colliderHeight: 1,
        //         colliderLength: 2,
        //         zIndex: 1,
        //     },
        //     tree7: {
        //         src: "./Client/image/treeTest.png",
        //         startPositionX: 0,
        //         startPositionY: 0,
        //         startPositionZ: 0,
        //         width: 3,
        //         height: 3,
        //         collaid: "./Client/image/collaid.png",
        //         colliderPositionX: -10,
        //         colliderPositionY: 0,
        //         colliderPositionZ: 5,
        //         colliderWidth: 4,
        //         colliderHeight: 1,
        //         colliderLength: 4,
        //         zIndex: 1,
        //     },
        //     tree8: {
        //         src: "./Client/image/treeTest.png",
        //         startPositionX: 0,
        //         startPositionY: 0,
        //         startPositionZ: 0,
        //         width: 3,
        //         height: 3,
        //         collaid: "./Client/image/collaid.png",
        //         colliderPositionX: 14,
        //         colliderPositionY: 0,
        //         colliderPositionZ: 5,
        //         colliderWidth: 4,
        //         colliderHeight: 1,
        //         colliderLength: 4,
        //         zIndex: 1,
        //     },
        //     tree9: {
        //         src: "./Client/image/treeTest.png",
        //         startPositionX: 0,
        //         startPositionY: 0,
        //         startPositionZ: 0,
        //         width: 3,
        //         height: 3,
        //         collaid: "./Client/image/collaid.png",
        //         colliderPositionX: 0,
        //         colliderPositionY: 0,
        //         colliderPositionZ: 8,
        //         colliderWidth: 13,
        //         colliderHeight: 1,
        //         colliderLength: 2,
        //         zIndex: 1,
        //     },
        //     tree10: {
        //         src: "./Client/image/treeTest.png",
        //         startPositionX: 0,
        //         startPositionY: 0,
        //         startPositionZ: 0,
        //         width: 3,
        //         height: 3,
        //         collaid: "./Client/image/collaid.png",
        //         colliderPositionX: 0,
        //         colliderPositionY: 0,
        //         colliderPositionZ: 14,
        //         colliderWidth: 14,
        //         colliderHeight: 1,
        //         colliderLength: 2,
        //         zIndex: 1,
        //     },
        //     tree11: {
        //         src: "./Client/image/treeTest.png",
        //         startPositionX: 0,
        //         startPositionY: 0,
        //         startPositionZ: 0,
        //         width: 3,
        //         height: 3,
        //         collaid: "./Client/image/collaid.png",
        //         colliderPositionX: -8,
        //         colliderPositionY: 0,
        //         colliderPositionZ: -13,
        //         colliderWidth: 4,
        //         colliderHeight: 1,
        //         colliderLength: 2,
        //         zIndex: 1,
        //     },
        //     tree12: {
        //         src: "./Client/image/treeTest.png",
        //         startPositionX: 0,
        //         startPositionY: 0,
        //         startPositionZ: 0,
        //         width: 3,
        //         height: 3,
        //         collaid: "./Client/image/collaid.png",
        //         colliderPositionX: 8,
        //         colliderPositionY: 0,
        //         colliderPositionZ: 6,
        //         colliderWidth: 2,
        //         colliderHeight: 1,
        //         colliderLength: 6,
        //         zIndex: 1,
        //     },
        //     tree13: {
        //         src: "./Client/image/treeTest.png",
        //         startPositionX: 0,
        //         startPositionY: 0,
        //         startPositionZ: 0,
        //         width: 3,
        //         height: 3,
        //         collaid: "./Client/image/collaid.png",
        //         colliderPositionX: 6,
        //         colliderPositionY: 0,
        //         colliderPositionZ: -8,
        //         colliderWidth: 6,
        //         colliderHeight: 1,
        //         colliderLength: 2,
        //         zIndex: 1,
        //     },
        //     tree14: {
        //         src: "./Client/image/treeTest.png",
        //         startPositionX: 0,
        //         startPositionY: 0,
        //         startPositionZ: 0,
        //         width: 3,
        //         height: 3,
        //         collaid: "./Client/image/collaid.png",
        //         colliderPositionX: 8,
        //         colliderPositionY: 0,
        //         colliderPositionZ: -5,
        //         colliderWidth: 8,
        //         colliderHeight: 1,
        //         colliderLength: 2,
        //         zIndex: 1,
        //     },
        // },
        enemyOnMap: [
            {
                typeEnemy: 'enemy1',
                count: 1,
                startPoint: {x:-4,y:0,z:0},
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
