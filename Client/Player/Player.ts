import * as THREE from "three";
import MapCreator from "../MapCreator/MapCreator";
import Dynamic from "../Animation/Dynamic/Dynamic";

export default class Player {
    _count: number;
    props: object;
    animation: Dynamic = new Dynamic();
    _animationTimer: number;
    fixPoint: number;


    radiusOfDetection: number;
    moveSpeed: number;
    attackSpeed: number;
    damage: number;
    amountOfHealth: number;

    private _testImageMap: object;
    private _mapCreator: MapCreator = new MapCreator();

    constructor(amountOfHealth,damage,attackSpeed,moveSpeed,radiusOfDetection) {
        this._count = 0;
        this.radiusOfDetection = radiusOfDetection;
        this.moveSpeed = moveSpeed;
        this.attackSpeed = attackSpeed;
        this.damage = damage;
        this.amountOfHealth = amountOfHealth;


        this._animationTimer = 0;
        this.fixPoint = 0;
    }

    /**
     * Метод запуска анимации персоонажа
     * При первичной инициализации движка запскаем анимацию персоонажа и обновляем ее состояние от изменения state
     */
    objectAnimation(animation, animationSpeed) {
        if (this._animationTimer > animationSpeed && animation) {
            this._count++;
            this._animationTimer = 0;
        }
        this._animationTimer++;
    }

    /**
     * генерируем игрока на карте
     */
    createPlayer(heroData) {
        const playerData = {};
        const loader = new THREE.TextureLoader();

        const userImg = loader.load(heroData.src);
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
        user.center.y = 0;
        playerData.user = user;

        let playerDataIMG = loader.load(heroData.collaid);
        const playerCollaiderGeo = new THREE.PlaneBufferGeometry(heroData.colliderWidth, heroData.colliderHeight);
        const playerCollaiderMat = new THREE.MeshPhongMaterial({
            map: playerDataIMG,
            side: THREE.DoubleSide,
        });
        const playerCollaider = new THREE.Mesh(playerCollaiderGeo,playerCollaiderMat);
        playerCollaider.rotation.x = Math.PI * -.5;
        playerCollaider.position.set(heroData.colliderPositionX, heroData.colliderPositionY, heroData.colliderPositionZ);
        playerData.collaider = playerCollaider;
        return playerData;
    }
}





