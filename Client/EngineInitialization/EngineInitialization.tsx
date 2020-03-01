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
import {room} from "./testMap";

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

        this.userID = null;

        this.blData = new BL();
        this._AI = new AI(10, 1, 1, 10, 30);
        this.playerInMaps = [];
        this.isThereUser = false;
        this.blData.getMapStaticData((data) => {

            if (!this.userID) {
                this.userID = data.playerName;
                this.room = data.room;
                this._mapCreator.createGameLocation(scene, this.room.map);
            }

            //TODO весьма костыльно решение , надо сделать добавление в массив игроков на карте по нормальному на сервере
            if (data.room.playersInTheRoom.length) {
                this.isThereUser = data.room.playersInTheRoom.filter(function (item) {
                    return item.id === data.playerName;
                });

            }
            if (!this.isThereUser.length) {
                this.addPlayerToMap(scene, data, {userId: data.playerName, position: {x: 0, z: 0}});
                this.room.playersInTheRoom.forEach((item, i) => {
                    this.addPlayerToMap(scene, data, item);
                });
            }
            else {

                this.room.playersInTheRoom.forEach((item, i) => {
                    this.addPlayerToMap(scene, data, item);
                });
            }
            this._enemyArray = this.testCreateEnemyArray(this.room.enemy, scene, 100);

            this.update(renderer, scene, camera, this.playerInMaps, this._enemyArray, 0);

        });

    }

    addPlayerToMap(scene, data, item) {
        const playerData = this._player.createPlayer(item, item);
        const user = playerData.user;
        const healthLine = playerData.healthLine;
        const userCollaider = playerData.collaider;
        const testDataSyncronize = data;

        let test = this.playerInMaps.filter(function (data) {
            return data.id === item.userId;
        });
        if (test.length === 0) {
            this.playerInMaps.push(playerData);

        }
        scene.add(user, healthLine, userCollaider);
    }

    testCreateEnemyArray(enemyData, scene, count) {
        let enemyArray = []
        enemyData.forEach((enemy) => {
            enemyArray.push(this._AI.createEnemy(enemy, scene));
        });
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
    update(renderer, scene, camera, playerInMaps, enemyArray, timeStart): void {
        let now = performance.now();
        let duration = now - timeStart;

        if (duration < 1000) {
            this._FPSCounter++;
        } else {
            this.setState({fps: this._FPSCounter});
            this._FPSCounter = 0;
            timeStart = now;


        }

        // this.blData.setUserPosition({userId: this.userID, position: {x: this.props.moveX, z: this.props.moveZ}});

        requestAnimationFrame(() => {
            this.update(renderer, scene, camera, playerInMaps, enemyArray, timeStart);
        });


        renderer.render(scene, camera);
        //TODO пока костыль только первого юзера передаю врагам, надо перенести на сервер логику
        const playerInformation = {
            playerX: playerInMaps[0].collaider.position.x,
            playerZ: playerInMaps[0].collaider.position.z,
            playerWidth: playerInMaps[0].collaider.geometry.parameters.width,
            playerHeight: playerInMaps[0].collaider.geometry.parameters.height,
            playerData: playerInMaps[0]
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
        let testProps = {};
        this.blData.getUserPosition((data) => {
     /*       if (data.thisUser) {


                data.arrayUser.forEach((item, i) => {
                        testProps.moveX = data.arrayUser[i].position.x;
                        testProps.moveZ = data.arrayUser[i].position.z;
                        if (playerInMaps[i]) {
                            this._dynamicAnimation.updateUserAvatar(playerInMaps[i], testProps, this._player, enemyArray);
                        }
                    }
                )
            }*/
        });


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





