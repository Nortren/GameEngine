import * as THREE from "three";
import {globalVariables} from "../GlobalVariables";
import Dynamic from "../Animation/Dynamic/Dynamic";
import {Texture} from "three";

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
     * генерируем игрока на карте
     */
    createPlayer(data: Object) {
        const playerData = data;
        const loader = new THREE.TextureLoader();

        const userImg = loader.load(data.src);
        const playerColliderImg = loader.load(data.collaid);

        this.createEngineUserObject(playerData, userImg);
        this.createEngineUserCollaid(playerData, playerColliderImg);
        this.createEngineUserHealthLine(playerData);

        return playerData;
    }


    /**
     * Метод создания спрайта пользователя
     * @param userData
     * @param userImg
     */
    createEngineUserObject(playerData: Object, playerImg: Texture) {
        playerImg.wrapS = playerImg.wrapT = THREE.RepeatWrapping;
        playerImg.offset.x = 0.78;
        playerImg.offset.y = 0.5;
        playerImg.repeat.set(0.2, 0.2);
        playerImg.magFilter = THREE.NearestFilter;
        let user;
        const heroTexture = new THREE.SpriteMaterial({
            map: playerImg
        });
        user = new THREE.Sprite(heroTexture);
        user.scale.set(2, 2, 1);
        user.position.set(1, 0, 1);
        user.center.y = 0;
        playerData.user = user;
    }

    /**
     * Создаём колайдер игрока для дальнейшего расчета  физики
     * @param playerData
     * @param playerColliderImg
     */
    createEngineUserCollaid(playerData: Object, playerColliderImg: Texture) {
        const playerCollaiderGeo = new THREE.BoxBufferGeometry(playerData.colliderWidth, playerData.colliderLength,playerData.colliderHeight);


        let materials = [
            //делаем каждую сторону своего цвета
            new THREE.MeshBasicMaterial({transparent: true, opacity: 0}), // левая сторона
            new THREE.MeshBasicMaterial({transparent: true, opacity: 0}), // правая сторона
            new THREE.MeshBasicMaterial({transparent: true, opacity: 0}), //зaдняя сторона
            new THREE.MeshBasicMaterial({transparent: true, opacity: 0}), // лицевая сторона
            new THREE.MeshBasicMaterial({transparent: true, opacity: 0}), // верх
            new THREE.MeshBasicMaterial({transparent: true, opacity: 0}) // низ
        ];

        if(globalVariables.collider.showCollider) {
            materials = [
                //делаем каждую сторону своего цвета
                new THREE.MeshBasicMaterial({color: 0xED7700}), // левая сторона
                new THREE.MeshBasicMaterial({color: 0xED7700}), // правая сторона
                new THREE.MeshBasicMaterial({map: playerColliderImg,}), //зaдняя сторона
                new THREE.MeshBasicMaterial({color: 0xED7700}), // лицевая сторона
                new THREE.MeshBasicMaterial({map: playerColliderImg,}), // верх
                new THREE.MeshBasicMaterial({transparent: true, opacity: 0}) // низ
            ];
        }

        const playerCollaider = new THREE.Mesh(playerCollaiderGeo, materials);
        playerCollaider.rotation.x = Math.PI * -.5;
        playerCollaider.position.set(playerData.colliderPositionX, playerData.colliderPositionY, playerData.colliderPositionZ);
        playerData.collaider = playerCollaider;
        playerCollaider.castShadow = true;
    }

    /**
     * Создание полоски жизни персоонажа
     * @param playerData
     */
    createEngineUserHealthLine(playerData: Object) {
        const material = new THREE.LineBasicMaterial({
            color: 0xff0000,
            linewidth: 10,
        });
        const geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(0, 0, 0));
        geometry.vertices.push(new THREE.Vector3(1, 0, 0));
        const line = new THREE.Line(geometry, material);
        playerData.healthLine = line;
        //Линия жизни на основе меша
        /*               const material = new THREE.MeshPhongMaterial(
         {
         color: 0xff0000,
         // map: playerDataIMG,
         // side: THREE.DoubleSide
         });
         const geometry = new THREE.PlaneBufferGeometry(
         playerData.colliderWidth,
         0.25);


         const healthLine = new THREE.Mesh(geometry, material);
         healthLine.rotation.x = Math.PI * -.5;
         healthLine.position.set(playerData.colliderPositionX, playerData.colliderPositionY, playerData.colliderPositionZ);
         playerData.healthLine = healthLine;*/
    }

    /**
     * Обновление состояния игрока
     * @param playerData
     * @param props
     * @param rect
     */
    update(playerData: Object, props: Object, rect: Object) {
        let positionPlayer = playerData.user.position;
        let positionHealthLine = playerData.healthLine.position;
        let playerHealth = playerData.health;
        let healthLenght = this.calculationHealthLine(playerHealth);
        playerData.healthLine.scale.x = healthLenght;
        playerData.healthLine.scale.z = 2;

        positionHealthLine.x = positionPlayer.x;
        positionHealthLine.z = positionPlayer.z;
        positionHealthLine.y = 0;

        //рисуем героя по центру картинки
        playerData.user.material.map.offset.x = rect.x;
        playerData.user.material.map.offset.y = rect.y;
        playerData.user.position.x = props.moveX * -0.01;
        playerData.user.position.z = props.moveZ * -0.01;
        playerData.collaider.position.x = playerData.user.position.x;
        playerData.collaider.position.z = playerData.user.position.z;
        playerData.healthLine.position.x = playerData.user.position.x;
        playerData.healthLine.position.z = playerData.user.position.z;

    }

    /**
     * Расчет жизни персоонажа
     * @param playerHealth
     * @returns {number}
     */
    calculationHealthLine(playerHealth: number) {
        return playerHealth / 100;
    }
}





