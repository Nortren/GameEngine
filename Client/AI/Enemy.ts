import * as THREE from "three";
import MapCreator from "../MapCreator/MapCreator";
import Dynamic from "../Animation/Dynamic/Dynamic";
import {globalVariables} from "../GlobalVariables";
import {Scene, Texture, Mesh, Sprite, Line, TextureLoader} from "three";

interface IPosition {
    x: number;
    y: number;
    z: number;
}

interface BasicPropertyEnemy {
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
    collaid: string;
    directionMove: string;
    attackStatus: boolean;

    death(scene: Scene, enemyData: Enemy): void;
}

interface IEnemySpriteData {
    firstFrameAttack: number;
    firstFrameDeath: number;
    firstFrameMove: number;
    frameMoveDown: number;
    frameMoveDownLeft: number;
    frameMoveDownRight: number;
    frameMoveLeft: number;
    frameMoveRight: number;
    frameMoveUp: number;
    frameMoveUpLeft: number;
    frameMoveUpRight: number;
    lastFrameAttack: number;
    lastFrameDeathX: number;
    lastFrameMove: number;
    numberOfFramesX: number;
    numberOfFramesY: number;
    src: "./Client/image/Player_v0_0_4.png"
}

interface IPosition {
    x: number;
    y: number;
    z: number;
}

/**
 * Класс создающий сущность бота на клиенте , с необходимым набором данных для валидной работы в движке
 */
export default class Enemy implements BasicPropertyEnemy {
    _count: number;
    _counterOfDeath: number;
    props: object;
    animation: Dynamic = new Dynamic();
    _animationTimer: number;
    fixPoint: number;

    id: number;
    sprite: IEnemySpriteData;
    collaid: string;
    scope: string;
    scopeRadius: number;
    colliderPositionX: number;
    colliderPositionY: number;
    colliderPositionZ: number;
    colliderWidth: number;
    colliderHeight: number;
    colliderLength: number;
    pursuitZone: number;
    health: number;
    damage: number;
    attackDistance: number;
    attackSpeed: number;
    moveSpeed: number;
    directionMove: string;
    attackStatus: boolean;
    scopeCircleMesh: Mesh;
    colliderMesh: Mesh;
    persecutionRadius: Mesh;
    moveCountTest: number;
    _eventCount: number;
    lastStatusAttack: number;
    enemySprite: Sprite;
    enemyHealthLine: Line;
    scaleX: number;
    scaleY: number;

    constructor(id: number, sprite: IEnemySpriteData, collaid: string, scope: Texture, scopeRadius: number, colliderPositionX: number,
                colliderPositionY: number, colliderPositionZ: number,
                colliderWidth: number, colliderHeight: number, colliderLength: number,
                pursuitZone: number, persecutionRadius: Texture, health: number,
                damage: number, attackDistance: number,
                attackSpeed: number, moveSpeed: number) {

        this.id = id;
        this.sprite = sprite;
        this.collaid = collaid;
        this.scopeRadius = scopeRadius;
        this.colliderPositionX = colliderPositionX;
        this.colliderPositionY = colliderPositionY;
        this.colliderPositionZ = colliderPositionZ;
        this.colliderWidth = colliderWidth;
        this.colliderHeight = colliderHeight;
        this.colliderLength = colliderLength;
        this.pursuitZone = pursuitZone;
        this.health = health;
        this.damage = damage;
        this.attackDistance = attackDistance;
        this.attackSpeed = attackSpeed;
        this.moveSpeed = moveSpeed;

        const loader = new THREE.TextureLoader();

        this.scopeCircleMesh = this.createEnemySupportMesh(scopeRadius, scopeRadius, scope, {
            x: colliderPositionX,
            y: colliderPositionY,
            z: colliderPositionZ
        }, loader);
        this.colliderMesh = this.createEnemyCollider(colliderWidth, colliderLength, colliderHeight, collaid, {
            x: colliderPositionX,
            y: colliderPositionY,
            z: colliderPositionZ
        }, loader);
        this.persecutionRadius = this.createEnemySupportMesh(pursuitZone, pursuitZone, persecutionRadius, {
            x: colliderPositionX,
            y: colliderPositionY,
            z: colliderPositionZ
        }, loader);
        this.createEnemyHealthLine();
        this.createEnemySprite({x: colliderPositionX, y: colliderPositionY, z: colliderPositionZ}, sprite, loader);


        this._count = 0;
        this._counterOfDeath = 1;
        this.moveCountTest = 0;
        this._animationTimer = 0;
        this._eventCount = 0;
        this.fixPoint = 0;
    }

    /**
     * генерируем врага на карте
     */
    createEnemy(scene: Scene) {
        scene.add(this.enemySprite, this.enemyHealthLine);
        if (globalVariables.collider.showColliderDynamick) {
            scene.add(this.colliderMesh);
        }

        if (globalVariables.collider.additionalData) {
            scene.add(this.scopeCircleMesh, this.persecutionRadius);
        }

    }

    createEnemySprite(position: object, sprite:IEnemySpriteData, loader:TextureLoader): void {
        const enemyImg = loader.load(sprite.src);
        enemyImg.wrapS = enemyImg.wrapT = THREE.MirroredRepeatWrapping;
        enemyImg.repeat.set(1 / this.sprite.numberOfFramesX, 1 / this.sprite.numberOfFramesY);
        //Пиксельный фильтр
        // enemyImg.magFilter = THREE.NearestFilter;

        const enemyColor = 0xff0000;
        const enemyTexture = new THREE.SpriteMaterial({
            map: enemyImg,
            color: enemyColor,
            transparent: true
        });

        //TODO Эти значения должны передаваться с сервера т.к от них будет зависеть размер игрока и его правильно позиционирование относительно коллайда
        this.scaleX = 3;
        this.scaleY = 3;

        this.enemySprite = new THREE.Sprite(enemyTexture);
        this.enemySprite.scale.set(this.scaleX, this.scaleY, 1.0);
        this.enemySprite.position.set(position.x, position.y, position.z);
        this.enemySprite.center.y = 0;
    }


    createEnemyHealthLine() {
        const material = new THREE.LineBasicMaterial({
            color: 0xff0000,
            linewidth: 10,
        });
        const geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(0, 0, 0));
        geometry.vertices.push(new THREE.Vector3(1, 0, 0));
        const line = new THREE.Line(geometry, material);
        this.enemyHealthLine = line;
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
         enemyData.healthLine = healthLine;*/
    }


    createEnemySupportMesh(width: number, height: number, scope: Texture, position: IPosition, loader) {
        const texture = loader.load(scope);
        const x = position.x || 0;
        const y = position.y || 0;
        const z = position.z || 0;

        const playerMeshGeo = new THREE.PlaneBufferGeometry(width, height);
        const playerMeshMat = new THREE.MeshPhongMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true
        });
        const Mesh = new THREE.Mesh(playerMeshGeo, playerMeshMat);
        Mesh.rotation.x = Math.PI * -.5;
        Mesh.position.set(x, y, z);

        return Mesh;
    }

    createEnemyCollider(width: number, length: number, height: number, collaid: string, position: IPosition, loader) {
        const texture = loader.load(collaid);
        const x = position.x || 0;
        const y = position.y || 0;
        const z = position.z || 0;

        const playerMeshGeo = new THREE.BoxBufferGeometry(width, length, height);
        let materials = [
            //делаем каждую сторону своего цвета
            new THREE.MeshBasicMaterial({transparent: true, opacity: 0}), // левая сторона
            new THREE.MeshBasicMaterial({transparent: true, opacity: 0}), // правая сторона
            new THREE.MeshBasicMaterial({transparent: true, opacity: 0}), //зaдняя сторона
            new THREE.MeshBasicMaterial({transparent: true, opacity: 0}), // лицевая сторона
            new THREE.MeshBasicMaterial({transparent: true, opacity: 0}), // верх
            new THREE.MeshBasicMaterial({transparent: true, opacity: 0}) // низ
        ];

        if (globalVariables.collider.showCollider) {
            materials = [
                //делаем каждую сторону своего цвета
                new THREE.MeshBasicMaterial({color: 0xED7700}), // левая сторона
                new THREE.MeshBasicMaterial({color: 0xED7700}), // правая сторона
                new THREE.MeshBasicMaterial({map: texture,}), //зaдняя сторона
                new THREE.MeshBasicMaterial({color: 0xED7700}), // лицевая сторона
                new THREE.MeshBasicMaterial({map: texture,}), // верх
                new THREE.MeshBasicMaterial({transparent: true, opacity: 0}) // низ
            ];
        }
        const Mesh = new THREE.Mesh(playerMeshGeo, materials);
        Mesh.rotation.x = Math.PI * -.5;
        Mesh.position.set(x, this.calculatingCorrectHeightCollider(y, height), z);
        if (globalVariables.shadow.materialShadow) {
            Mesh.castShadow = true;
        }
        return Mesh;
    }

    /**
     * Вычисляем правилный размер коллайдера относительно оси y
     * @param colliderPositionY
     * @param colliderHeight
     */
    calculatingCorrectHeightCollider(colliderPositionY, colliderHeight) {
        return colliderPositionY + colliderHeight / 2;

    }

    //Метод который обновляет позицию item привязанных к боту
    updateEnemyVisualDate(enemyData: Mesh, enemy: Enemy) {
        enemyData.position.x = enemy.colliderPositionX;
        enemyData.position.z = enemy.colliderPositionZ;
    }

    //TODO сделать нормально сейчас высчитываем положения по Z дляспрайта таким образом чтоб он нормально распологался относительно коллайда
    updateEnemyVisualSpriteDate(enemySprite: Sprite, enemy: Enemy) {
        enemySprite.position.x = enemy.colliderPositionX;
        enemySprite.position.z = enemy.colliderPositionZ + this.scaleY / 2;
    }

    /**
     * текущее состояние ирового мира  чтоб бот мог в нём ориентироваться
     * @param enemyData
     * @param playerInformation
     * @param mapData
     * @param scene
     */
    informationAboutWorld(enemyData: Enemy, playerInformation: object, mapData: MapCreator, scene) {
        this.updateEnemyVisualDate(enemyData.scopeCircleMesh, enemyData);
        this.updateEnemyVisualDate(enemyData.colliderMesh, enemyData);
        this.updateEnemyVisualSpriteDate(enemyData.enemySprite, enemyData);
        this.updateHealthLine(enemyData);


        this.animationEnemyAvatarForPositionServer(enemyData, scene);

    }

    animationSpriteMove(titleCountX, titleCountY, numberOfFrames) {
        let spriteOffsets = [];
        let xPosition = numberOfFrames * titleCountX;
        let yPosition = numberOfFrames * titleCountY;
        spriteOffsets.push({x: titleCountX, y: yPosition});

        return spriteOffsets[0];
    }

    animationSpriteAttack(titleCountX, titleCountY, numberOfFrames) {
        let spriteOffsets = [];
        let xPosition = numberOfFrames * titleCountX;
        let yPosition = (numberOfFrames) * titleCountY;
        spriteOffsets.push({x: titleCountX, y: yPosition});

        return spriteOffsets[0];
    }

    animationSpriteDeath(titleCountX, titleCountY, numberOfFrames) {
        let spriteOffsets = [];
        let xPosition = numberOfFrames * titleCountX;
        let yPosition = (numberOfFrames) * titleCountY;
        spriteOffsets.push({x: xPosition, y: titleCountY});

        return spriteOffsets[0];
    }

    /**
     * Анимация врагов по данным с сервера(разворот в необходимую сторону, движение)
     * @param enemyData
     * @param scene
     */
    animationEnemyAvatarForPositionServer(enemyData, scene) {

        //Шаг фрэйма по оси X и Y
        const spriteData = enemyData.sprite;
        const frameToX = 1 / spriteData.numberOfFramesX;
        const frameToY = 1 / spriteData.numberOfFramesY;

        //Задержка анимации в данном случае используем ее чтоб красиво отобразить анимацию смерти бота
        let delay = 2;

        //TODO В данном случаи цифра три показывает что последние 3 кадра будут выполняться с гигантской задержкой(Надо чтоб это значение было указанно на сервере)
        if (spriteData.lastFrameDeathX - 3 <= this._counterOfDeath) {
            delay = 5;
        }

        this._animationTimer++;
        this._count++;

        let rect = this.animationSpriteMove(frameToX * spriteData.frameMoveRight, frameToY, this._count);


        if (this.attackStatus && this._count > spriteData.lastFrameAttack) {
            this._count = spriteData.firstFrameAttack;
        }
        if (this._count > enemyData.sprite.lastFrameMove && !this.attackStatus) {
            this._count = enemyData.sprite.firstFrameMove;
        }

        if (this.attackStatus) {
            rect = this.animationSpriteAttack(frameToX * this.lastStatusAttack, frameToY, this._count);

        }

        if (this.directionMove === "LEFT") {
            this.lastStatusAttack = spriteData.frameMoveLeft;
            rect = this.animationSpriteMove(frameToX * spriteData.frameMoveLeft, frameToY, this._count);
        }
        if (this.directionMove === "RIGHT") {
            this.lastStatusAttack = spriteData.frameMoveRight;
            rect = this.animationSpriteMove(frameToX * spriteData.frameMoveRight, frameToY, this._count);
        }
        if (this.directionMove === "UP") {
            this.lastStatusAttack = spriteData.frameMoveUp;
            rect = this.animationSpriteMove(frameToX * spriteData.frameMoveUp, frameToY, this._count);
        }
        if (this.directionMove === "UP_LEFT") {
            this.lastStatusAttack = spriteData.frameMoveUpLeft;
            rect = this.animationSpriteMove(frameToX * spriteData.frameMoveUpLeft, frameToY, this._count);
        }
        if (this.directionMove === "UP_RIGHT") {
            this.lastStatusAttack = spriteData.frameMoveUpRight;
            rect = this.animationSpriteMove(frameToX * spriteData.frameMoveUpRight, frameToY, this._count);
        }
        if (this.directionMove === "DOWN") {
            this.lastStatusAttack = spriteData.frameMoveDown;
            rect = this.animationSpriteMove(frameToX * spriteData.frameMoveDown, frameToY, this._count);
        }
        if (this.directionMove === "DOWN_LEFT") {
            this.lastStatusAttack = spriteData.frameMoveDownLeft;
            rect = this.animationSpriteMove(frameToX * spriteData.frameMoveDownLeft, frameToY, this._count);
        }
        if (this.directionMove === "DOWN_RIGHT") {
            this.lastStatusAttack = spriteData.frameMoveDownRight;
            rect = this.animationSpriteMove(frameToX * spriteData.frameMoveDownRight, frameToY, this._count);
        }


        if (this.health <= 0) {

            if (this._counterOfDeath < spriteData.lastFrameDeathX) {
                //Мы инкрементируем счетчик смерти если выполняется условие(т.е соответствие с указанной задержкой)
                if (this._animationTimer % delay === 0) {
                    this._counterOfDeath++;
                }
                requestAnimationFrame(() => {
                    this.animationEnemyAvatarForPositionServer(enemyData, scene);
                });
            } else {
                this.death(scene, enemyData);
            }

            rect = this.animationSpriteDeath(frameToX, frameToY * spriteData.firstFrameDeath, this._counterOfDeath);

        }

        enemyData.enemySprite.material.map.offset.x = rect.x;
        enemyData.enemySprite.material.map.offset.y = rect.y;

    }

    updateHealthLine(enemyData) {

        enemyData.enemyHealthLine.scale.x = enemyData.health / 100;
        enemyData.enemyHealthLine.scale.z = 2;
        this.updateEnemyVisualDate(enemyData.enemyHealthLine, enemyData.colliderMesh);

    }


    death(scene: Scene, enemyData: Enemy): void {
        scene.remove(enemyData.scopeCircleMesh, enemyData.colliderMesh, enemyData.persecutionRadius, enemyData.enemyHealthLine, enemyData.enemySprite);
    }
}


