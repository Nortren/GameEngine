import * as React from 'react';
import DinamicAnimation from "../Animation/Dynamic/Dynamic";
import MapCreator from "../MapCreator/MapCreator";
import Enemy from "../AI/Enemy";
import * as THREE from "three";
import * as OBJLoader from 'three-obj-loader';
import Player from "../Player/Player"
import Camera from "../Camera/Camera";
import {globalVariables} from "../GlobalVariables";
import BL from "../BusinessLogic";
import {CameraControl} from "../DevelopersTools/DevelopersTools"


interface primaryEngineInitializationData {
    userID: string;
    blData: BL;
    AI: Enemy;
    playerInMaps: Array<object>;
}


/**
 * Главный контрол первичной инициализации движка
 */
export default class EngineInitialization extends React.Component implements primaryEngineInitializationData {

    public context: CanvasRenderingContext2D;
    private _dynamicAnimation: DinamicAnimation = new DinamicAnimation(this);

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
        const canvas = this.createCanvas();

        const renderer = new THREE.WebGLRenderer({canvas: canvas});
        const scene = new THREE.Scene();
        scene.scale.set(1, 1, 1);
        this.blData = new BL();


        this.createUserRoom(scene, renderer, canvas);
    }

    /**
     * Метод создания холста на котором в дальнейшем будет рисоваться весь контент
     */
    createCanvas() {
        const canvas = document.getElementById('canvas');
        this.resize(canvas);
        return canvas;
    }

    /**
     * Создаём основную камеру(камеру игрока)
     * @param canvas
     * @returns {PerspectiveCamera}
     */
    createCameraScene(canvas, userData) {
        const userStartPositionCamera = userData[0];
        const camera = this._camera.createCamera(userStartPositionCamera);
        this._camera.сameraON(globalVariables.camera.cameraControl, camera, canvas);
        return camera;
    }

    /**
     * Метод создания комнаты в которой помещен игрок и получения данных с БЛ о состоянии комнаты
     * (Нахождении в ней игроков ,монстров , игровых объектов)
     * и рендер полученных данных
     * @param scene
     * @param renderer
     * @param camera
     */
    createUserRoom(scene, renderer, canvas) {
        this.isThereUser = false;
        this.userID = null;
        this.playerInMaps = [];
        this.blData.getUserRoom((data) => {
            const room = data.room;
            //Если userID клиента нет значит это первый вход и надо создать локацию комнаты
            if (!this.userID) {
                this.userID = data.playerName;
                this._mapCreator.createGameLocation(scene, room.map);
            }

            if (data.room.playersInTheRoom.length) {
                this.isThereUser = data.room.playersInTheRoom.filter((item) => {
                    return item.id === this.userID;
                });

            }

            if(data.action === 'addPlayer') {
                if (!this.isThereUser.length) {
                    this.addPlayerToRoom(scene, {userId: data.playerName, position: {x: 0, z: 0}});
                    room.playersInTheRoom.forEach((item, i) => {
                        this.addPlayerToRoom(scene, item);
                    });
                }
                else {

                    room.playersInTheRoom.forEach((item, i) => {
                        this.addPlayerToRoom(scene, item);
                    });
                }
            }
            //Если игрок вышел из комнаты нам прилетает событие с сервера и мы его убираем со сцены
            if(data.action === 'removePlayer') {
                let removePlayerthis = this.playerInMaps.filter((item)=>{
                    return data.playerName === item.id;
                });
                this.playerInMaps.splice();
                this.playerInMaps.forEach((item, i) => {
                    if (item.id === data.playerName) {
                        this.playerInMaps.splice(i, 1)
                    }
                });
                removePlayerthis[0].removingPlayerFromScene(scene);
            }
            this._enemyArray = this.createEnemyArray(room.enemy, scene, 100);
            if (this.isThereUser) {
                const camera = this.createCameraScene(canvas, this.isThereUser);

                this.update(renderer, scene, camera, this.playerInMaps, this._enemyArray, 0);
            }
        });
    }

    /**
     * Метод добавления игроков на сцену (всех кто находятся в текущей комнате включая игрока пользователя)
     * @param scene
     * @param item
     */
    addPlayerToRoom(scene, item) {
        const id = item.id;
        const health = item.height;
        const damage = item.damage;
        const attackSpeed = item.attackSpeed;
        const moveSpeed = item.moveSpeed;
        const attackDistance = item.attackDistance;
        const colliderPositionX = item.colliderPositionX;
        const colliderPositionY = item.colliderPositionY;
        const colliderPositionZ = item.colliderPositionZ;
        const colliderWidth = item.colliderWidth;
        const colliderHeight = item.colliderHeight;
        const colliderLength = item.colliderLength;
        const src = item.src;
        const collaid = item.collaid;


        const player = new Player(id, health, damage,
            attackSpeed, moveSpeed, attackDistance,
            colliderPositionX, colliderPositionY, colliderPositionZ,
            colliderWidth, colliderHeight, colliderLength,
            src, collaid
        );
        const playerData = player.createPlayer(item);

        const playerAvatarSprite = playerData.playerAvatarSprite;
        const healthLine = playerData.healthLine;
        const userCollaider = playerData.collaider;

        //Проверяем есть ли такой игрок на карте
        let thisIdOnMap = this.playerInMaps.filter((data) => {
            return data.id === item.id;
        });
        //есть нет то добавляем его в общий массив игроко
        if (thisIdOnMap.length === 0) {
            this.playerInMaps.push(player);
            //Дабавляемна сцену спрайт игрока линию жизни игрока и коллайдер игрока
            scene.add(playerAvatarSprite, healthLine, userCollaider);
        }

    }

    createEnemyArray(enemyData, scene, count) {





        let enemyDataArrayTest = [];
        enemyData.forEach((enemy) => {
            const id = enemy.id;
            const src = enemy.src;
            const collaid = enemy.collaid;
            const scope = enemy.scope;
            const scopeRadius = enemy.scopeRadius;
            const colliderPosition = enemy.colliderPosition;
            const colliderWidth = enemy.colliderWidth;
            const colliderHeight = enemy.colliderHeight;
            const colliderLength = enemy.colliderLength;
            const pursuitZone = enemy.pursuitZone;
            const persecutionRadius = enemy.persecutionRadius;
            const health = enemy.health;
            const damage = enemy.damage;
            const attackDistance = enemy.attackDistance;
            const attackSpeed = enemy.attackSpeed;
            const moveSpeed = enemy.moveSpeed;

            enemyDataArrayTest.push(new Enemy(id, src, collaid,
                scope, scopeRadius, colliderPosition,
                colliderWidth, colliderHeight, colliderLength,
                pursuitZone, persecutionRadius, health,
                damage, attackDistance,attackSpeed,
                moveSpeed));
        });

        this._AI = new Enemy(enemyData[0].id, enemyData[0].src, enemyData[0].collaid,
            enemyData[0].scope, enemyData[0].scopeRadius, enemyData[0].colliderPosition,
            enemyData[0].colliderWidth, enemyData[0].colliderHeight, enemyData[0].colliderLength,
            enemyData[0].pursuitZone, enemyData[0].persecutionRadius, enemyData[0].health,
            enemyData[0].damage, enemyData[0].attackDistance,enemyData[0].attackSpeed,
            enemyData[0].moveSpeed);
        let enemyArray = [];
        enemyData.forEach((enemy) => {
            enemyArray.push(this._AI.createEnemy(enemy, scene));
        });
        return enemyDataArrayTest;
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

        //Счетчик FPS
        if (duration < 1000) {
            this._FPSCounter++;
        } else {
            this.setState({fps: this._FPSCounter});
            this._FPSCounter = 0;
            timeStart = now;
        }

        requestAnimationFrame(() => {
            this.update(renderer, scene, camera, playerInMaps, enemyArray, timeStart);
        });
        renderer.render(scene, camera);
        const playerInformation = this.seeWhichPlayersAreBots(playerInMaps);
        for (let key in enemyArray) {
            this._AI.informationAboutWorld(enemyArray[key], playerInformation, this._mapCreator, scene);
        }
        let userProps = {};
        let cameraProps = {};
        this.updateUsersPositionInRoom(userProps, playerInMaps, camera, cameraProps, enemyArray);

        this.changePhysics(this._mapCreator.checkCollision(playerInformation.playerX, playerInformation.playerZ,
            playerInformation.playerWidth, playerInformation.playerHeight, this.props.direction));
    }

    //TODO пока костыль только первого юзера передаю врагам, надо перенести на сервер логику
    seeWhichPlayersAreBots(playerInMaps) {
        return {
            playerX: playerInMaps[0].collaider.position.x,
            playerZ: playerInMaps[0].collaider.position.z,
            playerWidth: playerInMaps[0].colliderWidth,
            playerHeight: playerInMaps[0].colliderLength,
            playerData: playerInMaps[0]
        };
    }


    /**
     * Обновляем координаты игроков в комнате для корректного отображения на клиенте пришедшие с сервера
     * @param userProps
     * @param playerInMaps
     * @param camera
     * @param cameraProps
     * @param enemyArray
     */
    updateUsersPositionInRoom(userProps, playerInMaps, camera, cameraProps, enemyArray) {
        this.blData.getUserPosition((data) => {
            if (data.thisUser) {
                data.arrayUser.forEach((item, i) => {
                        userProps.moveX = data.arrayUser[i].colliderPositionX;
                        userProps.moveZ = data.arrayUser[i].colliderPositionZ;
                        userProps.moveDirection = data.arrayUser[i].moveDirection;
                        if (playerInMaps[i]) {
                            if (!globalVariables.camera.cameraControl && (data.arrayUser[i].id === this.userID)) {
                                this.updateCameraClientPosition(camera, i, cameraProps, data);
                            }
                            playerInMaps[i].update(playerInMaps[i], userProps, enemyArray);
                        }
                    }
                )
            }
        });
    }

    /**
     * Обновляем позицию комаеру по позиции аватара клиента
     * @param camera
     * @param i
     * @param cameraProps
     * @param data
     */
    updateCameraClientPosition(camera, i, cameraProps, data) {
        this._cameraControls.cameraControl(camera);
        cameraProps.moveX = data.arrayUser[i].colliderPositionX;
        cameraProps.moveZ = data.arrayUser[i].colliderPositionZ;
        this._camera.updateCameraGame(camera, cameraProps);
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





