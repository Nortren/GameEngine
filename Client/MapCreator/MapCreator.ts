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


        this.creatingMapGrid(planeSize,mapStaticData, scene, planeGeo, planeMat);

        this.waveAlgorithmLee(planeSize,scene, planeAlgoritm, planeMatStep, mapStaticData);


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

    waveAlgorithmLee(planeSize,scene, planeGeo, planeMatStep, mapStaticData) {
        let stepX = planeSize*0.5;
        let stepZ = planeSize*0.5;
        let takePosition = [];


        //Точка к которой нам нужно придти
        let map = new THREE.Mesh(planeGeo, planeMatStep);
        map.rotation.x = Math.PI * -.5;
        map.position.set(7, 0, 3);
        map.receiveShadow = true;
        // mapObject.push(map);
        scene.add(map);


        let pointArray = [{x: 0, z: 0}];

        for (let key in mapStaticData.mapElement) {
            let element = mapStaticData.mapElement[key];
            //точка старта координат
            // takePosition.push({x: element.colliderPositionX, z: element.colliderPositionZ});

            for (let i = 0; i <= element.colliderWidth / 2; i++) {
                takePosition.push({x: element.colliderPositionX / 2 + i, z: element.colliderPositionZ / 2});
                takePosition.push({x: element.colliderPositionX / 2 - i, z: -element.colliderPositionZ / 2});
            }

            for (let i = 1; i < element.colliderLength; i++) {
                takePosition.push({x: element.colliderPositionX / 2, z: element.colliderPositionZ / 2 + i});
                takePosition.push({x: -element.colliderPositionX / 2, z: element.colliderPositionZ / 2 - i});
            }

        }


        let interval = setInterval(() => {

            if (this.checkArray(pointArray, stepX + planeSize*0.5, stepZ)) {
                if (!this.checkCollisionStatickObject(takePosition, stepX, stepZ)) {
                    pointArray.push(this.createPoint(scene, planeGeo, planeMatStep, stepX, stepZ));
                }
            }
            if (this.checkArray(pointArray, stepX - planeSize*0.5, stepZ)) {
                if (!this.checkCollisionStatickObject(takePosition, -stepX, stepZ)) {
                    pointArray.push(this.createPoint(scene, planeGeo, planeMatStep, -stepX, stepZ));
                }
            }
            if (this.checkArray(pointArray, stepX, stepZ + planeSize*0.5)) {
                if (!this.checkCollisionStatickObject(takePosition, stepX, -stepZ)) {
                    pointArray.push(this.createPoint(scene, planeGeo, planeMatStep, stepX, -stepZ));
                }
            }
            if (this.checkArray(pointArray, stepX, stepZ - planeSize*0.5)) {
                if (!this.checkCollisionStatickObject(takePosition, -stepX, -stepZ)) {
                    pointArray.push(this.createPoint(scene, planeGeo, planeMatStep, -stepX, -stepZ));
                }
            }

            stepZ+=planeSize;
            if (stepZ >mapStaticData.length/2) {
                stepZ = planeSize*0.5;
                stepX+=planeSize;
            }
            if (stepX > mapStaticData.width/2) {
                clearInterval(interval);
            }
        }, 10);


    }

    checkArray(arr, x, z) {
        let res = (x < 0 || z < 0 || x > arr.length || z >= arr[arr.length - 1]) ? false : true;
        return res;
    }

    checkCollisionStatickObject(arr, x, z) {
        let status = false;
        arr.forEach((element) => {
            if (element.x === x && element.z === z) {
                status = true;
            }
        });
        return status
    }


    createPoint(scene, planeGeo, planeMatStep, stepX, stepZ) {
        let map = new THREE.Mesh(planeGeo, planeMatStep);
        map.rotation.x = Math.PI * -.5;
        map.position.set(stepX, 0, stepZ);
        map.receiveShadow = true;
        scene.add(map);
        return {x: stepX, z: stepZ}
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

    creatingMapGrid(planeSize,mapStaticData, scene, planeGeo, planeMat) {

        for (let x = planeSize*0.5; x < mapStaticData.width *0.5; x+=planeSize) {
            for (let z = planeSize*0.5; z < mapStaticData.length *0.5; z+=planeSize) {
                scene.add(this.createPointMap(x, z, planeGeo,planeMat));
                scene.add(this.createPointMap(-x, -z, planeGeo,planeMat));
                scene.add(this.createPointMap(-x, z, planeGeo,planeMat));
                scene.add(this.createPointMap(x, -z, planeGeo,planeMat));

            }
        }

    }

    createPointMap(x, z,planeGeo,planeMat) {
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





