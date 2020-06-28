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
import {connect} from 'react-redux';

import {fpsCounter} from '../Store/EditorStore/FPSCounter/Actions';
import {gameWorldState} from '../Store/StoreStateGameWorld/Actions';

interface primaryEngineInitializationData {
    userID: string;
    blData: BL;
    AI: Enemy;
    playerInMaps: Array<object>;
}


/**
 * Главный контрол первичной инициализации движка
 */
class EngineInitialization extends React.Component implements primaryEngineInitializationData {

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
        this.scene = new THREE.Scene();
        this.scene.scale.set(1, 1, 1);
        this.blData = new BL();


        this.createUserRoom(this.scene, renderer, canvas);

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
     * @param renderernpm ru
     * @param camera
     */
    createUserRoom(scene, renderer, canvas) {
        this.isThereUser = false;
        this.userID = null;
        this.playerInMaps = [];
        //TODO проверка на первое подключение
        this.init = false;
        this.blData.getUserRoom((data) => {
            const room = data.room;
            //Если userID клиента нет значит это первый вход и надо создать локацию комнаты
            if (!this.userID) {
                this.userID = data.playerName;
                this._mapCreator.createGameLocation(scene, room.map);
                this._enemyArray = this.createEnemyArray(room.enemy, scene);
            }

            if (data.room.playersInTheRoom.length) {
                this.isThereUser = data.room.playersInTheRoom.filter((item) => {
                    return item.id === this.userID;
                });

            }

            if (data.action === 'addPlayer') {
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
            if (data.action === 'removePlayer') {
                let removePlayerthis = this.playerInMaps.filter((item) => {
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

            if (this.isThereUser.length) {

                const camera = this.createCameraScene(canvas, this.isThereUser);

                let counter = 0;

                this.blData.getTestDataServerConnect((data) => {
                    counter = this._mapCreator.update(scene, data.room, counter);
                    if (counter >= 100) {
                        counter = 0;
                    }
                    data.room.enemy.forEach((enemy) => {
                        let thisEnemy = this._enemyArray.filter((enemyClient) => {

                            return enemy.id === enemyClient.id
                        })[0];
                        thisEnemy.colliderPositionX = enemy.colliderPositionX;
                        thisEnemy.colliderPositionY = enemy.colliderPositionY;
                        thisEnemy.colliderPositionZ = enemy.colliderPositionZ;
                        thisEnemy.directionMove = enemy.directionMove;
                        thisEnemy.attackStatus = enemy.attackStatus;
                        thisEnemy.health = enemy.health;

                        thisEnemy.informationAboutWorld(thisEnemy, data.room.playersInTheRoom[0], this._mapCreator, scene);
                    });
                });

                let userProps = {};
                let cameraProps = {};
                if (!this.init) {
                    this.updateUsersPositionInRoom(userProps, this.playerInMaps, camera, cameraProps, this._enemyArray);
                    this.init = true;
                    this.props.gameWorldState(scene);
                    this.update(renderer, scene, camera, this.playerInMaps, this._enemyArray, 0);
                }
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
        const sprite = item.sprite;
        const collaid = item.collaid;


        const player = new Player(id, health, damage,
            attackSpeed, moveSpeed, attackDistance,
            colliderPositionX, colliderPositionY, colliderPositionZ,
            colliderWidth, colliderHeight, colliderLength,
            sprite, collaid
        );
        const playerData = player.createPlayer(item);

        const playerAvatarSprite = playerData.playerAvatarSprite;
        const healthLine = playerData.healthLine;
        //TODO это коллайдер от которого по задумке должны были быть тени если нужно для эксперимента то добавь на сцену
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
            // scene.add(playerAvatarSprite, healthLine);
        }

    }

    createEnemyArray(enemyData, scene) {


        let enemyDataArrayTest = [];
        enemyData.forEach((enemy) => {
            const id = enemy.id;
            const sprite = enemy.sprite;
            const collaid = enemy.collaid;
            const scope = enemy.scope;
            const scopeRadius = enemy.scopeRadius;
            const colliderPosition = enemy.colliderPosition;
            const colliderWidth = enemy.colliderWidth;
            const colliderHeight = enemy.colliderHeight;
            const colliderLength = enemy.colliderLength;
            const colliderPositionX = enemy.colliderPositionX;
            const colliderPositionY = enemy.colliderPositionY;
            const colliderPositionZ = enemy.colliderPositionZ;
            const pursuitZone = enemy.pursuitZone;
            const persecutionRadius = enemy.persecutionRadius;
            const health = enemy.health;
            const damage = enemy.damage;
            const attackDistance = enemy.attackDistance;
            const attackSpeed = enemy.attackSpeed;
            const moveSpeed = enemy.moveSpeed;

            const enemyRoom = new Enemy(id, sprite, collaid,
                scope, scopeRadius, colliderPositionX, colliderPositionY, colliderPositionZ,
                colliderWidth, colliderHeight, colliderLength,
                pursuitZone, persecutionRadius, health,
                damage, attackDistance, attackSpeed,
                moveSpeed);

            enemyRoom.createEnemy(scene);

            enemyDataArrayTest.push(enemyRoom);
        });
        return enemyDataArrayTest;
    }

    /**
     * Метод создания простой геометрии
     * @param geometryName
     * @param params
     * @returns {Mesh}
     */
    createGeometry(geometryName: string, params?: object): object {
        let geometry;
        let material;
        switch (geometryName) {
            case 'BoxGeometry':
                geometry = new THREE.BoxGeometry(1, 1, 1);
                material = new THREE.MeshBasicMaterial({color: 0x00ff00});
                const cube = new THREE.Mesh(geometry, material);
                return cube;
            case 'CylinderGeometry':
                geometry = new THREE.CylinderGeometry(5, 5, 20, 32);
                material = new THREE.MeshBasicMaterial({color: 0xffff00});
                const cylinder = new THREE.Mesh(geometry, material);
                return cylinder;
            case 'SphereGeometry':
                geometry = new THREE.SphereGeometry(5, 32, 32);
                material = new THREE.MeshBasicMaterial({color: 0xffff00});
                const sphere = new THREE.Mesh(geometry, material);
                return sphere;
            case 'ConeGeometry':
                geometry = new THREE.ConeGeometry(5, 20, 32);
                material = new THREE.MeshBasicMaterial({color: 0xffff00});
                const cone = new THREE.Mesh(geometry, material);
                return cone;
            case 'ExtrudeGeometry':
                const length = 12, width = 8;

                const shape = new THREE.Shape();
                shape.moveTo( 0,0 );
                shape.lineTo( 0, width );
                shape.lineTo( length, width );
                shape.lineTo( length, 0 );
                shape.lineTo( 0, 0 );

                const extrudeSettings = {
                    steps: 2,
                    depth: 16,
                    bevelEnabled: true,
                    bevelThickness: 1,
                    bevelSize: 1,
                    bevelOffset: 0,
                    bevelSegments: 1
                };

                geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
                material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
                const extrude = new THREE.Mesh( geometry, material ) ;
                return extrude;
            case 'LatheGeometry':
                const points = [];
                for ( var i = 0; i < 10; i ++ ) {
                    points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
                }
                geometry = new THREE.LatheGeometry( points );
                material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
                const lathe = new THREE.Mesh( geometry, material );
                return lathe;
            case 'ParametricGeometry':
                geometry = new THREE.ParametricGeometry( THREE.ParametricGeometries.klein, 25, 25 );
                material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
                const klein = new THREE.Mesh( geometry, material );
                return klein;
            case 'PlaneGeometry':
                geometry = new THREE.PlaneGeometry( 5, 20, 32 );
                material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
                const plane = new THREE.Mesh( geometry, material );
                return plane;
            case 'RingGeometry':
                geometry = new THREE.RingGeometry( 1, 5, 32 );
                material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
                const ring = new THREE.Mesh( geometry, material );
                return ring;
            case 'ShapeGeometry':
                const x = 0, y = 0;

                const heartShape = new THREE.Shape();

                heartShape.moveTo( x + 5, y + 5 );
                heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
                heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
                heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
                heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
                heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
                heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

                geometry = new THREE.ShapeGeometry( heartShape );
                material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
                const shapeGeometry = new THREE.Mesh( geometry, material ) ;
                return shapeGeometry;
            case 'TorusGeometry':
                geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
                material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
                const torus = new THREE.Mesh( geometry, material );
                return torus;
            case 'TorusKnotGeometry':
                geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
                material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
                const torusKnot = new THREE.Mesh( geometry, material );
                return torusKnot;
            case 'TubeGeometry':
            function CustomSinCurve( scale ) {

                THREE.Curve.call( this );

                this.scale = ( scale === undefined ) ? 1 : scale;

            }

                CustomSinCurve.prototype = Object.create( THREE.Curve.prototype );
                CustomSinCurve.prototype.constructor = CustomSinCurve;

                CustomSinCurve.prototype.getPoint = function ( t ) {

                    const tx = t * 3 - 1.5;
                    const ty = Math.sin( 2 * Math.PI * t );
                    const tz = 0;

                    return new THREE.Vector3( tx, ty, tz ).multiplyScalar( this.scale );

                };

                const path = new CustomSinCurve( 10 );
                geometry = new THREE.TubeGeometry( path, 20, 2, 8, false );
                material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
                const tube = new THREE.Mesh( geometry, material );
                return tube;
        }
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
        if (this.props.editorData && this.props.editorData.name) {


            if (this.props.editorData.name === "EditorEventBus") {
                const idSearchElement = this.props.editorData.event.source.id;
                const searchObject = this.scene.getObjectById(idSearchElement);
                const changeData = this.props.editorData.event.data;
                searchObject[this.props.editorData.event.item][this.props.editorData.event.name] = changeData;
            }
            if (this.props.editorData.name === "CreateObject") {
                const createGeometryName = this.props.editorData.event.buttonName;
                const geometry = this.createGeometry(createGeometryName);
                this.scene.add(geometry);
            }
            const createTab = new CustomEvent('changeEditorData', {
                bubbles: true,
                cancelable: true,
                detail: {status: true}
            });
            document.dispatchEvent(createTab);
        }

        let now = performance.now();
        let duration = now - timeStart;

        //Счетчик FPS
        if (duration < 1000) {
            this._FPSCounter++;

        } else {
            this.props.fpsCounter(this._FPSCounter);
            this.setState({fps: this._FPSCounter});
            this._FPSCounter = 0;
            timeStart = now;
        }

        requestAnimationFrame(() => {

            this.update(renderer, scene, camera, playerInMaps, enemyArray, timeStart);
        });
        renderer.render(scene, camera);
        const playerInformation = this.seeWhichPlayersAreBots(playerInMaps);

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
                        userProps.id = data.arrayUser[i].id;
                        if (playerInMaps[i]) {
                            if (!globalVariables.camera.cameraControl && (data.thisUser.id === this.userID)) {
                                this.updateCameraClientPosition(camera, i, cameraProps, data.thisUser);
                            }
                            playerInMaps[i].update(data.arrayUser[i], enemyArray);
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
        cameraProps.moveX = data.colliderPositionX;
        cameraProps.moveZ = data.colliderPositionZ;
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

const mapStateToProps = state => {
    return {
        fps: state.fpsCounter.fps,
        GWState: state.gameWorldState.GWState
    };
};

const mapDispatchToProps = {
    fpsCounter,
    gameWorldState
};

export default connect(mapStateToProps, mapDispatchToProps)(EngineInitialization);




