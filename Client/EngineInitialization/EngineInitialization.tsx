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
    public moveCountTest: number = 0;
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
        const mapObject = this._mapCreator.createGameLocation(scene);
        scene.add(mapObject);

        const userData = {img: this._testImageMap.hero.src};
        const user = this._player.createPlayer(userData);

        this._AI = new AI(10, 1, 1, 10, 30);
        const enemy = this._AI.createEnemy(position);

        enemyArray.push(enemy);
        scene.add(user, enemy);

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
        loaderOBJ.load('./Client/Models/Marauder.obj', (object) => {
            object.scale.x = 0.3;
            object.scale.y = 0.3;
            object.scale.z = 0.3;
            // object.rotation.x = -Math.PI / 2;
            // object.position.y = -30;
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {

                    child.material.map = textuteModel;

                }
            });
            let OBJECT = object;
            scene.add(OBJECT);
        });

        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.AmbientLight(color, intensity);
        scene.add(light);
        // this.update(renderer, scene, camera,user);
        this.update(renderer, scene, camera, user, enemy, mapObject);
    }

    /**
     * Функция покадрового обновления сцены для отображения всех изменений и анимаций
     * @param renderer
     * @param scene
     * @param camera
     * @param map
     * @param user
     */
    update(renderer, scene, camera, user, enemy, map) {
        requestAnimationFrame(() => {
            this.update(renderer, scene, camera, user, enemy, map);
            // this.update(renderer, scene, camera,user);
        });

        if (this.moveCountTest > 360) {
            this.moveCountTest = 0
        }
        renderer.render(scene, camera);
        this._cameraControls.cameraControl(camera);
        // this._dynamicAnimation.updateMap(map, this.props);
        this._camera.updateCameraGame(camera, this.props);
        this._AI.updateEnemy(enemy, this.moveCountTest);
        this._dynamicAnimation.updateUserAvatar(user, this.props);
        this._dynamicAnimation.objectAnimation(this.props.animations, 3);
        this.moveCountTest++;
        this.lastUserPositionX = user.position.x;
        this.lastUserPositionY = user.position.z;
        this.changePhysics(this._mapCreator.checkCollision(this.lastUserPositionX, this.lastUserPositionY, this.props.direction));
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





