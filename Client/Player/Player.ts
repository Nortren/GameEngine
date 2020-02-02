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

    constructor(amountOfHealth, damage, attackSpeed, moveSpeed, radiusOfDetection) {
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
    createPlayer(playerData) {
        const userData = {};
        const loader = new THREE.TextureLoader();

        const userImg = loader.load(playerData.src);
        userImg.wrapS = userImg.wrapT = THREE.RepeatWrapping;
        userImg.offset.x = 0.78;
        userImg.offset.y = 0.5;
        userImg.repeat.set(0.2, 0.2);
        userImg.magFilter = THREE.NearestFilter;
        let user;
        const heroTexture = new THREE.SpriteMaterial({
            map: userImg
        });
        user = new THREE.Sprite(heroTexture);
        user.scale.set(2, 2, 1);
        user.position.set(1, 0, 1);
        user.center.y = 0;
        userData.user = user;

        let playerDataIMG = loader.load(playerData.collaid);
        const playerCollaiderGeo = new THREE.PlaneBufferGeometry(playerData.colliderWidth, playerData.colliderHeight);
        const playerCollaiderMat = new THREE.MeshPhongMaterial({
            map: playerDataIMG,
            side: THREE.DoubleSide,
        });
        const playerCollaider = new THREE.Mesh(playerCollaiderGeo, playerCollaiderMat);
        playerCollaider.rotation.x = Math.PI * -.5;
        playerCollaider.position.set(playerData.colliderPositionX, playerData.colliderPositionY, playerData.colliderPositionZ);
        userData.collaider = playerCollaider;
        userData.playerData = playerData;


        const material = new THREE.LineBasicMaterial({color: 0xff0000});
        const geometry = new THREE.Geometry();

        geometry.vertices.push(new THREE.Vector3(0, 0, 0));
        geometry.vertices.push(new THREE.Vector3(1, 0, 0));
        geometry.vertices.push(new THREE.Vector3(0, 0, 0));

        const line = new THREE.Line(geometry, material);
        userData.healthLine = line;

        return userData;
    }

    update(playerInformation) {
        let positionPlayer = playerInformation.playerData.user.position;
        let positionHealthLine = playerInformation.playerData.healthLine.position;
        let playerHealth = playerInformation.playerData.playerData.health;
        let healthLenght = this.calculationHealthLine(playerHealth);
        playerInformation.playerData.healthLine.scale.x = healthLenght;

        positionHealthLine.x = positionPlayer.x;
        positionHealthLine.z = positionPlayer.z;
        positionHealthLine.y = 0;

    }

    calculationHealthLine(playerHealth) {
        return playerHealth / 100;
    }
}





