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

interface ISpritePosition {
    x: number;
    y: number;
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
    move(spriteData: IEnemySpriteData, frameToX: number, frameToY: number): ISpritePosition
    death(spriteData, delay, enemyData, scene, frameToX, frameToY): void;
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
     * Метод Генерации врага на карте
     * @param scene
     */
    createEnemy(scene: Scene): void {
        scene.add(this.enemySprite, this.enemyHealthLine);
        if (globalVariables.collider.showColliderDynamick) {
            scene.add(this.colliderMesh);
        }

        if (globalVariables.collider.additionalData) {
            scene.add(this.scopeCircleMesh, this.persecutionRadius);
        }

    }

    createEnemySprite(position: IPosition, sprite: IEnemySpriteData, loader: TextureLoader): void {
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


    createEnemyHealthLine(): void {
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


    createEnemySupportMesh(width: number, height: number, scope: Texture, position: IPosition, loader): Mesh {
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

    createEnemyCollider(width: number, length: number, height: number, collaid: string, position: IPosition, loader): Mesh {
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
    calculatingCorrectHeightCollider(colliderPositionY, colliderHeight): number {
        return colliderPositionY + colliderHeight / 2;
    }

    /**
     * Метод обновления позицию item привязанных к боту
     * @param enemyData
     * @param enemy
     */
    updateEnemyVisualDate(enemyData: Mesh, enemy: Enemy): void {
        enemyData.position.x = enemy.colliderPositionX;
        enemyData.position.z = enemy.colliderPositionZ;
    }

    //TODO сделать нормально сейчас высчитываем положения по Z дляспрайта таким образом чтоб он нормально распологался относительно коллайда
    updateEnemyVisualSpriteDate(enemySprite: Sprite, enemy: Enemy): void {
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
    informationAboutWorld(enemyData: Enemy, playerInformation: object, mapData: MapCreator, scene): void {
        this.updateEnemyVisualDate(enemyData.scopeCircleMesh, enemyData);
        this.updateEnemyVisualDate(enemyData.colliderMesh, enemyData);
        this.updateEnemyVisualSpriteDate(enemyData.enemySprite, enemyData);
        this.updateHealthLine(enemyData);
        this.animationEnemyAvatarForPositionServer(enemyData, scene);
    }

    animationSpriteMove(titleCountX: number, titleCountY: number, numberOfFrames: number): ISpritePosition {
        let spriteOffsets = [];
        let xPosition = numberOfFrames * titleCountX;
        let yPosition = numberOfFrames * titleCountY;
        spriteOffsets.push({x: titleCountX, y: yPosition});

        return spriteOffsets[0];
    }

    animationSpriteAttack(titleCountX: number, titleCountY: number, numberOfFrames: number): ISpritePosition {
        let spriteOffsets = [];
        let xPosition = numberOfFrames * titleCountX;
        let yPosition = (numberOfFrames) * titleCountY;
        spriteOffsets.push({x: titleCountX, y: yPosition});

        return spriteOffsets[0];
    }

    animationSpriteDeath(titleCountX: number, titleCountY: number, numberOfFrames: number): ISpritePosition {
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
    animationEnemyAvatarForPositionServer(enemyData:Enemy, scene: Scene): void {
        //Шаг фрэйма по оси X и Y
        const spriteData = enemyData.sprite;
        const frameToX = 1 / spriteData.numberOfFramesX;
        const frameToY = 1 / spriteData.numberOfFramesY;
        let rect;
        //Задержка анимации в данном случае используем ее чтоб красиво отобразить анимацию смерти бота
        let delay = 2;

        this._animationTimer++;
        this._count++;

        //TODO В данном случаи цифра три показывает что последние 3 кадра будут выполняться с гигантской задержкой(Надо чтоб это значение было указанно на сервере)
        if (spriteData.lastFrameDeathX - 3 <= this._counterOfDeath) {
            delay = 5;
        }


        if (this.attackStatus && this._count > spriteData.lastFrameAttack) {
            this._count = spriteData.firstFrameAttack;
        }
        if (this._count > enemyData.sprite.lastFrameMove && !this.attackStatus) {
            this._count = enemyData.sprite.firstFrameMove;
        }

        if (this.attackStatus) {
            this.animationSpriteAttack(frameToX * this.lastStatusAttack, frameToY, this._count);
        }

        rect = this.move(spriteData, frameToX, frameToY);
        if (this.health <= 0) {
            rect = this.death(spriteData, delay, enemyData, scene, frameToX, frameToY);
        }

        enemyData.enemySprite.material.map.offset.x = rect.x;
        enemyData.enemySprite.material.map.offset.y = rect.y;

    }

    /**
     * Метод отвечающий за правильное позиционирования спрайта врага
     * @param spriteData
     * @param frameToX
     * @param frameToY
     */
    move(spriteData: IEnemySpriteData, frameToX: number, frameToY: number): ISpritePosition {

        switch (this.directionMove) {

            case "LEFT":
                this.lastStatusAttack = spriteData.frameMoveLeft;
                return this.animationSpriteMove(frameToX * spriteData.frameMoveLeft, frameToY, this._count);

            case "RIGHT":
                this.lastStatusAttack = spriteData.frameMoveRight;
                return this.animationSpriteMove(frameToX * spriteData.frameMoveRight, frameToY, this._count);

            case "UP":
                this.lastStatusAttack = spriteData.frameMoveUp;
                return this.animationSpriteMove(frameToX * spriteData.frameMoveUp, frameToY, this._count);

            case  "UP_LEFT":
                this.lastStatusAttack = spriteData.frameMoveUpLeft;
                return this.animationSpriteMove(frameToX * spriteData.frameMoveUpLeft, frameToY, this._count);

            case  "UP_RIGHT":
                this.lastStatusAttack = spriteData.frameMoveUpRight;
                return this.animationSpriteMove(frameToX * spriteData.frameMoveUpRight, frameToY, this._count);

            case  "DOWN":
                this.lastStatusAttack = spriteData.frameMoveDown;
                return this.animationSpriteMove(frameToX * spriteData.frameMoveDown, frameToY, this._count);

            case "DOWN_LEFT":
                this.lastStatusAttack = spriteData.frameMoveDownLeft;
                return this.animationSpriteMove(frameToX * spriteData.frameMoveDownLeft, frameToY, this._count);

            case "DOWN_RIGHT":
                this.lastStatusAttack = spriteData.frameMoveDownRight;
                return this.animationSpriteMove(frameToX * spriteData.frameMoveDownRight, frameToY, this._count);

        }
    }

    /**
     * Метод анимации смерти противника,а также последующее удаление связанных объектов со сцены
     * @param spriteData
     * @param delay
     * @param enemyData
     * @param scene
     * @param frameToX
     * @param frameToY
     */
    death(spriteData: IEnemySpriteData, delay: number, enemyData: Enemy, scene: Scene, frameToX: number, frameToY: number): ISpritePosition {
        if (this._counterOfDeath < spriteData.lastFrameDeathX) {
            //Мы инкрементируем счетчик смерти если выполняется условие(т.е соответствие с указанной задержкой)
            if (this._animationTimer % delay === 0) {
                this._counterOfDeath++;
            }
            requestAnimationFrame(() => {
                this.animationEnemyAvatarForPositionServer(enemyData, scene);
            });
        } else {
            scene.remove(enemyData.scopeCircleMesh, enemyData.colliderMesh, enemyData.persecutionRadius, enemyData.enemyHealthLine, enemyData.enemySprite);
        }

        return this.animationSpriteDeath(frameToX, frameToY * spriteData.firstFrameDeath, this._counterOfDeath);
    }

    /**
     * Метод обновления полоски жизни у врагов
     * @param enemyData
     */
    updateHealthLine(enemyData): void {
        enemyData.enemyHealthLine.scale.x = enemyData.health / 100;
        enemyData.enemyHealthLine.scale.z = 2;
        this.updateEnemyVisualDate(enemyData.enemyHealthLine, enemyData.colliderMesh);
    }
}


