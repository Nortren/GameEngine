import * as THREE from "three";
import {globalVariables} from "../GlobalVariables";
import Dynamic from "../Animation/Dynamic/Dynamic";
import {Texture} from "three";
interface BasicProperty {
    id: number;
    health: number;
    damage: number;
    attackSpeed: number;
    moveSpeed: number;
    attackDistance: number;
    colliderPositionX: number;
    colliderPositionY: number;
    colliderPositionZ: number;
    colliderWidth: number;
    colliderHeight: number;
    colliderLength: number;
    src: string;
    collaid: string;
    clientSocketIOID: string;
    create();
    update();
    move();
    attack();
    death();
    changeSocketIOID();
}
export default class Player implements BasicProperty  {
    name: string;
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


    constructor(id: number, health: number, damage: number,
                attackSpeed: number, moveSpeed: number, attackDistance: number,
                colliderPositionX: number, colliderPositionY: number, colliderPositionZ: number,
                colliderWidth: number, colliderHeight: number, colliderLength: number,
                src: string, collaid: string) {


        this.id = id;
        this.health = health;
        this.damage = damage;
        this.attackSpeed = attackSpeed;
        this.moveSpeed = moveSpeed;
        this.attackDistance = attackDistance;

        this.colliderPositionX = colliderPositionX;
        this.colliderPositionY = colliderPositionY;
        this.colliderPositionZ = colliderPositionZ;
        this.colliderWidth = colliderWidth;
        this.colliderHeight = colliderHeight;
        this.colliderLength = colliderLength;
        this.src = src;
        this.collaid = collaid;



        this.name = name;
        this._count = 0;

        this._animationTimer = 0;
        this.fixPoint = 0;


        this.playerData = this;
        const loader = new THREE.TextureLoader();

        const userImg = loader.load(src);
        const playerColliderImg = loader.load(collaid);


        let position = {
            x: colliderPositionX,
            y: colliderPositionY,
            z: colliderPositionZ
        };
        this.createEngineUserObject(this.playerData, userImg, position);
        this.createEngineUserCollaid(this.playerData, playerColliderImg, position);
        this.createEngineUserHealthLine(this.playerData);
    }

    /**
     * генерируем игрока на карте
     */
    createPlayer(dataServer: object) {
        return this.playerData;
    }


    /**
     * Метод создания спрайта пользователя
     * @param userData
     * @param userImg
     */
    createEngineUserObject(playerData: Object, playerImg: Texture, position) {
        playerImg.wrapS = playerImg.wrapT = THREE.RepeatWrapping;
        playerImg.offset.x = 0.78;
        playerImg.offset.y = 0.5;
        playerImg.repeat.set(0.2, 0.2);
        playerImg.magFilter = THREE.NearestFilter;
        let playerAvatarSprite;
        const heroTexture = new THREE.SpriteMaterial({
            map: playerImg
        });
        playerAvatarSprite = new THREE.Sprite(heroTexture);
        playerAvatarSprite.scale.set(2, 2, 1);
        playerAvatarSprite.position.set(position.x, 0, position.z);
        playerAvatarSprite.center.y = 0;
        playerData.playerAvatarSprite = playerAvatarSprite;
    }

    /**
     * Создаём колайдер игрока для дальнейшего расчета  физики
     * @param playerData
     * @param playerColliderImg
     */
    createEngineUserCollaid(playerData: Object, playerColliderImg: Texture, position: object) {
        const playerCollaiderGeo = new THREE.BoxBufferGeometry(playerData.colliderWidth, playerData.colliderLength, playerData.colliderHeight);


        let materials = [
            //делаем каждую сторону своего цвета
            new THREE.MeshBasicMaterial({transparent: true, opacity: 0}), // левая сторона
            new THREE.MeshBasicMaterial({transparent: true, opacity: 0}), // правая сторона
            new THREE.MeshBasicMaterial({transparent: true, opacity: 0}), //зaдняя сторона
            new THREE.MeshBasicMaterial({transparent: true, opacity: 0}), // лицевая сторона
            new THREE.MeshBasicMaterial({transparent: true, opacity: 0}), // верх
            new THREE.MeshBasicMaterial({transparent: true, opacity: 0}) // низ
        ];

        if (globalVariables.collider.showColliderDynamick) {
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
        playerCollaider.position.set(position.x, playerData.colliderPositionY, position.z);
        playerData.collaider = playerCollaider;
        if (globalVariables.shadow.materialShadow) {
            playerCollaider.castShadow = true;
        }
    }

    /**
     * Игрок атакует или использует скилы
     * @param skill
     */
    playerSkillUse(props, playerData, enemyArray) {
        if (!props.skillButton) {
            return;
        }
        switch (props.skillButton.nameButton) {
            case 'ButtonAttack':
                this.attack(props, playerData, enemyArray);
                break;
            case 'ButtonSkills_1':
                this.useSkill(props);
                break;
            case 'ButtonSkills_2':
                this.useSkill(props);
                break;
            case 'ButtonSkills_3':
                this.useSkill(props);
                break;

        }

    }

    attack(props, playerData, enemyArray) {

        if (props.skillButton.press) {
            for (let key in enemyArray) {
                let collider = enemyArray[key].ColliderMesh;

                let checkX = this.checkDistanceCollisionAxis(playerData.collaider.position.x, playerData.colliderWidth, collider.position.x, collider.scale.x, playerData.attackDistance);
                let checkZ = this.checkDistanceCollisionAxis(playerData.collaider.position.z, playerData.colliderHeight, collider.position.z, collider.scale.z, playerData.attackDistance);

                if (checkX && checkZ) {
                    if (enemyArray[key].enemyHealth <= 0) {
                        enemyArray.splice(key, 1);
                    }
                    if (enemyArray[key]) {
                        enemyArray[key].enemyHealth -= playerData.damage;
                    }
                }
                if (props.moveX + playerData.attackDistance || props.moveX + playerData.attackDistance) {

                }
            }

        }

    }

    useSkill(skill) {
        console.log(skill.nameButton, skill.press)
    }


    checkDistanceCollisionAxis(playerPositionAxis, enemySize, positionCollision, sizeCollision, attackDistance) {
        if ((playerPositionAxis + enemySize * 0.5 + attackDistance >= positionCollision - sizeCollision) &&
            (playerPositionAxis - enemySize * 0.5 - attackDistance <= positionCollision + sizeCollision)) {
            return true;
        }
        return false;
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
    }

    /**
     * Обновление состояния игрока
     * @param playerData
     * @param props
     * @param rect
     */
    update(playerData: Object, props: Object, enemyArray) {


        let rect = this.animation.updateUserAvatar(props);

        playerData = playerData.playerData;
        let positionPlayer = {x: playerData.colliderPosit, z: playerData.colliderPositionZ};
        let positionHealthLine = playerData.healthLine.position;
        let playerHealth = playerData.health;
        let healthLenght = this.calculationHealthLine(playerHealth);
        playerData.healthLine.scale.x = healthLenght;
        playerData.healthLine.scale.z = 2;

        positionHealthLine.x = positionPlayer.x;
        positionHealthLine.z = positionPlayer.z;
        positionHealthLine.y = 0;

        //рисуем героя по центру картинки
        playerData.playerAvatarSprite.material.map.offset.x = rect.x;
        playerData.playerAvatarSprite.material.map.offset.y = rect.y;
        playerData.playerAvatarSprite.position.x = props.moveX;
        playerData.playerAvatarSprite.position.z = props.moveZ;
        playerData.collaider.position.x = playerData.playerAvatarSprite.position.x;
        playerData.collaider.position.z = playerData.playerAvatarSprite.position.z;
        playerData.healthLine.position.x = playerData.playerAvatarSprite.position.x;
        playerData.healthLine.position.z = playerData.playerAvatarSprite.position.z;


        this.playerSkillUse(props, playerData, enemyArray);
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





