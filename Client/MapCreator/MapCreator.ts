import {testMapJSON} from "./testMap";
import * as THREE from "three";
export default class MapCreator {
    _count: number;
    objectCoordinate: number [];
    collisionPoint: object [];

    constructor(options) {

    }

    /**
     *
     */
    parserJSON() {
        return testMapJSON;
    }

    /**
     * Создаём игровую локацию
     */
    createGameLocation(scene, showCollaider) {
        this.collisionPoint = [];
        const mapObject = [];
        const planeSize = 50;
        const mapData = this.parserJSON().map;

        const loader = new THREE.TextureLoader();
        const texture = loader.load(mapData.src);
        const mapColor = 0xf3f3f3;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;

        const repeats = planeSize / 2;
        texture.repeat.set(repeats, repeats);

        const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
        const planeMat = new THREE.MeshPhongMaterial({
            map: texture,
            side: THREE.DoubleSide,
        });
        const map = new THREE.Mesh(planeGeo, planeMat);
        map.rotation.x = Math.PI * -.5;
        map.position.set(0, 0, 0)
        mapObject.push(map);
        for (let key in mapData.mapElement) {
            let mapElementObject = mapData.mapElement[key];
            let mapElementObjectIMG = loader.load(mapElementObject.src);
            mapElementObjectIMG.magFilter = THREE.NearestFilter;


            let mapElementObjectTexture = new THREE.SpriteMaterial({
                map: mapElementObjectIMG,
            });

            const elementObj = new THREE.Sprite(mapElementObjectTexture);


            elementObj.scale.set(mapElementObject.width, mapElementObject.height, mapElementObject.zIndex);
            elementObj.position.set(mapElementObject.startPositionX, mapElementObject.startPositionY, mapElementObject.startPositionZ);

            elementObj.center.x = 0;
            elementObj.center.y = 0;


            let mapElementObjectCollaider = loader.load(mapElementObject.collaid);
            const planeCollaiderGeo = new THREE.PlaneBufferGeometry(mapElementObject.colliderWidth, mapElementObject.colliderHeight);
            const planeCollaiderMat = new THREE.SpriteMaterial({
                map: mapElementObjectCollaider,
                side: THREE.DoubleSide,
            });
            const elementObjCollaider = new THREE.Sprite(planeCollaiderMat);
            elementObjCollaider.scale.set(mapElementObject.colliderWidth, mapElementObject.colliderHeight, mapElementObject.zIndex);
            elementObjCollaider.position.set(mapElementObject.colliderPositionX, mapElementObject.colliderPositionY, mapElementObject.colliderPositionZ);
            elementObjCollaider.center.x = 0;
            elementObjCollaider.center.y = 0;
            this.createObjectCollision(mapElementObject.colliderPositionX, mapElementObject.colliderPositionY, mapElementObject.colliderPositionZ, mapElementObject.colliderWidth, mapElementObject.colliderHeight);
            if (showCollaider) {
                scene.add(elementObjCollaider);
            }

            scene.add(elementObj);
            mapObject.push(elementObj);
        }

        scene.add(map);
        // return map;

    }

    createObjectCollision(X: number, Y: number, Z: number, Width: number, Height: number): void {

        this.collisionPoint.push(
            {
                x: X,
                y: Y,
                z: Z,
                width: Width,
                height: Height
            })

    }

    checkCollision(Xmove, Zmove, direction) {
        if(Zmove>=0) {
            Xmove -= 4;
        }
        else{
            Xmove -= 1.5;
        }
        for (let key in this.collisionPoint) {
            let checkX = false;
            let checkZ = false;

            let collision = this.collisionPoint[key];
            let drawObjectRealWidth = collision.width*0.6;
            let drawObjectRealHeight = collision.height / 2;
            if ((Xmove >= collision.x - drawObjectRealWidth) && (Xmove <= collision.x + drawObjectRealWidth)) {
                checkX = true;
            }
            if ((Zmove >= collision.z - drawObjectRealHeight) && (Zmove <= collision.z + drawObjectRealHeight)) {
                checkZ = true;
            }

            if (checkX && checkZ) {
                return direction;
            }
        }
        return false;
    }
}





