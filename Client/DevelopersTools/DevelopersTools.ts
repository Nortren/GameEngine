import * as THREE from "three";
import MapCreator from "../MapCreator/MapCreator";
export default class DevelopersTools {
    _count: number;
    props: object;

    _animationTimer: number;
    fixPoint: number;
    private _testImageMap: object;
    private _mapCreator: MapCreator = new MapCreator();

    constructor(options) {
        this._count = 0;
        this.props = options.props;

        this._animationTimer = 0;
        this.fixPoint = 0;
    }


}

export class CameraControl {
    _count: number;
    props: object;

    _animationTimer: number;
    fixPoint: number;
    private _testImageMap: object;


    constructor(options) {

        window.addEventListener('keydown', (event) => {
            this.moveCamera(event);

        });
    }


    moveCamera(event) {

        const codeButton = event.code;

        this.cameraPositionX = this.cameraStartPositionX;
        this.cameraPositionY = this.cameraStartPositionY;
        this.cameraPositionZ = this.cameraStartPositionZ;

        if (codeButton === "Numpad8") {
            this.cameraPositionZ += 1;
        }
        if (codeButton === "Numpad2") {
            this.cameraPositionZ -= 1;
        }
        if (codeButton === "Numpad7") {
            this.cameraPositionY += 1;
        }
        if (codeButton === "Numpad9") {
            this.cameraPositionY -= 1;
        }
    }

    cameraControl(camera) {
        camera = this.camera ? this.camera : camera;
        if (!this.camera) {
            //Сохраняем данные о камере, чтоб вернуть их после управления через OrbitControl
            this.camera = {...camera};
        }
        //
        // this.cameraStartPositionZ = camera.position.z;
        // this.cameraStartPositionX = camera.scale.x;
        // this.cameraStartPositionY = camera.rotation._y;
        //
        //
        // camera.position.z = this.cameraPositionZ ? this.cameraPositionZ : camera.position.z;
        // camera.scale.x = this.cameraPositionX ? this.cameraPositionX : camera.scale.x;
        // camera.rotation._y = this.cameraPositionY ? this.cameraPositionY : camera.rotation._y;


    }


}



