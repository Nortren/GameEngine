import * as React from 'react';
import DinamicAnimation from "../Animation/Dynamic/Dynamic";
import MapCreator from "../MapCreator/MapCreator";
import * as THREE from "three";

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
    private _mapCreator: MapCreator = new MapCreator();


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
        this._testImageMap = this._mapCreator.parserJSON();
        this.canvas = document.getElementById('canvas');
        this.resize(this.canvas);
        const scene = new THREE.Scene();
        scene.scale.set(1, 1, 1);
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({canvas: this.canvas});
        camera.position.set(1, 1, 10);
        camera.scale.set(1, 1, 1);

        const mapObject = this._mapCreator.createGameLocation(scene);
        const user = this.createUser();
        const enemy = this.createEnemy();



        scene.add(user, enemy);
        this.update(renderer, scene, camera, mapObject, user, enemy);




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
        user.scale.set(1, 1, 1);
        user.position.set(0, 0, 1);
        user.center.x =1;
        user.center.y =1;
        return user;
    }


    /**
     * генерируем врага на карте
     */
    createEnemy() {
        const loader = new THREE.TextureLoader();
        const enemyColor = 0xff0000;
        const enemyImg = loader.load(this._testImageMap.hero.src);
        enemyImg.wrapS = enemyImg.wrapT = THREE.RepeatWrapping;
        enemyImg.offset.x = 0.78;
        enemyImg.offset.y = 0.5;
        enemyImg.repeat.set(0.2, 0.25);
        enemyImg.magFilter = THREE.NearestFilter;

        const enemyTexture = new THREE.SpriteMaterial({
            map: enemyImg,
            color: enemyColor
        });
        let enemy;
        enemy = new THREE.Sprite(enemyTexture);
        enemy.scale.set(1, 1, 1);
        enemy.position.set(5, 0, 0);
        return enemy;
    }

    /**
     * Функция покадрового обновления сцены для отображения всех изменений и анимаций
     * @param renderer
     * @param scene
     * @param camera
     * @param map
     * @param user
     */
    update(renderer, scene, camera, mapObject, user, enemy) {
        requestAnimationFrame(() => {
            this.update(renderer, scene, camera, mapObject, user, enemy)
        });

        if (this.moveCountTest > 120) {
            this.moveCountTest = 0
        }
        renderer.render(scene, camera);
        this.changePhysics(this._mapCreator.checkCollision(this.lastUserPositionX,this.lastUserPositionY));
        // this._dynamicAnimation.updateMap(map, this.props);
        this._dynamicAnimation.updateCameraGame(camera, this.props);
        this._dynamicAnimation.updateEnemy(enemy, mapObject[0], this.props, this.moveCountTest);
        this._dynamicAnimation.updateUserAvatar(user, this.props);
        this._dynamicAnimation.humanoidAnimation(this.props.animations, 3);
        this.moveCountTest++;
        this.lastUserPositionX = user.position.x;
        this.lastUserPositionY = user.position.y;
    }

    changePhysics(result){
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





