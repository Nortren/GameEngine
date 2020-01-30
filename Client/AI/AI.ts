import * as THREE from "three";
import MapCreator from "../MapCreator/MapCreator";
import Dynamic from "../Animation/Dynamic/Dynamic";

export default class AI {
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
        this.moveCountTest = 0;

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
    createEnemy(enemyData,scene,showCollider) {
        const position = enemyData.colliderPosition;
        this._testImageMap = this._mapCreator.parserJSON();
        const loader = new THREE.TextureLoader();
        const enemyColor = 0xff0000;


        const enemyImg = loader.load(enemyData.src);
        const scopeTexture = loader.load(enemyData.scope);
        const colliderTexture = loader.load(enemyData.collaid);
        const colliderpersecutionRadius = loader.load(enemyData.persecutionRadius);

        enemyImg.wrapS = enemyImg.wrapT = THREE.RepeatWrapping;

        enemyImg.repeat.set(0.2, 0.25);
        enemyImg.magFilter = THREE.NearestFilter;

        const enemyTexture = new THREE.SpriteMaterial({
            map: enemyImg,
            color: enemyColor
        });

        let enemySprite = new THREE.Sprite(enemyTexture);
        enemySprite.scale.set(2, 2, 1);
        enemySprite.position.set(position.x, position.y, position.z);
        enemySprite.center.y = 0;


        let enemyResultData = {};

        enemyResultData.scopeCircleMesh = this.createEnemySupportMesh(enemyData.scopeRadius, enemyData.scopeRadius, scopeTexture, position);
        enemyResultData.ColliderMesh = this.createEnemySupportMesh(enemyData.colliderWidth*1.5, enemyData.colliderHeight*1.5, colliderTexture, enemyData.colliderPosition);
        enemyResultData.persecutionRadius = this.createEnemySupportMesh(enemyData.pursuitZone*1.5, enemyData.pursuitZone*1.5, colliderpersecutionRadius, enemyData.colliderPosition);

        enemyResultData.enemySprite = enemySprite;
        enemyResultData.enemyData = enemyData;
        scene.add(enemySprite);
        if(showCollider) {
            scene.add(enemyResultData.scopeCircleMesh, enemyResultData.ColliderMesh,enemyResultData.persecutionRadius);
        }

        return enemyResultData;
    }

    createEnemySupportMesh(width, height, texture, position) {

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

    //Метод который обновляет позицию item привязанных к боту
    updateEnemVisualDate(enemyData, enemy) {
        enemyData.position.x = enemy.position.x;
        enemyData.position.z = enemy.position.z;
    }

    /*updateEnemy(enemy) {
        this.objectAnimation(true, 20);

        if (!enemy.startPositionX && !enemy.startPositionY) {
            enemy.startPositionX = enemy.position.x;
            enemy.startPositionY = enemy.position.z;
        }

        switch (this.fixPoint) {
            case 0:
                enemy.position.x = enemy.startPositionX + this.moveCountTest * 0.01;
                this.updateEnemyAvatar(enemy, 'moveRight');

                break;
            case 1:
                enemy.position.z = enemy.startPositionY - this.moveCountTest * 0.01;
                this.updateEnemyAvatar(enemy, 'moveUP');

                break;
            case 2:
                enemy.position.x = enemy.startPositionX - this.moveCountTest * 0.01;
                this.updateEnemyAvatar(enemy, 'moveLeft');

                break;
            case 3:
                enemy.position.z = enemy.startPositionY + this.moveCountTest * 0.01;
                this.updateEnemyAvatar(enemy, 'moveDown');
                break;
        }


        if (this.moveCountTest === 360) {
            this.fixPoint++;
            enemy.startPositionX = enemy.position.x;
            enemy.startPositionY = enemy.position.z;
            this.moveCountTest = 0;
        }

        if (this.fixPoint > 3) {
            this.fixPoint = 0;
        }
        this.moveCountTest++;
    }*/

    /**
     * текущее состояние ирового мира  чтоб бот мог в нём ориентироваться
     * @param enemyData
     * @param playerData
     * @param mapData
     */
    informationAboutWorld(enemyData, playerData, mapData) {
        this.updateEnemVisualDate(enemyData.scopeCircleMesh, enemyData.ColliderMesh);
        this.updateEnemVisualDate(enemyData.ColliderMesh, enemyData.ColliderMesh);
        this.updateEnemVisualDate(enemyData.enemySprite, enemyData.ColliderMesh);

        this.persecutionObject(enemyData, playerData);


    }

    /**
     * Метод преследования указанного объекта
     * @param enemyData
     * @param playerData
     */
    persecutionObject(enemyData, playerData) {
        const enemy = enemyData.ColliderMesh;
        const enemySprite = enemyData.enemySprite;
        enemy.position.x;
        this.objectAnimation(true, 20);

        if (!enemy.startPositionX && !enemy.startPositionZ) {
            enemy.startPositionX = enemy.position.x;
            enemy.startPositionZ = enemy.position.z;
        }
        enemy.position.x = this.logicOfMovement(
            enemy.startPositionX,enemy.position.x,
            playerData.playerX,
            enemySprite,
            ['moveLeft','moveRight'],
            enemyData,
        'X');

        enemy.position.z = this.logicOfMovement(
            enemy.startPositionZ,enemy.position.z,
            playerData.playerZ,
            enemySprite,
            ['moveUP','moveDown'],
            enemyData,
        'Z');


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
    logicOfMovement(startPosition,enemyPositionAxis,persecutionObjectPosition,enemySprite,arrayAnimationMove,enemyData,axis){
        const emptySpeed = 0.1;
        const realStartPositionX = enemyData.enemyData.colliderPosition.x;
        const realStartPositionZ = enemyData.enemyData.colliderPosition.z;
        const pursuitZone = enemyData.enemyData.pursuitZone;
        let persecution = true;

        if(enemyData.enemyData.scopeRadius >= Math.abs(persecutionObjectPosition)){
            persecution = true;
        }

        if(persecution && Math.abs(realStartPositionX+startPosition) < pursuitZone && Math.abs(persecutionObjectPosition) < pursuitZone) {
            if (startPosition.toFixed(1) !== persecutionObjectPosition.toFixed(1)) {
                if (enemyPositionAxis > persecutionObjectPosition) {
                    this.updateEnemyAvatar(enemySprite, arrayAnimationMove[0]);
                    return startPosition - this.moveCountTest * emptySpeed;

                }
                if (enemyPositionAxis < persecutionObjectPosition) {
                    this.updateEnemyAvatar(enemySprite, arrayAnimationMove[1]);
                    return startPosition + this.moveCountTest * emptySpeed;

                }

            }
        }
        else{

            if(axis === 'X' && startPosition !== realStartPositionX && Math.abs(persecutionObjectPosition) > pursuitZone){
                if(startPosition > realStartPositionX) {
                    return startPosition - this.moveCountTest * emptySpeed;
                }
                else{
                    return startPosition + this.moveCountTest * emptySpeed;
                }
            }
            if(axis === 'Z' && Math.abs(startPosition) !== realStartPositionZ && Math.abs(persecutionObjectPosition) > pursuitZone){
                if(startPosition > realStartPositionZ) {
                    return startPosition - this.moveCountTest * emptySpeed;
                }
                else{
                    return startPosition + this.moveCountTest * emptySpeed;
                }
            }

        }
        return startPosition;
    }
}





