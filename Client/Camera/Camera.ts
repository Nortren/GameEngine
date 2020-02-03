import * as THREE from "three";
import * as OrbitControls from "three-orbitcontrols";


export default class Camera {

    constructor() {
        window.addEventListener('keydown', (event) => {
            this.moveCamera(event);

        });
    }

    createCamera() {
        const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 100);
        camera.position.set(0, 10, 5);
        camera.scale.set(1, 1, 1);
        camera.rotateX(4.99);
        return camera;
    }

    сameraON(turnCamera, camera, canvas) {

        if (turnCamera) {
            const controls = new OrbitControls(camera, canvas);
            controls.target.set(0, 0, 0);
            controls.update();
        }

    }

    /**
     * Метод обновления локации и перемещения персоонажа(он у нас всегда по центру)
     * @param props данные с контролов управления для перемещения карты относительно персоонажа
     */
    updateCameraGame(camera, props) {
        // camera.position.z = 10;
        camera.position.x = props.moveX * -0.01;
        camera.position.z = props.moveZ * -0.01;
        // camera.rotation.x += 0.01;
        this.cameraControl(camera);
    }

    moveCamera(event) {

        const codeButton = event.code;


        this.cameraPositionX = this.cameraStartPositionX;
        this.cameraPositionY = this.cameraStartPositionY;
        this.cameraPositionZ = this.cameraStartPositionZ;

        if (codeButton === "Numpad8") {
            this.cameraPositionX += 0.01;
        }
        if (codeButton === "Numpad2") {
            this.cameraPositionX -= 0.01;
        }
        if (codeButton === "Numpad7") {
            this.cameraPositionY += 1;
        }
        if (codeButton === "Numpad9") {
            this.cameraPositionY -= 1;
        }
    }

    cameraControl(camera) {
        // this.cameraStartPositionZ = camera.rotation.x;
        // this.cameraStartPositionY = camera.rotation._y;
        this.cameraStartPositionX = camera.rotation.x;

        // camera.position.z = this.cameraPositionZ ? this.cameraPositionZ : camera.position.z;
        camera.rotation.x = this.cameraPositionX ? this.cameraPositionX : camera.rotation.x;
        // camera.rotation._y = this.cameraPositionY ? this.cameraPositionY : camera.rotation._y;



    }

}





