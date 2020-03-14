import * as THREE from "three";
import MapCreator from "../MapCreator/MapCreator";
import Dynamic from "../Animation/Dynamic/Dynamic";
import {globalVariables} from "../GlobalVariables";
import {Scene, Texture, Mesh, Sprite} from "three";

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

export default class Enemy implements BasicPropertyEnemy {
    _count: number;
    props: object;
    animation: Dynamic = new Dynamic();
    _animationTimer: number;
    fixPoint: number;


    radiusOfDetection: number;


    amountOfHealth: number;
    private _attackSpeedCount: number = 0;
    private _testImageMap: object;
    private _mapCreator: MapCreator = new MapCreator();

    id: number;
    src: string;
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
    persecutionRadius: string;
    health: number;
    damage: number;
    attackDistance: number;
    attackSpeed: number;
    moveSpeed: number;

    constructor(id: number, src: string, collaid: string, scope: string, scopeRadius: number, colliderPositionX: number,
                colliderPositionY: number,colliderPositionZ: number,
                colliderWidth: number, colliderHeight: number, colliderLength: number,
                pursuitZone: number, persecutionRadius: string, health: number,
                damage: number, attackDistance: number,
                attackSpeed: number, moveSpeed: number) {

        this.id = id;
        this.src = src;
        this.collaid = collaid;
        this.scope = scope;
        this.scopeRadius = scopeRadius;
        this.colliderPositionX = colliderPositionX;
        this.colliderPositionY = colliderPositionY;
        this.colliderPositionZ = colliderPositionZ;
        this.colliderWidth = colliderWidth;
        this.colliderHeight = colliderHeight;
        this.colliderLength = colliderLength;
        this.pursuitZone = pursuitZone;
        this.persecutionRadius = persecutionRadius;
        this.health = health;
        this.damage = damage;
        this.attackDistance = attackDistance;
        this.attackSpeed = attackSpeed;
        this.moveSpeed = moveSpeed;

        const loader = new THREE.TextureLoader();

        this.scopeCircleMesh = this.createEnemySupportMesh(scopeRadius, scopeRadius, scope, {x:colliderPositionX,y:colliderPositionY,z:colliderPositionZ}, loader);
        this.ColliderMesh = this.createEnemyCollider(colliderWidth, colliderLength, colliderHeight, collaid, {x:colliderPositionX,y:colliderPositionY,z:colliderPositionZ}, loader);
        this.persecutionRadius = this.createEnemySupportMesh(pursuitZone, pursuitZone, persecutionRadius, {x:colliderPositionX,y:colliderPositionY,z:colliderPositionZ}, loader);
        this.createEnemyHealthLine();
        this.createEnemySprite({x:colliderPositionX,y:colliderPositionY,z:colliderPositionZ}, src, loader);


        this._count = 0;
        this.moveCountTest = 0;
        this._animationTimer = 0;
        this._eventCount = 0;
        this.fixPoint = 0;
    }

    /**
     * Метод запуска анимации персоонажа
     * При первичной инициализации движка запскаем анимацию персоонажа и обновляем ее состояние от изменения state
     */
    objectAnimation(animation: boolean, animationSpeed: number) {
        if (this._animationTimer > animationSpeed && animation) {
            this._count++;
            this._animationTimer = 0;
        }
        this._animationTimer++;
    }

    /**
     * Обновления sprite анимации
     * @param context
     * @param canvas
     * @param imgHero картинка отображения гавного героя
     * @param props данные от контроллеров управления
     */
    updateEnemyAvatar(enemy, moveDirection) {

        if (this._count > 3) {
            this._count = 0;
        }

        let spriteOffsetsD = this.animation.animationSprite(0.03, 0.25, 0.25, null, 4);
        let spriteOffsetsA = this.animation.animationSprite(0.03, 0.5, 0.25, null, 4);
        let spriteOffsetsW = this.animation.animationSprite(0.03, 0, 0.25, null, 4);
        let spriteOffsetsS = this.animation.animationSprite(0.03, 0.75, 0.25, null, 4);
        let rect = spriteOffsetsS[this._count];
        if (moveDirection === "moveLeft") {
            rect = spriteOffsetsA[this._count];
        }
        if (moveDirection === "moveRight") {
            rect = spriteOffsetsD[this._count];
        }
        if (moveDirection === "moveUP") {
            rect = spriteOffsetsW[this._count];
        }
        if (moveDirection === "moveDown") {
            rect = spriteOffsetsS[this._count];
        }


        //рисуем героя по центру картинки
        enemy.material.map.offset.x = rect.x;
        enemy.material.map.offset.y = rect.y;

    }

    /**
     * генерируем врага на карте
     */
    createEnemy(scene: Scene) {
        scene.add(this.enemySprite, this.EnemyHealthLine);
        if (globalVariables.collider.showColliderDynamick) {
            scene.add(this.ColliderMesh);
        }

        if (globalVariables.collider.additionalData) {
            scene.add(this.scopeCircleMesh, this.persecutionRadius);
        }

    }

    createEnemySprite(position, src, loader) {
        const enemyImg = loader.load(src);
        enemyImg.wrapS = enemyImg.wrapT = THREE.RepeatWrapping;
        enemyImg.repeat.set(0.2, 0.25);
        enemyImg.magFilter = THREE.NearestFilter;

        const enemyColor = 0xff0000;
        const enemyTexture = new THREE.SpriteMaterial({
            map: enemyImg,
            color: enemyColor
        });
        this.enemySprite = new THREE.Sprite(enemyTexture);
        this.enemySprite.scale.set(2, 2, 1);
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
        this.EnemyHealthLine = line;
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


    createEnemySupportMesh(width: number, height: number, scope: Texture, position: object, loader) {
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

    createEnemyCollider(width: number, length: number, height: number, collaid: string, position: object, loader) {
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
        Mesh.position.set(x, y, z);
        if (globalVariables.shadow.materialShadow) {
            Mesh.castShadow = true;
        }
        return Mesh;
    }

    //Метод который обновляет позицию item привязанных к боту
    updateEnemVisualDate(enemyData: Mesh, enemy: Mesh) {
        enemyData.position.x = enemy.position.x;
        enemyData.position.z = enemy.position.z;
    }

    /**
     * текущее состояние ирового мира  чтоб бот мог в нём ориентироваться
     * @param enemyData
     * @param playerData
     * @param mapData
     */
    informationAboutWorld(enemyData: object, playerInformation: object, mapData: MapCreator, scene) {
        this.updateEnemVisualDate(enemyData.scopeCircleMesh, enemyData.ColliderMesh);
        this.updateEnemVisualDate(enemyData.ColliderMesh, enemyData.ColliderMesh);
        this.updateEnemVisualDate(enemyData.enemySprite, enemyData.ColliderMesh);
        this.updateHealthLine(enemyData);

        if (enemyData.health > 0) {
            this.persecutionObject(enemyData, playerInformation, mapData);
        }
        else {
            scene.remove(enemyData.scopeCircleMesh, enemyData.ColliderMesh, enemyData.persecutionRadius, enemyData.EnemyHealthLine, enemyData.enemySprite);
        }
    }


    updateHealthLine(enemyData) {

        enemyData.EnemyHealthLine.scale.x = enemyData.health / 100;
        enemyData.EnemyHealthLine.scale.z = 2;
        this.updateEnemVisualDate(enemyData.EnemyHealthLine, enemyData.ColliderMesh);

    }

    /**
     * Метод преследования указанного объекта
     * @param enemyDataa
     * @param playerData
     */
    persecutionObject(enemyData: object, playerData: object, mapData: MapCreator) {
        const enemy = enemyData.ColliderMesh;
        const enemySprite = enemyData.enemySprite;
        enemy.position.x;
        this.objectAnimation(true, 20);

        if (!enemy.startPositionX && !enemy.startPositionZ) {
            enemy.startPositionX = enemy.position.x;
            enemy.startPositionZ = enemy.position.z;
        }

        let positionLogic = this.logicOfMovement(
            enemy,
            playerData,
            enemySprite,
            ['moveLeft', 'moveRight', 'moveUP', 'moveDown'],
            enemyData,
            mapData
        );
        enemy.position.x = positionLogic.x;
        enemy.position.z = positionLogic.z;


        if (this.moveCountTest === 1) {
            enemy.startPositionX = enemy.position.x;
            enemy.startPositionZ = enemy.position.z;
            this.moveCountTest = 0;
        }


        this.moveCountTest++;
    }

    /**
     * Метод который отвечает за направление вижения бота
     * @param startPosition
     * @param enemyPositionAxis текущая позиция по указанной оси
     * @param persecutionObjectPosition позиция преследуемого объекта по указанной оси
     * @param enemySprite
     * @param arrayAnimationMove передаём название в направления (тут уже завязка на метод обновления анимации)
     * @returns {any}
     */

    logicOfMovement(enemy: Mesh, playerData: object, enemySprite: Sprite, arrayAnimationMove: Array<string>, enemyData: object, mapData: MapCreator) {
        const enemyPositionAxisX = enemy.position.x;
        const enemyPositionAxisZ = enemy.position.z;
        const realStartPositionX = enemyData.colliderPositionX;
        const realStartPositionY = enemyData.colliderPositionY;
        const realStartPositionZ = enemyData.colliderPositionZ;
        const enemyWidth = enemyData.colliderWidth;
        const enemyHeight = enemyData.colliderHeight;
        const scopeRadius = enemyData.scopeRadius * 0.5;

        const persecutionObjectPositionX = playerData.playerX;
        const persecutionObjectPositionZ = playerData.playerZ;
        const persecutionObjectWidth = playerData.playerWidth;
        const persecutionObjectHeight = playerData.playerHeight;
        const emptySpeedCoefficient = 0.03;
        const emptySpeed = this.moveCountTest * emptySpeedCoefficient;

        let returnData = {x: enemyPositionAxisX, z: enemyPositionAxisZ};


        let resultCollision = this.stopEnemyAtDistanceOfAttack(enemyPositionAxisX, enemyPositionAxisZ, enemyWidth, enemyHeight,
            persecutionObjectPositionX, persecutionObjectPositionZ, persecutionObjectWidth, persecutionObjectHeight, playerData, enemyData);


        const pursuitZone = enemyData.pursuitZone * 0.5;
        let persecution = false;
        //TODO не очевидная логика перемещения вероятно связано с последовательностью определения координат
        if (scopeRadius + Math.abs(enemyPositionAxisX) >= Math.abs(Math.abs(persecutionObjectPositionX) - persecutionObjectWidth * 0.5) &&
            scopeRadius + Math.abs(enemyPositionAxisZ) >= Math.abs(Math.abs(persecutionObjectPositionZ) - persecutionObjectHeight * 0.5)) {
            persecution = true;
        }


        //Бежим за игроком
        if (!resultCollision && persecution && Math.abs(persecutionObjectPositionX) < pursuitZone && Math.abs(persecutionObjectPositionZ) < pursuitZone) {


            if (enemyPositionAxisX.toFixed(1) !== persecutionObjectPositionX.toFixed(1)) {
                if (enemyPositionAxisX <= persecutionObjectPositionX) {
                    this.updateEnemyAvatar(enemySprite, arrayAnimationMove[1]);
                    returnData = this.bypassAnObstacle(enemy, returnData.x + emptySpeed, returnData.z, enemyWidth, enemyHeight, mapData, emptySpeed, 'x');
                }
                if (enemyPositionAxisX >= persecutionObjectPositionX) {
                    this.updateEnemyAvatar(enemySprite, arrayAnimationMove[0]);
                    returnData = this.bypassAnObstacle(enemy, returnData.x - emptySpeed, returnData.z, enemyWidth, enemyHeight, mapData, -emptySpeed, 'x');
                }
            }

            if (enemyPositionAxisZ.toFixed(1) !== persecutionObjectPositionZ.toFixed(1)) {
                if (enemyPositionAxisZ <= persecutionObjectPositionZ) {
                    this.updateEnemyAvatar(enemySprite, arrayAnimationMove[3]);
                    returnData = this.bypassAnObstacle(enemy, returnData.x, returnData.z + emptySpeed, enemyWidth, enemyHeight, mapData, emptySpeed, 'z');
                }
                if (enemyPositionAxisZ >= persecutionObjectPositionZ) {
                    this.updateEnemyAvatar(enemySprite, arrayAnimationMove[2]);
                    returnData = this.bypassAnObstacle(enemy, returnData.x, returnData.z - emptySpeed, enemyWidth, enemyHeight, mapData, -emptySpeed, 'z');


                }
            }


            return returnData;
        }
        else {
            //Возвращаемся к текущей позиции
            if (Math.abs(persecutionObjectPositionX) > pursuitZone || Math.abs(persecutionObjectPositionZ) > pursuitZone) {
                if (enemyPositionAxisX.toFixed(1) > realStartPositionX) {
                    this.updateEnemyAvatar(enemySprite, arrayAnimationMove[0]);
                    returnData.x = enemyPositionAxisX - emptySpeed;
                }
                if (enemyPositionAxisX.toFixed(1) < realStartPositionX) {
                    this.updateEnemyAvatar(enemySprite, arrayAnimationMove[1]);
                    returnData.x = enemyPositionAxisX + emptySpeed;
                }

                if (enemyPositionAxisZ.toFixed(1) > realStartPositionZ) {
                    this.updateEnemyAvatar(enemySprite, arrayAnimationMove[2]);
                    returnData.z = enemyPositionAxisZ - emptySpeed;
                }
                if (enemyPositionAxisZ.toFixed(1) < realStartPositionZ) {
                    this.updateEnemyAvatar(enemySprite, arrayAnimationMove[3]);
                    returnData.z = enemyPositionAxisZ + emptySpeed;
                }
            }
        }
        return returnData;
    }

    /**
     * Метод проверки столкновения с игроком(или проверка радиуса атаки на отором бот должен остановиться)
     * @param enemyPositionAxisX
     * @param enemyPositionAxisZ
     * @param enemyWidth
     * @param enemyHeight
     * @param persecutionObjectPositionX
     * @param persecutionObjectPositionZ
     * @param persecutionObjectWidth
     * @param persecutionObjectHeight
     * @returns {boolean}
     */
    stopEnemyAtDistanceOfAttack(enemyPositionAxisX: number, enemyPositionAxisZ: number, enemyWidth: number, enemyHeight: number,
                                persecutionObjectPositionX: number, persecutionObjectPositionZ: number, persecutionObjectWidth: number,
                                persecutionObjectHeight: number, playerData: object, enemyData: object) {

        enemyWidth = enemyWidth * 0.5;
        enemyHeight = enemyHeight * 0.5;
        persecutionObjectWidth = persecutionObjectWidth * 0.5;
        persecutionObjectHeight = persecutionObjectHeight * 0.5;
        let checkX = false;
        let checkZ = false;

        if ((enemyPositionAxisX + enemyWidth >= persecutionObjectPositionX - persecutionObjectWidth) &&
            (enemyPositionAxisX - enemyWidth <= persecutionObjectPositionX + persecutionObjectWidth)) {
            checkX = true;
        }
        if ((enemyPositionAxisZ + enemyHeight >= persecutionObjectPositionZ - persecutionObjectHeight) &&
            (enemyPositionAxisZ - enemyHeight <= persecutionObjectPositionZ + persecutionObjectHeight)) {
            checkZ = true;
        }

        if (checkX && checkZ) {
            this.attack(playerData.playerData, enemyData);
            return true;
        }

        return false;
    }

    attack(playerData: object, enemyData: object) {
        if (this._attackSpeedCount === enemyData.attackSpeed) {

            playerData.health = playerData.health - enemyData.damage;
            this._attackSpeedCount = 0;
        }
        this._attackSpeedCount++;
    }

    bypassAnObstacle(enemy, enemyPositionAxisX, enemyPositionAxisZ, enemyWidth, enemyHeight, mapData, emptySpeed, axis) {
        let checkCollision = {};
        checkCollision.checkX = false;
        checkCollision.checkZ = false;

        for (let key in mapData.collisionPoint) {
            let checkX = false;
            let checkZ = false;
            let collision = mapData.collisionPoint[key];
            let collisionZ = collision.z;
            let collisionX = collision.x;


            let drawObjectRealWidth = collision.width;
            let drawObjectRealHeight = collision.height;


            checkX = this.checkCollisionAxis(enemyPositionAxisX, enemyWidth, collisionX, drawObjectRealWidth);
            checkZ = this.checkCollisionAxis(enemyPositionAxisZ, enemyHeight, collisionZ, drawObjectRealHeight);


            if (checkX && checkZ) {
                while (this.checkCollisionAxis(enemyPositionAxisX - emptySpeed, enemyWidth, collisionX, drawObjectRealWidth)) {
                    return {x: enemy.position.x - emptySpeed, z: enemy.position.z};
                }
            }

        }
        return {x: enemyPositionAxisX, z: enemyPositionAxisZ}
    }

    checkCollisionAxis(enemyPositionAxis, enemySize, positionCollision, sizeCollision) {
        if ((enemyPositionAxis + enemySize * 0.5 >= positionCollision - sizeCollision) &&
            (enemyPositionAxis - enemySize * 0.5 <= positionCollision + sizeCollision)) {
            return true;
        }
        return false;
    }

    checkCollision() {

    }
}





