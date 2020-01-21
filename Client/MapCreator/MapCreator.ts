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
    createGameLocation(scene) {
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
        map.position.set(0,0,0)
        mapObject.push(map);
        for (let key in mapData.mapElement) {
            let mapElementObject = mapData.mapElement[key];
            let mapElementObjectIMG = loader.load(mapElementObject.src);
            mapElementObjectIMG.magFilter = THREE.NearestFilter;

            const planeGeo = new THREE.PlaneBufferGeometry(mapElementObject.width, mapElementObject.height);
            const planeMat = new THREE.MeshPhongMaterial({
                map: mapElementObjectIMG,
                side: THREE.DoubleSide,
            });
            const elementObj = new THREE.Mesh(planeGeo, planeMat);

            // let mapElementObjectTexture = new THREE.SpriteMaterial({
            //     map: mapElementObjectIMG,
            // });
            //
            // const elementObj = new THREE.Sprite(mapElementObjectTexture);


            elementObj.scale.set(mapElementObject.width, mapElementObject.height, mapElementObject.zIndex);
            elementObj.position.set(mapElementObject.startPositionX, mapElementObject.startPositionY, mapElementObject.startPositionZ);
            elementObj.rotation.x = Math.PI * -.5;
            this.createObjectCollision(mapElementObject.colliderPositionX, mapElementObject.colliderPositionY, mapElementObject.colliderWidth, mapElementObject.colliderHeight);
            scene.add(elementObj);
            mapObject.push(elementObj);
        }

        scene.add(map);
        // return map;

    }

    createObjectCollision(X: number, Y: number, Width: number, Height: number): void {

        this.collisionPoint.push(
            {
                x: X,
                y: Y,
                width: Width,
                height: Height
            })

    }

    checkCollision(Xmove, Ymove,direction) {

        for (let key in this.collisionPoint) {
            let checkX = false;
            let checkY = false;

            let collision = this.collisionPoint[key];
            let drawObjectRealWidth = collision.width/2;
            let drawObjectRealHeight = collision.height/2;
            if ((Xmove >= collision.x-drawObjectRealWidth) && (Xmove <= collision.x + drawObjectRealWidth)) {
                checkX = true;
            }
            if ((Ymove >= collision.y - drawObjectRealHeight) && (Ymove <= collision.y + drawObjectRealHeight)) {
                checkY = true;
            }

            if(checkX && checkY){
                return direction;
            }
        }
        return false;
    }
}





