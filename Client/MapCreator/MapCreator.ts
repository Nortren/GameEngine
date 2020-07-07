import {room} from "./testMap";
import {globalVariables} from "../GlobalVariables";
import * as THREE from "three";
export default class MapCreator {

    collisionPoint: object [];

    constructor() {

    }

    /**
     *
     */
    parserJSON() {
        return room;
    }

    /**
     * Создаём игровую локацию
     */
    // createGameLocation(scene,mapStaticData) {
    //     this.collisionPoint = [];
    //     const mapObject = [];
    //     const planeSize = 100;
    //
    //
    //     const loader = new THREE.TextureLoader();
    //     const texture = loader.load(mapStaticData.src);
    //     const mapColor = 0xf3f3f3;
    //     texture.wrapS = THREE.RepeatWrapping;
    //     texture.wrapT = THREE.RepeatWrapping;
    //     texture.magFilter = THREE.NearestFilter;
    //
    //     //добавлям свет
    //     const color = 0xFFFFFF;
    //     const intensity = 1;
    //     const colorLight = 0xFFFFFF;
    //     const intensityLight = 0.4;
    //     const light = new THREE.PointLight(colorLight, intensityLight);
    //     if (globalVariables.shadow.materialShadow) {
    //         light.castShadow = true;
    //     }
    //     light.position.set(0, 11, 0);
    //     scene.add(light, light.target);
    //
    //
    //     const repeats = planeSize / 2;
    //     texture.repeat.set(repeats, repeats);
    //
    //     const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
    //     const planeMat = new THREE.MeshPhongMaterial({
    //         color: mapColor,
    //         side: THREE.DoubleSide,
    //     });
    //     const map = new THREE.Mesh(planeGeo, planeMat);
    //     map.rotation.x = Math.PI * -.5;
    //     map.position.set(0, 0, 0);
    //     map.receiveShadow = true;
    //     mapObject.push(map);
    //     for (let key in mapStaticData.mapElement) {
    //         let mapElementObject = mapStaticData.mapElement[key];
    //
    //         if (globalVariables.models.sprite) {
    //             let mapElementObjectIMG = loader.load(mapElementObject.src);
    //             mapElementObjectIMG.magFilter = THREE.NearestFilter;
    //             let mapElementObjectTexture = new THREE.SpriteMaterial({
    //                 map: mapElementObjectIMG,
    //             });
    //
    //             const elementObj = new THREE.Sprite(mapElementObjectTexture);
    //             elementObj.scale.set(mapElementObject.width, mapElementObject.height, mapElementObject.zIndex);
    //             elementObj.position.set(mapElementObject.startPositionX, mapElementObject.startPositionY, mapElementObject.startPositionZ);
    //             elementObj.center.y = 0;
    //             scene.add(elementObj);
    //             mapObject.push(elementObj);
    //         }
    //
    //         let mapElementObjectCollaider = loader.load(mapElementObject.collaid);
    //         const planeCollaiderGeo = new THREE.BoxGeometry(mapElementObject.colliderWidth, mapElementObject.colliderLength, mapElementObject.colliderHeight);
    //         const planeCollaiderMat = new THREE.MeshPhongMaterial({
    //             map: mapElementObjectCollaider,
    //             side: THREE.DoubleSide,
    //         });
    //         let materials = [
    //             //делаем каждую сторону своего цвета
    //             new THREE.MeshBasicMaterial({transparent: true, opacity: 0}), // левая сторона
    //             new THREE.MeshBasicMaterial({transparent: true, opacity: 0}), // правая сторона
    //             new THREE.MeshBasicMaterial({transparent: true, opacity: 0}), //зaдняя сторона
    //             new THREE.MeshBasicMaterial({transparent: true, opacity: 0}), // лицевая сторона
    //             new THREE.MeshBasicMaterial({transparent: true, opacity: 0}), // верх
    //             new THREE.MeshBasicMaterial({transparent: true, opacity: 0}) // низ
    //         ];
    //
    //         if (globalVariables.collider.showCollider) {
    //             materials = [
    //                 //делаем каждую сторону своего цвета
    //                 new THREE.MeshBasicMaterial({color: 0xED7700}), // левая сторона
    //                 new THREE.MeshBasicMaterial({color: 0xED7700}), // правая сторона
    //                 new THREE.MeshBasicMaterial({map: mapElementObjectCollaider,}), //зaдняя сторона
    //                 new THREE.MeshBasicMaterial({color: 0xED7700}), // лицевая сторона
    //                 new THREE.MeshBasicMaterial({map: mapElementObjectCollaider,}), // верх
    //                 new THREE.MeshBasicMaterial({transparent: true, opacity: 0}) // низ
    //             ];
    //         }
    //
    //         const elementObjCollaider = new THREE.Mesh(planeCollaiderGeo, materials);
    //         elementObjCollaider.position.set(mapElementObject.colliderPositionX, mapElementObject.colliderPositionY, mapElementObject.colliderPositionZ);
    //         if (globalVariables.shadow.materialShadow) {
    //             elementObjCollaider.castShadow = true;
    //         }
    //         elementObjCollaider.rotation.x = Math.PI * -.5;
    //         this.createObjectCollision('mapElement' + key,
    //             mapElementObject.colliderPositionX,
    //             mapElementObject.colliderPositionY,
    //             mapElementObject.colliderPositionZ,
    //             mapElementObject.colliderWidth,
    //             mapElementObject.colliderLength,
    //             'mapElement');
    //         scene.add(elementObjCollaider);
    //
    //
    //     }
    //
    //     scene.add(map);
    // }


    createGameLocation(scene, mapStaticData) {
        this.collisionPoint = [];
        const mapObject = [];
        const planeSize = 1;


        const loader = new THREE.TextureLoader();
        const texture = loader.load(mapStaticData.src);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;


        const textureStep = loader.load("./Client/image/step.png");
        textureStep.wrapS = THREE.RepeatWrapping;
        textureStep.wrapT = THREE.RepeatWrapping;
        textureStep.magFilter = THREE.NearestFilter;

        //добавлям свет
        const skyColor = 0xf5f5f5;  // light blue
        const groundColor = 0xf5f5f5;  // brownish orange
        const intensity = 1;
        const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
        scene.add(light);

        //добавлям свет
        // const color = 0xFFFFFF;
        // const intensity = 1;
        // const colorLight = 0xFFFFFF;
        // const intensityLight = 0.4;
        // const light = new THREE.PointLight(colorLight, intensityLight);
        // if (globalVariables.shadow.materialShadow) {
        //     light.castShadow = true;
        // }
        // light.position.set(0, 11, 0);
        // scene.add(light, light.target);

        const repeats = planeSize / 2;
        texture.repeat.set(repeats, repeats);

        const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
        // const planeAlgoritm = new THREE.PlaneBufferGeometry(planeSize, planeSize);
        const planeMat = new THREE.MeshPhongMaterial({
            // color: mapColor,
            side: THREE.DoubleSide,
            map: texture,
        });
        const planeMatStep = new THREE.MeshPhongMaterial({
            // color: mapColor,
            side: THREE.DoubleSide,
            map: textureStep,
        });


        // this.creatingMapGrid(planeSize, mapStaticData, scene, planeGeo, planeMat);


        // Добавление статических объектов на карту
        for (let key in mapStaticData.mapElement) {
            let mapElementObject = mapStaticData.mapElement[key];

            if (globalVariables.models.sprite) {
                let mapElementObjectIMG = loader.load(mapElementObject.src);
                mapElementObjectIMG.magFilter = THREE.NearestFilter;
                let mapElementObjectTexture = new THREE.SpriteMaterial({
                    map: mapElementObjectIMG,
                });

                const elementObj = new THREE.Sprite(mapElementObjectTexture);
                elementObj.scale.set(mapElementObject.width, mapElementObject.height, mapElementObject.zIndex);
                elementObj.position.set(mapElementObject.startPositionX, mapElementObject.startPositionY, mapElementObject.startPositionZ);
                scene.add(elementObj);
                mapObject.push(elementObj);
            }

            let mapElementObjectCollaider = loader.load(mapElementObject.collaid);
            const planeCollaiderGeo = new THREE.BoxGeometry(mapElementObject.colliderWidth, mapElementObject.colliderLength, mapElementObject.colliderHeight);
            const planeCollaiderMat = new THREE.MeshPhongMaterial({
                map: mapElementObjectCollaider,
                side: THREE.DoubleSide,
            });
            let materials = [
                //делаем каждую сторону своего цвета
                new THREE.MeshBasicMaterial({transparent: true, opacity: 0}), // левая сторона
                new THREE.MeshBasicMaterial({transparent: true, opacity: 0}), // правая сторона
                new THREE.MeshBasicMaterial({transparent: true, opacity: 0}), //зaдняя сторона
                new THREE.MeshBasicMaterial({transparent: true, opacity: 0}), // лицевая сторона
                new THREE.MeshBasicMaterial({transparent: true, opacity: 0}), // верх
                new THREE.MeshBasicMaterial({transparent: true, opacity: 0}) // низ
            ];

            if (globalVariables.collider.showCollider) {
                materials = [
                    //делаем каждую сторону своего цвета
                    new THREE.MeshBasicMaterial({color: 0xED7700}), // левая сторона
                    new THREE.MeshBasicMaterial({color: 0xED7700}), // правая сторона
                    new THREE.MeshBasicMaterial({map: mapElementObjectCollaider,}), //зaдняя сторона
                    new THREE.MeshBasicMaterial({color: 0xED7700}), // лицевая сторона
                    new THREE.MeshBasicMaterial({map: mapElementObjectCollaider,}), // верх
                    new THREE.MeshBasicMaterial({transparent: true, opacity: 0}) // низ
                ];
            }

            const elementObjCollaider = new THREE.Mesh(planeCollaiderGeo, materials);
            elementObjCollaider.position.set(mapElementObject.colliderPositionX,this.calculatingCorrectHeightCollider(mapElementObject.colliderPositionY, mapElementObject.colliderHeight), mapElementObject.colliderPositionZ);
            if (globalVariables.shadow.materialShadow) {
                elementObjCollaider.castShadow = true;
            }
            elementObjCollaider.rotation.x = Math.PI * -.5;
            this.createObjectCollision('mapElement' + key,
                mapElementObject.colliderPositionX,
                mapElementObject.colliderPositionY,
                mapElementObject.colliderPositionZ,
                mapElementObject.colliderWidth,
                mapElementObject.colliderLength,
                'mapElement');
            scene.add(elementObjCollaider);


        }

    }

    /**
     * Вычисляем правилный размер коллайдера относительно оси y
     * @param collaider
     * @param colliderPositionY
     * @param colliderHeight
     */
    calculatingCorrectHeightCollider(colliderPositionY, colliderHeight) {
        let yPosition = colliderPositionY + colliderHeight / 2;
        return yPosition;

    }
    update(scene, data, counter) {
        const map = data.map;
        const searchPlayer = data.playersInTheRoom[0];

        let interval;
        //TODO Костыль просто чтоб отображать анимацию визуализация алгоритма Ли, чтоб наглядно видеть принцип работы (Можно удалить т.к уже перенесено на сервер и реализованно на ботах)
        if (!counter) {
            interval = setInterval(() => {
                clearInterval(interval);
                if (data) {

                    this.waveAlgorithmLee(scene, map, searchPlayer);
                }
            }, 1000);
        }
        counter++;
        return counter;
    }

    waveAlgorithmLee(scene, mapStaticData, searchPlayer) {
        const planeSize = 1;
        const loader = new THREE.TextureLoader();
        const textureStep = loader.load("./Client/image/step.png");
        textureStep.wrapS = THREE.RepeatWrapping;
        textureStep.wrapT = THREE.RepeatWrapping;
        textureStep.magFilter = THREE.NearestFilter;
        const planeMatStep = new THREE.MeshPhongMaterial({
            // color: mapColor,
            side: THREE.DoubleSide,
            map: textureStep,
        });
        const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
        const grid = this.createGridMap(mapStaticData);

        let mapWidth = mapStaticData.width;
        let mapLength = mapStaticData.length;
        let findObject = this.findPlayerPoint(searchPlayer, {mapWidth, mapLength});
        let findObjectX = findObject.x;
        let findObjectZ = findObject.z;
        let searchPointX = Math.ceil(mapWidth / 2);
        let searchPointZ = 0;

        this.lee(scene, grid, searchPointX, searchPointZ, findObjectX, findObjectZ, planeGeo, planeMatStep, mapLength, mapWidth);
    }

    findPlayerPoint(searchPlayer, size) {
        let x = Math.ceil(searchPlayer.colliderPositionX + size.mapWidth / 2 - 1);
        let z = Math.ceil(searchPlayer.colliderPositionZ + size.mapLength / 2 - 1);
        return {x, z}
    }

    /**
     * Метод создания сетки игрового поля(для определения препятствий)
     * @param mapStaticData
     * @returns {Array}
     */
    createGridMap(mapStaticData) {
        const width = mapStaticData.width;
        const length = mapStaticData.width;
        const mapElementCoordinate = [];

        for (let x = 0; x < width; x++) {
            mapElementCoordinate.push([]);
            for (let z = 0; z < width; z++) {
                mapElementCoordinate[x][z] = -1;
            }
        }


        for (let key in mapStaticData.mapElement) {
            let mapElementObject = mapStaticData.mapElement[key];
            let positionX = Math.ceil(mapElementObject.colliderPositionX + width / 2);
            let positionZ = Math.ceil(mapElementObject.colliderPositionZ + length / 2);

            let colliderWidth = Math.ceil(mapElementObject.colliderWidth / 2);
            let colliderLength = Math.ceil(mapElementObject.colliderLength / 2);

            for (let z = 1; z <= colliderLength; z++) {
                for (let x = 1; x <= colliderWidth; x++) {
                    // [positionX + x -1] [positionX + z -1] для центрирования элемента т.к 0 считаем положительным числом
                    mapElementCoordinate[positionZ - z][positionX + x - 1] = -2;
                    mapElementCoordinate[positionZ - z][positionX - x] = -2;
                    mapElementCoordinate[positionZ + z - 1][positionX + x - 1] = -2;
                    mapElementCoordinate[positionZ + z - 1][positionX - x] = -2;
                }
            }

        }


        return mapElementCoordinate;
    }

    /**
     *
     * @param scene
     * @param grid
     * @param startPointX
     * @param startPointZ
     * @param searchPointX
     * @param searchPointZ
     * @param scene
     * @param planeGeo
     * @param planeMatStep
     * @param mapLength
     * @param mapWidth
     * @returns {boolean}
     */

    lee(scene, grid, startPointX, startPointZ, searchPointX, searchPointZ, planeGeo, planeMatStep, mapLength, mapWidth): boolean   // поиск пути из ячейки (ax, ay) в ячейку (bx, by)
    {
        const widthPlayingField = mapLength; // ширина рабочего поля
        const lengthPlayingField = mapWidth;// высота рабочего поля
        const wall = -2; // непроходимая ячейка
        const blank = -1; // свободная непомеченная ячейка


        let pathX = [widthPlayingField * lengthPlayingField], pathZ = [widthPlayingField * lengthPlayingField]; // координаты ячеек, входящих  путь
        let lengthPath;// длина пути


        // Перед вызовом lee() массив grid заполнен значениями WALL и BLANK

        let offsetX = [1, 0, -1, 0];   // смещения, соответствующие соседям ячейки
        let offsetZ = [0, 1, 0, -1];   // справа, снизу, слева и сверху
        let waveNumber;
        let stop;

        if (grid[startPointZ][startPointX] == wall || grid[searchPointZ][searchPointX] == wall) return false;  // ячейка (ax, ay) или (bx, by) - стена

        // распространение волны
        waveNumber = 0;
        grid[startPointZ][startPointX] = 0;            // стартовая ячейка помечена 0

        do {
            stop = true;               // предполагаем, что все свободные клетки уже помечены
            for (let z = 0; z < lengthPlayingField; ++z)
                for (let x = 0; x < widthPlayingField; ++x)
                    if (grid[z][x] == waveNumber)                         // ячейка (x, y) помечена числом d
                    {
                        for (let k = 0; k < 4; ++k)                    // проходим по всем непомеченным соседям
                        {
                            let iy = z + offsetZ[k], ix = x + offsetX[k];
                            if (iy >= 0 && iy < lengthPlayingField && ix >= 0 && ix < widthPlayingField &&
                                grid[iy][ix] == blank) {
                                stop = false;              // найдены непомеченные клетки
                                grid[iy][ix] = waveNumber + 1;      // распространяем волну
                            }
                        }
                    }
            waveNumber++;
        } while (!stop && grid[searchPointZ][searchPointX] == blank);


        if (grid[searchPointZ][searchPointX] == blank) return false;  // путь не найден

        // восстановление пути
        // восстановление пути
        lengthPath = grid[searchPointZ][searchPointX];            // длина кратчайшего пути из (ax, ay) в (bx, by)

        waveNumber = lengthPath;
        while (waveNumber > 0) {
            pathX[waveNumber] = searchPointX;
            pathZ[waveNumber] = searchPointZ;                   // записываем ячейку (x, y) в путь
            waveNumber--;
            for (let k = 0; k < 4; ++k) {
                let iy = searchPointZ + offsetZ[k], ix = searchPointX + offsetX[k];
                if (iy >= 0 && iy < lengthPlayingField && ix >= 0 && ix < widthPlayingField &&
                    grid[iy][ix] == waveNumber) {
                    searchPointX = searchPointX + offsetX[k];
                    searchPointZ = searchPointZ + offsetZ[k];           // переходим в ячейку, которая на 1 ближе к старту
                    break;
                }
            }
        }
        pathX[0] = startPointX;
        pathZ[0] = startPointZ;
        // this.createPathSearch({pathX, pathZ, lengthPath}, scene, planeGeo, planeMatStep, mapLength, mapWidth);
        // теперь px[0..len] и py[0..len] - координаты ячеек пути
        return true;
    }

    /**
     * Метод визуальной отрисовки найденого пути
     * @param path
     * @param scene
     * @param planeGeo
     * @param planeMatStep
     * @param length
     * @param width
     */
    createPathSearch(path, scene, planeGeo, planeMatStep, length, width) {

        let searchX = path.pathX;
        let searchZ = path.pathZ;
        let lengthPath = path.lengthPath;
        let pathArrayId = [];

        let pathDraw = setInterval(() => {

            //Поскольку точки карты у нас строятся только в положительном диапазоне(проверен алгоритм Лее)
            // то нам нужно правильно указывать координаты т.к центр карты ноль
            //  соответственно ноль оси координат в разные стороны с разным знаком
            let x = searchX[lengthPath] - width / 2 + 1;
            let z = searchZ[lengthPath] - length / 2 + 1;


            let mapID = this.createPointSearch(scene, planeGeo, planeMatStep, x - 0.5, z - 0.5);
            pathArrayId.push(mapID);
            if (!lengthPath) {
                clearInterval(pathDraw);
                pathArrayId.forEach((stepMesh) => {
                    let objectRemove = scene.getObjectById(stepMesh);
                    scene.remove(objectRemove);
                });
                lengthPath = path.lengthPath;
            }
            lengthPath--;


        }, 100);

    }


    /**
     * визуализация плитки шага, чтоб можно было посмотреть работу алгоритма
     * @param scene
     * @param planeGeo
     * @param planeMatStep
     * @param stepX
     * @param stepZ
     * @returns {number}
     */
    createPointSearch(scene, planeGeo, planeMatStep, stepX, stepZ) {
        let map = new THREE.Mesh(planeGeo, planeMatStep);
        map.rotation.x = Math.PI * -.5;
        map.position.set(stepX, 0, stepZ);
        map.receiveShadow = true;
        scene.add(map);
        return map.id;
    }

    /**
     * Метод создания тестовой локации по ячейкам (для реализации волнового алгоритма Ли)
     * Мы создаём карту по квадратам (размер квадрата 1x1)
     * @param planeSize размер одной клетки(нужно учесть что строится клетка из заданной точки по этому ее ширину и длинну надо равномерно отложить вобе стороны)
     * @param mapStaticData
     * @param scene
     * @param planeGeo
     * @param planeMat
     */

    creatingMapGrid(planeSize, mapStaticData, scene, planeGeo, planeMat) {

        for (let x = planeSize * 0.5; x < mapStaticData.width * 0.5; x += planeSize) {
            for (let z = planeSize * 0.5; z < mapStaticData.length * 0.5; z += planeSize) {
                scene.add(this.createPointMap(x, z, planeGeo, planeMat));
                scene.add(this.createPointMap(-x, -z, planeGeo, planeMat));
                scene.add(this.createPointMap(-x, z, planeGeo, planeMat));
                scene.add(this.createPointMap(x, -z, planeGeo, planeMat));

            }
        }

    }

    createPointMap(x, z, planeGeo, planeMat) {
        let map = new THREE.Mesh(planeGeo, planeMat);
        map.rotation.x = Math.PI * -.5;
        map.position.set(x, 0, z);
        map.receiveShadow = true;
        return map;
    }

    createObjectCollision(id: number, X: number, Y: number, Z: number, Width: number, Length: number, objectType: string): void {


        let item = this.collisionPoint.find(b => b.id === id);
        if (this.collisionPoint.find(b => b.id === id)) {
            item.id = id;
            item.x = X;
            item.y = Y;
            item.z = Z;
            //Поскольку ширина и высота откладываются по половине от стартовых точек то колизию нужно расчитывать так
            item.width = Width * 0.5;
            //TODO тут нужно указать не высату а длинну
            item.height = Length * 0.5;
            item.type = objectType;
        } else {
            this.collisionPoint.push({
                id: id,
                x: X,
                y: Y,
                z: Z,
                //Поскольку ширина и высота откладываются по половине от стартовых точек то колизию нужно расчитывать так
                width: Width * 0.5,
                //TODO тут нужно указать не высату а длинну
                height: Length * 0.5,
                type: objectType
            });
        }
    }

    checkCollision(Xmove: number, Zmove: number, Xwidth: number, Zheight: number, direction: string) {

        for (let key in this.collisionPoint) {
            let checkX = false;
            let checkZ = false;
            let collision = this.collisionPoint[key];
            let collisionZ = collision.z;
            let collisionX = collision.x;


            let drawObjectRealWidth = collision.width;
            let drawObjectRealHeight = collision.height;
            let PlayerRealWidth = Xwidth;
            let PlayerRealHeight = Zheight;
            if ((Xmove + PlayerRealWidth >= collisionX - drawObjectRealWidth) && (Xmove - PlayerRealWidth <= collisionX + drawObjectRealWidth)) {
                checkX = true;
            }
            if ((Zmove + PlayerRealHeight >= collisionZ - drawObjectRealHeight ) && (Zmove - PlayerRealHeight <= collisionZ + drawObjectRealHeight)) {
                checkZ = true;
            }

            if (checkX && checkZ) {
                return direction;
            }
        }
        return false;
    }
}





