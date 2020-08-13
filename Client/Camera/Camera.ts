import * as THREE from "three";
import * as OrbitControls from "three-orbitcontrols";


export default class Camera {
    controls: OrbitControls;
    cameraStartPositionX: number;
    cameraPositionX: number;
    constructor() {

    }

    /**
     * Метод создания первичного положения камеры
     * @param userStartPositionCamera координаты пользователя в которых будет установленна камера
     * @returns {PerspectiveCamera}
     */
    createCamera(userStartPositionCamera):Camera {
        const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 100);
        const x = userStartPositionCamera.colliderPositionX;
        const y = 10; //высота до аватара игрока
        const z = userStartPositionCamera.colliderPositionZ;
        camera.position.set(x, y, z);
        camera.scale.set(1, 1, 1);
        camera.rotateX(4.7);
        return camera;
    }

    сameraON(turnCamera, camera, canvas) {
        if(!this.controls && turnCamera) {
            this.controls = new OrbitControls(camera, canvas);
            this.controls.saveState();
        }
        if(this.controls) {
            if (turnCamera) {
                // this.controls.target.set(0, 0, 0);
                this.controls.update();
            } else {

                this.controls.dispose();
                this.controls.update();
                this.controls = null;
            }
        }
    }

    /**
     * Метод обновления локации и перемещения персоонажа(он у нас всегда по центру)
     * @param props данные с контролов управления для перемещения карты относительно персоонажа
     */
    updateCameraGame(camera, props) {
        camera.position.x = props.moveX;
        camera.position.z = props.moveZ;
        this.cameraControl(camera);
    }

    /**
     * ПРоверка перемещения камеры за игроком
     * @param camera
     */
    cameraControl(camera) {
        this.cameraStartPositionX = camera.rotation.x;
        camera.rotation.x = this.cameraPositionX ? this.cameraPositionX : camera.rotation.x;
    }

}





