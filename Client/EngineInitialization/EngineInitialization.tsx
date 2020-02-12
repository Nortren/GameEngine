import * as React from 'react';
import DinamicAnimation from "../Animation/Dynamic/Dynamic";
import MapCreator from "../MapCreator/MapCreator";
import AI from "../AI/AI";
import * as THREE from "three";
import * as OBJLoader from 'three-obj-loader';
import Player from "../Player/Player"
import Camera from "../Camera/Camera";
import {globalVariables} from "../GlobalVariables";
import BL from "../BusinessLogic";


import {CameraControl} from "../DevelopersTools/DevelopersTools"
import {testMapJSON} from "./testMap";

/**
 * Главный контрол первичной инициализации движка
 */
export default class EngineInitialization extends React.Component {
    public canvas: object;
    public context: CanvasRenderingContext2D;
    private _dynamicAnimation: DinamicAnimation = new DinamicAnimation(this);
    private _player: Player = new Player();
    private _camera: Camera = new Camera();
    private _mapCreator: MapCreator = new MapCreator();
    private _cameraControls: CameraControl = new CameraControl();
    private _enemyArray: Array<object>;
    _FPSCounter: number = 0;

    constructor(props: object) {
        super(props);
        this.changePhysics = this.changePhysics.bind(this);
        this.state = {
            moveX: 0,
            moveY: 0, countMove: 0,
            moveXBoll: true,
            fps: 0
        };
    }

    componentDidMount() {
        this.canvas = document.getElementById('canvas');
        this.resize(this.canvas);
        const scene = new THREE.Scene();
        scene.scale.set(1, 1, 1);
        const camera = this._camera.createCamera();
        const renderer = new THREE.WebGLRenderer({canvas: this.canvas});
        renderer.shadowMap.enabled = true;
        this._camera.сameraON(globalVariables.camera.cameraControl, camera, this.canvas);


        const blData = new BL();
        this._AI = new AI(10, 1, 1, 10, 30);






        blData.getMapStaticData((data) => {
            this._mapCreator.createGameLocation(scene,data.map);
            const playerData = this._player.createPlayer(data.player);
            const user = playerData.user;
            const healthLine = playerData.healthLine;
            const userCollaider = playerData.collaider;
            scene.add(user, healthLine, userCollaider);
            this._enemyArray = this.testCreateEnemyArray(data.enemy, scene, 300);
            this.update(renderer, scene, camera, playerData, this._enemyArray, 0);
        });
    }

    testCreateEnemyArray(enemyData, scene, count) {
        let enemyArray = [];
        let x = enemyData.colliderPosition.x;
        let z = enemyData.colliderPosition.z;
        for (let i = 0; i < count; i++) {


            if (i % 2 === 0) {
                z = i * 0.3;
            }
            else {
                z = -i * 0.3;
            }
            if (i % 3 === 0) {
                x = i * 0.3;
            }
            else {
                x = -i * 0.3;
            }

            enemyData.colliderPosition.x = x;
            enemyData.colliderPosition.z = z;

            enemyArray.push(this._AI.createEnemy(enemyData, scene));

        }

        return enemyArray;
    }

    /**
     * Функция покадрового обновления сцены для отображения всех изменений и анимаций
     * @param renderer
     * @param scene
     * @param camera
     * @param map
     * @param user
     */
    update(renderer, scene, camera, playerData, enemyArray, timeStart): void {
        let now = performance.now();
        let duration = now - timeStart;

        if (duration < 1000) {
            this._FPSCounter++;
        } else {
            this.setState({fps: this._FPSCounter});
            this._FPSCounter = 0;
            timeStart = now;


        }
        requestAnimationFrame(() => {
            this.update(renderer, scene, camera, playerData, enemyArray, timeStart);
        });


        renderer.render(scene, camera);
        const playerInformation = {
            playerX: playerData.collaider.position.x,
            playerZ: playerData.collaider.position.z,
            playerWidth: playerData.collaider.geometry.parameters.width,
            playerHeight: playerData.collaider.geometry.parameters.height,
            playerData: playerData
        };

        this._cameraControls.cameraControl(camera);
        if (!globalVariables.camera.cameraControl) {
            this._camera.updateCameraGame(camera, this.props);
        }

        for (let key in enemyArray) {
            //Добавлял для расчета столкновений в общий массив с коллайдекрами но ониначинают шарахаться друг от друга
            /*     this._mapCreator.createObjectCollision('enemy' + key,  enemyArray[key].ColliderMesh.position.x,
                     enemyArray[key].ColliderMesh.position.y,
                     enemyArray[key].ColliderMesh.position.z,
                     enemyArray[key].enemyData.colliderWidth,
                     enemyArray[key].enemyData.colliderLength, 'enemy');*/
            this._AI.informationAboutWorld(enemyArray[key], playerInformation, this._mapCreator, scene);
        }


        this._dynamicAnimation.updateUserAvatar(playerData, this.props, this._player, enemyArray);
        this._dynamicAnimation.objectAnimation(this.props.animations, 3);


        this.changePhysics(this._mapCreator.checkCollision(playerInformation.playerX, playerInformation.playerZ,
            playerInformation.playerWidth, playerInformation.playerHeight, this.props.direction));

    }

    changePhysics(result) {
        this.props.changePhysics(result);
    }


    componentDidUpdate() {
        this._animate = this.props.animations;
    }

    /**
     * Обновления Canvas в зависимости от разрешения экрана (работает при первичной инициализации)
     * @param canvas
     */
    resize(canvas: object) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    render() {
        return (
            <div className="fps-counter">
                <div className="fps-counter-view">{this.state.fps}</div>
                <canvas id="canvas"/>
            </div>
        );
    }
}





