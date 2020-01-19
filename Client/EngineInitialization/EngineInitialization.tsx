import * as React from 'react';
import DinamicAnimation from "../Animation/Dynamic/Dynamic";
import MapCreator from "../MapCreator/MapCreator";
import AI from "../AI/AI";
import * as THREE from "three";
import * as OrbitControls from "three-orbitcontrols";
import {CameraControl} from  "../DevelopersTools/DevelopersTools"
import {testMapJSON} from "./testMap";
/**
 * Главный контрол первичной инициализации движка
 */
export default class EngineInitialization extends React.Component {
    public canvas: object;
    public context: CanvasRenderingContext2D;
    public imgBacground: object;
    public imgHero: object;
    public moveCountTest: number = 0;
    private _testImageMap: object;
    private _dynamicAnimation: DinamicAnimation = new DinamicAnimation(this);
    private _AI: AI = new AI(this);
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
        let position1 = {x: -5, y: 1, z: 0};
        let position2 = {x: 5, y: 1, z: 0};

        const enemyArray = [];

        this._testImageMap = this._mapCreator.parserJSON();
        this.canvas = document.getElementById('canvas');
        this.resize(this.canvas);
        const scene = new THREE.Scene();
        scene.scale.set(1, 1, 1);
        const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 100);

        const renderer = new THREE.WebGLRenderer({canvas: this.canvas});
        camera.position.set(0, 10, 5);
        camera.scale.set(1, 1, 1);





        const mapObject = this._mapCreator.createGameLocation(scene);
        const user = this.createUser();
        const enemy = this._AI.createEnemy(position);
        const enemy1 = this._AI.createEnemy(position1);
        const enemy3 = this._AI.createEnemy(position2);
        enemyArray.push(enemy, enemy1, enemy3)
        scene.add(user, enemy, enemy1, enemy3);
        // this.update(renderer, scene, camera, mapObject, user, enemy);


        var controls = new OrbitControls(camera, this.canvas);
        controls.target.set(0, 0, 0);
        controls.update();

        const planeSize = 100;

        const loader = new THREE.TextureLoader();
        const texture = loader.load(this._testImageMap.map.src);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        const repeats = planeSize / 2;
        texture.repeat.set(repeats, repeats);

        const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
        const planeMat = new THREE.MeshPhongMaterial({
            map: texture,
            // side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(planeGeo, planeMat);
        mesh.rotation.x = Math.PI * -.5;
        scene.add(mesh);


        // const cubeSize = 4;
        // const cubeGeo = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize);
        // const cubeMat = new THREE.MeshPhongMaterial({color: '#8AC'});
        // const mesh1 = new THREE.Mesh(cubeGeo, cubeMat);
        // mesh1.position.set(cubeSize + 1, cubeSize / 2, 0);
        // // scene.add(mesh1);
        //
        //
        // const sphereRadius = 3;
        // const sphereWidthDivisions = 32;
        // const sphereHeightDivisions = 16;
        // const sphereGeo = new THREE.SphereBufferGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
        // const sphereMat = new THREE.MeshPhongMaterial({color: '#CA8'});
        // const mesh2 = new THREE.Mesh(sphereGeo, sphereMat);
        // mesh2.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
        // scene.add(mesh2);

        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.AmbientLight(color, intensity);
        scene.add(light);
        // this.update(renderer, scene, camera,user);
        this.update(renderer, scene, camera, user, enemy,mapObject);
    }

    /**
     * генерируем игрока на карте
     */
    createUser() {
        const loader = new THREE.TextureLoader();

        const userImg = loader.load(this._testImageMap.hero.src);
        userImg.wrapS = userImg.wrapT = THREE.RepeatWrapping;
        userImg.offset.x = 0.78;
        userImg.offset.y = 0.5;
        userImg.repeat.set(0.2, 0.25);
        userImg.magFilter = THREE.NearestFilter;
        let user;
        const heroTexture = new THREE.SpriteMaterial({
            map: userImg
        });
        user = new THREE.Sprite(heroTexture);
        user.scale.set(2, 2, 1);
        user.position.set(1, 0, 1);
        user.center.x = 0;
        user.center.y = 0;
        user.center.z = 0;
        return user;
    }


    /**
     * Функция покадрового обновления сцены для отображения всех изменений и анимаций
     * @param renderer
     * @param scene
     * @param camera
     * @param map
     * @param user
     */
    update(renderer, scene, camera,  user, enemy,map) {
        requestAnimationFrame(() => {
            this.update(renderer, scene, camera,  user, enemy,map);
            // this.update(renderer, scene, camera,user);
        });

        if (this.moveCountTest > 120) {
            this.moveCountTest = 0
        }
        renderer.render(scene, camera);
        this._cameraControls.cameraControl(camera);
        // this._dynamicAnimation.updateMap(map, this.props);
        // this._dynamicAnimation.updateCameraGame(camera, this.props);
        this._AI.updateEnemy(enemy, this.moveCountTest);
        this._dynamicAnimation.updateUserAvatar(user, this.props);
        this._dynamicAnimation.humanoidAnimation(this.props.animations, 3);
        this.moveCountTest++;
        this.lastUserPositionX = user.position.x;
        this.lastUserPositionY = user.position.z;
        // this.changePhysics(this._mapCreator.checkCollision(this.lastUserPositionX, this.lastUserPositionY, this.props.direction));
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





