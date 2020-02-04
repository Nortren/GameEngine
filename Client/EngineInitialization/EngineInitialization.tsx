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
        const showCollider = true;
        this._testImageMap = this._mapCreator.parserJSON();
        this.canvas = document.getElementById('canvas');
        this.resize(this.canvas);
        const scene = new THREE.Scene();
        scene.scale.set(1, 1, 1);
        const camera = this._camera.createCamera();

        const renderer = new THREE.WebGLRenderer({canvas: this.canvas});
        renderer.shadowMap.enabled = true;

        const mapObject = this._mapCreator.createGameLocation(scene,showCollider);


        const userData = this._testImageMap.player;
        const playerData = this._player.createPlayer(userData);
        const user = playerData.user;
        const healthLine = playerData.healthLine;
        const userCollaider = playerData.collaider;
        this._AI = new AI(10, 1, 1, 10, 30);


        const enemyData = this._AI.createEnemy(this._testImageMap.enemy,scene,showCollider);

        scene.add(user,healthLine);
        if(showCollider) {
            scene.add(userCollaider);
        }
        this._camera.сameraON(false, camera, this.canvas);

        /*
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
        // scene.add(light);
        // this.update(renderer, scene, camera,user);



        var materials = [
            //делаем каждую сторону своего цвета
            new THREE.MeshBasicMaterial( { transparent: true,opacity : 0 }), // правая сторона
            new THREE.MeshBasicMaterial( { transparent: true,opacity : 0 }), // левая сторона
            new THREE.MeshBasicMaterial( { transparent: true,opacity : 0 }), //верх
            new THREE.MeshBasicMaterial( { transparent: true,opacity : 0 }), // низ
            new THREE.MeshBasicMaterial( { color: 0xED7700 }), // лицевая сторона
            new THREE.MeshBasicMaterial( { color: 0xB5B1AE }) // задняя сторона
        ];

        const boxWidth = 1;
        const boxHeight = 1;
        const boxDepth = 1;
        const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

        const material = new THREE.MeshBasicMaterial({color: 0x44aa88});  // greenish blue


        const colorLight = 0xFFFFFF;
        const intensityLight = 0.4;
        const lightTest = new THREE.PointLight(colorLight, intensityLight);
        lightTest.castShadow = true;
        lightTest.position.set(0, 11, 0);
        // lightTest.target.position.set(-4, 0, -4);


        const cubeSize = 1;
        const cubeGeo = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize);
        const cubeMat = new THREE.MeshPhongMaterial({   side: THREE.DoubleSide,
            transparent: true,opacity : 0});
        const mesh = new THREE.Mesh(cubeGeo, materials);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.position.set( 0, 2, 0 );




        //добавлям свет
        scene.add( lightTest,light.target ,mesh);







        this.update(renderer, scene, camera, playerData, enemyData);
    }

    /**
     * Функция покадрового обновления сцены для отображения всех изменений и анимаций
     * @param renderer
     * @param scene
     * @param camera
     * @param map
     * @param user
     */
    update(renderer, scene, camera, playerData, enemyData) {
        requestAnimationFrame(() => {
            this.update(renderer, scene, camera, playerData, enemyData);
        });


        renderer.render(scene, camera);
        const playerInformation={
            playerX: playerData.collaider.position.x,
            playerZ: playerData.collaider.position.z,
            playerWidth: playerData.collaider.geometry.parameters.width,
            playerHeight: playerData.collaider.geometry.parameters.height,
            playerData:playerData
        };

        this._cameraControls.cameraControl(camera);
        this._camera.updateCameraGame(camera, this.props);


        this._AI.informationAboutWorld(enemyData,playerInformation,this._mapCreator);
        this._dynamicAnimation.updateUserAvatar(playerData, this.props,this._player);
        this._dynamicAnimation.objectAnimation(this.props.animations, 3);



        this.changePhysics(this._mapCreator.checkCollision(playerInformation.playerX,playerInformation.playerZ,
            playerInformation.playerWidth,playerInformation.playerHeight, this.props.direction));

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





