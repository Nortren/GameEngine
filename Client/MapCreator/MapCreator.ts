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
        const skyColor = 0xB1E1FF;  // light blue
        const groundColor = 0xB97A20;  // brownish orange
        const intensity = 3;
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
        const planeAlgoritm = new THREE.PlaneBufferGeometry(planeSize, planeSize);
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


        this.creatingMapGrid(planeSize, mapStaticData, scene, planeGeo, planeMat);

        this.waveAlgorithmLee(planeSize, scene, planeAlgoritm, planeMatStep, mapStaticData);


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
            elementObjCollaider.position.set(mapElementObject.colliderPositionX, mapElementObject.colliderPositionY, mapElementObject.colliderPositionZ);
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

        // scene.add(map);
    }

    waveAlgorithmLee(planeSize, scene, planeGeo, planeMatStep, mapStaticData) {
        let stepX = planeSize * 0.5;
        let stepZ = planeSize * 0.5;
        let takePosition = [];
        let stepCounterLee = 0;
        let pointArray = [{x: 0, z: 0}];
        let meshStepArray = [];
        let statusSearch = false;

        let step = 0;
        let moveX = 0;
        let moveZ = 0;

        let serchPosition = {
            colliderPositionX: 15,
            colliderPositionZ: -15,
            colliderWidth: planeSize,
            colliderLength: planeSize
        };

        //Точка к которой нам нужно придти
        let map = new THREE.Mesh(planeGeo, planeMatStep);
        map.rotation.x = Math.PI * -.5;
        map.position.set(serchPosition.colliderPositionX, 0, serchPosition.colliderPositionZ);
        map.receiveShadow = true;

        scene.add(map);


        for (let key in mapStaticData.mapElement) {
            let element = mapStaticData.mapElement[key];

            takePosition.push({
                colliderPositionX: element.colliderPositionX,
                colliderPositionZ: element.colliderPositionZ,
                colliderWidth: element.colliderWidth,
                colliderLength: element.colliderLength
            });


        }


        let interval = setInterval(() => {


            for (let x = 0; x < step; x++) {
                for (let z = 0; z < step; z++) {
                    if (meshStepArray)
                        if(this.checkArray(meshStepArray,x,z)) {
                            statusSearch = this.drawWave(scene, 0, 0, stepX + x, stepZ + z, pointArray, planeSize, takePosition, planeGeo, planeMatStep, meshStepArray, step, serchPosition, statusSearch)
                        }
                }
            }
            step++;


            if (statusSearch) {
                clearInterval(interval);
                meshStepArray.forEach((stepMesh) => {
                    let objectRemove = scene.getObjectById(stepMesh.id);
                    scene.remove(objectRemove);
                });

                this.createPathSearch(meshStepArray, serchPosition, scene, planeGeo, planeMatStep, step);

            }

        }, 1000);

    }


    drawWave(scene, startX, startZ, stepX, stepZ, pointArray, planeSize, takePosition, planeGeo, planeMatStep, meshStepArray, stepCounterLee, serchPosition, statusSearch) {

        if (this.checkCollisionStatickObject(takePosition, stepX, stepZ)) {
            pointArray.push(this.createPoint(scene, planeGeo, planeMatStep, startX + stepX, startZ + stepZ, meshStepArray, stepCounterLee));
            if (!this.checkCollisionSearchObject(serchPosition, stepX, stepZ)) {
                console.log('Search1');
                statusSearch = true;
            }
        }


        if (this.checkCollisionStatickObject(takePosition, -stepX, stepZ)) {
            pointArray.push(this.createPoint(scene, planeGeo, planeMatStep, startX - stepX, startZ + stepZ, meshStepArray, stepCounterLee));
            if (!this.checkCollisionSearchObject(serchPosition, -stepX, stepZ)) {
                console.log('Search2');
                statusSearch = true;
            }
        }


        if (this.checkCollisionStatickObject(takePosition, stepX, -stepZ)) {
            pointArray.push(this.createPoint(scene, planeGeo, planeMatStep, startX + stepX, startZ - stepZ, meshStepArray, stepCounterLee));
            if (!this.checkCollisionSearchObject(serchPosition, stepX, -stepZ)) {
                console.log('Search3');
                statusSearch = true;
            }
        }


        if (this.checkCollisionStatickObject(takePosition, -stepX, stepZ)) {
            pointArray.push(this.createPoint(scene, planeGeo, planeMatStep, startX - stepX, startZ - stepZ, meshStepArray, stepCounterLee));
            if (!this.checkCollisionSearchObject(serchPosition, -stepX, -stepZ)) {
                console.log('Search4');
                statusSearch = true;
            }
        }
        return statusSearch;
    }

    checkArray(arr, x, z) {
        let res = true;
        if(!arr.length){
            res = true;
        }else {
            res = (x < 0 || z < 0 || x <= arr[arr.length - 1].stepX || z <= arr[arr.length - 1].stepZ) ? false : true;
        }
        return res;
    }

    /**
     * Метод который строит путь до искомой точки
     * @param meshStepArray
     * @param serchPosition
     * @param scene
     * @param planeGeo
     * @param planeMatStep
     * @param stepCounterLee
     */
    createPathSearch(meshStepArray, serchPosition, scene, planeGeo, planeMatStep, stepCounterLee) {
//TODO косяк в поиске пути т.к неверно формируется массив с данными (они повторяются)
        let searchArray = [];


        meshStepArray.forEach((step) => {
            if (this.checkNumberPlus(serchPosition.colliderPositionX) === this.checkNumberPlus(step.stepX) &&
                this.checkNumberPlus(serchPosition.colliderPositionZ) === this.checkNumberPlus(step.stepZ)
            ) {
                searchArray.push(step);

            }
        });

        for (let i = 1; i < stepCounterLee;) {
            searchArray.forEach((step) => {
                if (step.stepCounterLee === i) {
                    this.createPointSearch(scene, planeGeo, planeMatStep, step.stepX + i, step.stepZ + i);
                    i++;
                }
            });
        }

    }

    /**
     * Метод генерации случайного числа
     * @param max
     * @returns {number}
     */
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    /**
     * Проверка на положительное число
     * @param number
     * @returns {boolean}
     */
    checkNumberPlus(number) {
        return number > 0;
    }


    /**
     * Метод проверки на сталкновение со статическим объектом(необходим для визуализации волнового алгоритма Лее)
     * @param elementArray
     * @param x
     * @param z
     */
    checkCollisionSearchObject(element, x, z) {
        let CollisionX = this.checkCollisionAxisSearchObject(x, 1, element.colliderPositionX, element.colliderWidth / 2);
        let CollisionZ = this.checkCollisionAxisSearchObject(z, 1, element.colliderPositionZ, element.colliderLength / 2);
        return (!CollisionZ || !CollisionX);
    }

    /**
     * Проверка столкновения с объектом поиска
     * @param enemyPositionAxis
     * @param enemySize
     * @param positionCollision
     * @param sizeCollision
     * @returns {boolean}
     */
    checkCollisionAxisSearchObject(enemyPositionAxis, enemySize, positionCollision, sizeCollision) {

        if ((enemyPositionAxis + enemySize * 0.5 >= positionCollision - sizeCollision) &&
            (enemyPositionAxis - enemySize * 0.5 <= positionCollision + sizeCollision)) {
            return true;
        }
        return false;
    }


    /**
     * Метод проверки на сталкновение со статическим объектом(необходим для визуализации волнового алгоритма Лее)
     * @param elementArray
     * @param x
     * @param z
     */
    checkCollisionStatickObject(elementArray, x, z) {

        return elementArray.every((element) => {
            let CollisionX = this.checkCollisionAxis(x, 1, element.colliderPositionX, element.colliderWidth / 2);
            let CollisionZ = this.checkCollisionAxis(z, 1, element.colliderPositionZ, element.colliderLength / 2);
            return (!CollisionZ || !CollisionX);
        });

    }

    /**
     * Проверка столкновения
     * @param enemyPositionAxis
     * @param enemySize
     * @param positionCollision
     * @param sizeCollision
     * @returns {boolean}
     */
    checkCollisionAxis(enemyPositionAxis, enemySize, positionCollision, sizeCollision) {

        if ((enemyPositionAxis + enemySize * 0.5 > positionCollision - sizeCollision) &&
            (enemyPositionAxis - enemySize * 0.5 < positionCollision + sizeCollision)) {
            return true;
        }
        return false;
    }

    /**
     * Создаем массив точек(плиток шага)
     * @param scene
     * @param planeGeo
     * @param planeMatStep
     * @param stepX
     * @param stepZ
     * @param meshStepArray
     * @param stepCounterLee
     * @returns {{x: any, z: any}}
     */
    createPoint(scene, planeGeo, planeMatStep, stepX, stepZ, meshStepArray, stepCounterLee) {
        const id = this.createPointSearch(scene, planeGeo, planeMatStep, stepX, stepZ);
        meshStepArray.push({id, stepCounterLee, stepX, stepZ});
        return {x: stepX, z: stepZ}
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





