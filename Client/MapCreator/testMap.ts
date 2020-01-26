export const testMapJSON = {
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
            home3: {
                src: "./Client/image/home.png",
                startPositionX: 10,
                startPositionY: 0,
                startPositionZ: 10,
                width: 10,
                height: 10,
                collaid: "./Client/image/collaid.png",
                colliderPositionX: 8,
                colliderPositionY: 0.01,
                colliderPositionZ: 8.5,
                colliderWidth: 7,
                colliderHeight:3,
                zIndex: 1,
            },
            home1: {
                src: "./Client/image/treeTest.png",
                startPositionX: -5,
                startPositionY: 0,
                startPositionZ: -5,
                width: 3,
                height: 3,
                collaid: "./Client/image/collaid.png",
                colliderPositionX: -5,
                colliderPositionY: 0.01,
                colliderPositionZ: -5,
                colliderWidth: 0.5,
                colliderHeight:0.5,
                zIndex: 1,
            },
            home2: {
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

        }

    },
    hero: {
        src: "./Client/image/hero.png",
        collaid:"./Client/image/collaid.png",
        colliderPositionX: 0,
        colliderPositionY: 0.01,
        colliderPositionZ: 0,
        colliderWidth: 1,
        colliderHeight: 1,
    }
};
