import {testMapJSON} from "./testMap";
import * as THREE from "three";
export default class MapCreator {
    _count: number;
    objectCoordinate:number [];

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
        const mapObject = [];
        const mapData = this.parserJSON().map;
        const loader = new THREE.TextureLoader();
        const mapImg = loader.load(mapData.src);
        //Материал для pixe_art улучшает качество до пиксельного

        const mapTexture = new THREE.SpriteMaterial({
            map: mapImg,
        });

        mapImg.wrapS = THREE.RepeatWrapping;
        mapImg.wrapT = THREE.RepeatWrapping;
        const timesToRepeatHorizontally = 4;
        const timesToRepeatVertically = 2;
        mapImg.repeat.set(timesToRepeatHorizontally, timesToRepeatVertically);
        mapImg.magFilter = THREE.NearestFilter;

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
            scene.add(elementObj);
            mapObject.push(elementObj);
            console.log(mapElementObject.src);
        }


        scene.add(map);
        return mapObject;
    }

    createObjectCollision() {

    }
}





