import * as React from 'react';
import DinamicAnimation from "../Animation/Dynamic/Dynamic";
import MapCreator from "../MapCreator/MapCreator";
import AI from "../AI/AI";
import * as THREE from "three";
import * as OBJLoader from 'three-obj-loader';
import Player from "../Player/Player"
import Camera from "../Camera/Camera";

import {CameraControl} from "../DevelopersTools/DevelopersTools"
import {testMapJSON} from "./testMap";

/**
 * Главный контрол первичной инициализации движка
 */
export default class EngineInitialization extends React.Component {
    public canvas: object;
    public context: CanvasRenderingContext2D;
    private _testImageMap: object;
    private _dynamicAnimation: DinamicAnimation = new DinamicAnimation(this);
    private _player: Player = new Player();
    private _camera: Camera = new Camera();
    private _mapCreator: MapCreator = new MapCreator();
    private _cameraControls: CameraControl = new CameraControl();

    constructor(props: object) {
        super(props);
        this.changePhysics = this.changePhysics.bind(this);
        this.state = {
            moveX: 0,
            moveY: 0, countMove: 0,
            moveXBoll: true
        };
    }

    componentDidMount() {
        let position = {x: 5, y: 1, z: 0};

        const enemyArray = [];

        this._testImageMap = this._mapCreator.parserJSON();
        this.canvas = document.getElementById('canvas');
        this.resize(this.canvas);
        const scene = new THREE.Scene();
        scene.scale.set(1, 1, 1);
        const camera = this._camera.createCamera();

        const renderer = new THREE.WebGLRenderer({canvas: this.canvas});
        const mapObject = this._mapCreator.createGameLocation(scene,true);


        const userData = this._testImageMap.hero;
        const playerData = this._player.createPlayer(userData);
        const user = playerData.user;
        const userCollaider = playerData.collaider;
        this._AI = new AI(10, 1, 1, 10, 30);
        const enemy = this._AI.createEnemy(position);

        enemyArray.push(enemy);
        scene.add(user, enemy,userCollaider);

        this._camera.сameraON(false, camera, this.canvas);


        OBJLoader(THREE);
        let loaderOBJ = new THREE.OBJLoader();

        let textuteModel = new THREE.Texture();
        const loader = new THREE.TextureLoader();
        const userImg = loader.load('./Client/image/ground.jpg', (img) => {
            textuteModel.image = img, textuteModel.needsUpdate = true;
        });
        const heroTexture = new THREE.SpriteMaterial({
            map: userImg
        });
   /*     loaderOBJ.load('./Client/Models/Marauder.obj', (object) => {
            object.scale.x = 0.2;
            object.scale.y = 0.2;
            object.scale.z = 0.2;
            // object.rotation.x = -Math.PI / 2;
            // object.position.y = -30;
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {

                    child.material.map = textuteModel;

                }
            });
            let OBJECT = object;
            scene.add(OBJECT);
        });*/

        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.AmbientLight(color, intensity);
        scene.add(light);
        // this.update(renderer, scene, camera,user);
        this.update(renderer, scene, camera, playerData, enemy, mapObject);
    }

    /**
     * Функция покадрового обновления сцены для отображения всех изменений и анимаций
     * @param renderer
     * @param scene
     * @param camera
     * @param map
     * @param user
     */
    update(renderer, scene, camera, playerData, enemy) {
        requestAnimationFrame(() => {
            this.update(renderer, scene, camera, playerData, enemy);
            // this.update(renderer, scene, camera,user);
        });


        renderer.render(scene, camera);
        this._cameraControls.cameraControl(camera);
        this._camera.updateCameraGame(camera, this.props);
        this._AI.updateEnemy(enemy);
        this._dynamicAnimation.updateUserAvatar(playerData.user,playerData.collaider, this.props);
        this._dynamicAnimation.objectAnimation(this.props.animations, 3);

        const playerX = playerData.collaider.position.x;
        const playerZ = playerData.collaider.position.z;
        const playerWidth = playerData.collaider.geometry.parameters.width;
        const playerHeight = playerData.collaider.geometry.parameters.height;
        this.lastUserPositionZ = playerData.collaider.position.z - playerData.collaider.geometry.parameters.height;
        this.changePhysics(this._mapCreator.checkCollision(playerX,playerZ,playerWidth,playerHeight, this.props.direction));
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
            <canvas id="canvas"/>
        );
    }
}





