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
    moveDirection: string;
    attackStatus: boolean;


    create();

    update();

    move();

    attack();

    death();

    changeSocketIOID();
}

interface ISprite {
    src: string,
    numberOfFramesX: number,
    numberOfFramesY: number,
    firstFrameMove: number,
    lastFrameMove: number,
    firstFrameAttack: number,
    lastFrameAttack: number,
    firstFrameDeath: number,
    lastFrameDeath: number,
}

export default class Player implements BasicProperty {
    animation: Dynamic;
    health: number;
    damage: number;
    attackSpeed: number;
    moveSpeed: number;
    attackDistance: number;
    id: number;
    props: object;
    colliderPositionX: number;
    colliderPositionY: number;
    colliderPositionZ: number;
    colliderWidth: number;
    colliderHeight: number;
    colliderLength: number;
    sprite: ISprite;
    collaid: string;
    clientSocketIOID: string;
    moveDirection: string;
    moveContinue: boolean;
    attackStatus: boolean;

    constructor(id: number, health: number, damage: number,
                attackSpeed: number, moveSpeed: number, attackDistance: number,
                colliderPositionX: number, colliderPositionY: number, colliderPositionZ: number,
                colliderWidth: number, colliderHeight: number, colliderLength: number,
                sprite: ISprite, collaid: string) {

        this.props = {};
        this.id = id;
        this.health = health;
        this.damage = damage;
        this.attackSpeed = attackSpeed;
        this.moveSpeed = moveSpeed;
        this.attackDistance = attackDistance;
        this.animation = new Dynamic(this);
        this.colliderPositionX = colliderPositionX;
        this.colliderPositionY = colliderPositionY;
        this.colliderPositionZ = colliderPositionZ;
        this.colliderWidth = colliderWidth;
        this.colliderHeight = colliderHeight;
        this.colliderLength = colliderLength;
        this.sprite = sprite;
        this.collaid = collaid;


        const loader = new THREE.TextureLoader();

        const userImg = loader.load(sprite.src);
        const playerColliderImg = loader.load(collaid);


        let position = {
            x: colliderPositionX,
            y: colliderPositionY,
            z: colliderPositionZ
        };
        this.createEngineUserObject(userImg, position);

        //TODO Это коллайдер от которого по задумке должны были быть тени
        this.createEngineUserCollaid(playerColliderImg, position);
        this.createEngineUserHealthLine();
    }

    /**
     * генерируем игрока на карте
     */
    createPlayer() {
        //Припервичной инициализации нужно корректно отрисовать спрайт игрока
        const userSpriteTextureFrames = this.playerAvatarSprite.material.map;
        this.animation.updateUserAvatar(this.props, this.sprite, userSpriteTextureFrames, this.id);


        return this;
    }


    removingPlayerFromScene(scene) {
        scene.remove(this.playerAvatarSprite, this.playerAvatarSprite, this.collaider)
    }

    /**
     * Метод создания спрайта пользователя
     * @param userData
     * @param userImg
     */
    createEngineUserObject(playerImg: Texture, position) {
        //Зеркально отражение
        playerImg.wrapS = playerImg.wrapT = THREE.MirroredRepeatWrapping;
        playerImg.repeat.set(1 / this.sprite.numberOfFramesX, 1 / this.sprite.numberOfFramesY);

        //TODO Эти значения должны передаваться с сервера т.к от них будет зависеть размер игрока и его правильно позиционирование относительно коллайда
        this.scaleX = 3;
        this.scaleY = 3;

        //Фильтр который создаёт эфект пикселя
        // playerImg.magFilter = THREE.NearestFilter;
        let playerAvatarSprite;
        const heroTexture = new THREE.SpriteMaterial({
            map: playerImg,
            //Посмотреть доку на это
            useScreenCoordinates: false, transparent: true
        });
        playerAvatarSprite = new THREE.Sprite(heroTexture);
        playerAvatarSprite.scale.set(3, 3, 1.0);
        playerAvatarSprite.position.set(position.x,position.y, position.z);
        playerAvatarSprite.center.y = 0;
        this.playerAvatarSprite = playerAvatarSprite;
    }

    /**
     * Создаём колайдер игрока для дальнейшего расчета  физики
     * @param playerColliderImg
     */
    createEngineUserCollaid(playerColliderImg: Texture, position: object) {
        const playerCollaiderGeo = new THREE.BoxBufferGeometry(this.colliderWidth, this.colliderLength, this.colliderHeight);


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
        playerCollaider.position.set(position.x, this.calculatingCorrectHeightCollider(this.colliderPositionY,this.colliderHeight), position.z);
        this.collaider = playerCollaider;
        if (globalVariables.shadow.materialShadow) {
            playerCollaider.castShadow = true;
        }
    }

    /**
     * Вычисляем правилный размер коллайдера относительно оси y
     * @param collaider
     * @param colliderPositionY
     * @param colliderHeight
     */
    calculatingCorrectHeightCollider(colliderPositionY,colliderHeight){
        let yPosition = colliderPositionY+colliderHeight/2;
        return yPosition;

    }

    /**
     * Игрок атакует или использует скилы
     * @param skill
     */
    playerSkillUse(props, enemyArray) {
        if (!props.skillButton) {
            return;
        }
        switch (props.skillButton.nameButton) {
            case 'ButtonAttack':
                this.attack(props, enemyArray);
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

    attack(props, enemyArray) {
        if (props.skillButton.press) {
            for (let key in enemyArray) {
                let collider = enemyArray[key].ColliderMesh;

                let checkX = this.checkDistanceCollisionAxis(this.collaider.position.x, this.colliderWidth, collider.position.x, collider.scale.x, this.attackDistance);
                let checkZ = this.checkDistanceCollisionAxis(this.collaider.position.z, this.colliderHeight, collider.position.z, collider.scale.z, this.attackDistance);

                if (checkX && checkZ) {
                    if (enemyArray[key].enemyHealth <= 0) {
                        enemyArray.splice(key, 1);
                    }
                    if (enemyArray[key]) {
                        enemyArray[key].enemyHealth -= this.damage;
                    }
                }
                if (props.moveX + this.attackDistance || props.moveX + this.attackDistance) {

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
    createEngineUserHealthLine() {
        const material = new THREE.LineBasicMaterial({
            color: 0xff0000,
            linewidth: 10,
        });
        const geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(0, 0, 0));
        geometry.vertices.push(new THREE.Vector3(1, 0, 0));
        const line = new THREE.Line(geometry, material);
        this.healthLine = line;
    }

    /**
     * Обновление состояния игрока
     * @param playerData
     * @param props
     * @param rect
     */
    update(playerServerData: Object, enemyArray) {
        //Текстура спрайта по которой нам нужно отрисовывать Frame
        const userSpriteTextureFrames = this.playerAvatarSprite.material.map;
        this.moveDirection = playerServerData.moveDirection;
        this.moveContinue = playerServerData.moveContinue;
        this.attackStatus = playerServerData.attackStatus;

        this.animation.updateUserAvatar(this, this.sprite, userSpriteTextureFrames);


        let positionPlayer = {x: this.colliderPositionX, z: this.colliderPositionZ};
        let positionHealthLine = this.healthLine.position;
        let playerHealth = this.health;
        let healthLenght = this.calculationHealthLine(playerHealth);
        this.healthLine.scale.x = healthLenght;
        this.healthLine.scale.z = 2;

        positionHealthLine.x = positionPlayer.x;
        positionHealthLine.z = positionPlayer.z;
        positionHealthLine.y = 0;




        this.collaider.position.x =  playerServerData.colliderPositionX;
        this.collaider.position.z =  playerServerData.colliderPositionZ;

        //рисуем героя по центру картинки
        this.playerAvatarSprite.position.x = playerServerData.colliderPositionX;
        //TODO Для спрайта scaleY размер увеличениякартинки для правельного отображения он должен считаться так сделать по нормальному отдельный метод
        this.playerAvatarSprite.position.z = playerServerData.colliderPositionZ+this.scaleY/2;

        this.healthLine.position.x = this.playerAvatarSprite.position.x;
        this.healthLine.position.z = this.playerAvatarSprite.position.z;


        this.playerSkillUse(playerServerData, enemyArray);
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





