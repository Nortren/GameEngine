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
        const mapData = this.parserJSON().map;
        const loader = new THREE.TextureLoader();
        const mapImg = loader.load(mapData.src);
        mapImg.wrapS = THREE.RepeatWrapping;
        mapImg.wrapT = THREE.RepeatWrapping;
        const timesToRepeatHorizontally = 4;
        const timesToRepeatVertically = 2;
        mapImg.repeat.set(timesToRepeatHorizontally, timesToRepeatVertically);
        //Материал для pixe_art улучшает качество до пиксельного
        mapImg.magFilter = THREE.NearestFilter;

        const mapTexture = new THREE.SpriteMaterial({
            map: mapImg,
        });


        const map = new THREE.Sprite(mapTexture);
        map.scale.set(mapData.width, mapData.height, mapData.zIndex1);
        mapObject.push(map);
        for (let key in mapData.mapElement) {
            let mapElementObject = mapData.mapElement[key];
            let mapElementObjectIMG = loader.load(mapElementObject.src);
            let mapElementObjectTexture = new THREE.SpriteMaterial({
                map: mapElementObjectIMG,
            });

            const elementObj = new THREE.Sprite(mapElementObjectTexture);
            elementObj.scale.set(mapElementObject.width, mapElementObject.height, mapElementObject.zIndex);
            elementObj.position.set(mapElementObject.startPositionX, mapElementObject.startPositionY, mapElementObject.startPositionZ);

            this.createObjectCollision(mapElementObject.colliderPositionX, mapElementObject.colliderPositionY, mapElementObject.colliderWidth, mapElementObject.colliderHeight);
            scene.add(elementObj);
            mapObject.push(elementObj);
            console.log(mapElementObject.src);
        }

        scene.add(map);
        return mapObject;
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





