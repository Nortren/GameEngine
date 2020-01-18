import * as THREE from "three";
import MapCreator from "../MapCreator/MapCreator";
export default class AI {
    _count: number;
    props: object;

    _animationTimer: number;
    fixPoint: number;
    private _testImageMap: object;
    private _mapCreator: MapCreator = new MapCreator();
    constructor(options) {
        this._count = 0;
        this.props = options.props;

        this._animationTimer = 0;
        this.fixPoint = 0;
    }

    /**
     * Метод запуска анимации персоонажа
     * При первичной инициализации движка запскаем анимацию персоонажа и обновляем ее состояние от изменения state
     */
    humanoidAnimation(animation, animationSpeed) {
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

        let spriteOffsetsS = [];
        spriteOffsetsS.push({x: 0.03, y: 0.75, width: 57, height: 42});
        spriteOffsetsS.push({x: 0.27, y: 0.75, width: 54, height: 39});
        spriteOffsetsS.push({x: 0.53, y: 0.75, width: 57, height: 38});
        spriteOffsetsS.push({x: 0.78, y: 0.75, width: 55, height: 40});

        let spriteOffsetsW = [];
        spriteOffsetsW.push({x: 0.03, y: 0, width: 57, height: 42});
        spriteOffsetsW.push({x: 0.27, y: 0, width: 54, height: 39});
        spriteOffsetsW.push({x: 0.53, y: 0, width: 57, height: 38});
        spriteOffsetsW.push({x: 0.78, y: 0, width: 55, height: 40});
        let spriteOffsetsD = [];
        spriteOffsetsD.push({x: 0.03, y: 0.25, width: 57, height: 42});
        spriteOffsetsD.push({x: 0.27, y: 0.25, width: 54, height: 39});
        spriteOffsetsD.push({x: 0.53, y: 0.25, width: 57, height: 38});
        spriteOffsetsD.push({x: 0.78, y: 0.25, width: 55, height: 40});
        let spriteOffsetsA = [];
        spriteOffsetsA.push({x: 0.03, y: 0.5, width: 57, height: 42});
        spriteOffsetsA.push({x: 0.27, y: 0.5, width: 54, height: 39});
        spriteOffsetsA.push({x: 0.53, y: 0.5, width: 57, height: 38});
        spriteOffsetsA.push({x: 0.78, y: 0.5, width: 55, height: 40});

        let rect = spriteOffsetsS[ this._count];
        if (moveDirection === "moveLeft") {
            rect = spriteOffsetsA[ this._count];
        }
        if (moveDirection === "moveRight") {
            rect = spriteOffsetsD[ this._count];
        }
        if (moveDirection === "moveUP") {
            rect = spriteOffsetsW[ this._count];
        }
        if (moveDirection === "moveDown") {
            rect = spriteOffsetsS[ this._count];
        }


        //рисуем героя по центру картинки
        enemy.material.map.offset.x = rect.x;
        enemy.material.map.offset.y = rect.y;

    }

    /**
     * генерируем врага на карте
     */
    createEnemy(position) {
        this._testImageMap = this._mapCreator.parserJSON();
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
        enemy.scale.set(2, 2, 1);
        enemy.position.set(position.x, position.y, position.z);
        return enemy;
    }

    updateEnemy(enemy, moveCountTest) {
        this.humanoidAnimation(true,7);

        if (!enemy.startPositionX && !enemy.startPositionY) {
            enemy.startPositionX = enemy.position.x;
            enemy.startPositionY = enemy.position.y;
        }
        switch (this.fixPoint) {
            case 0:
                enemy.position.x = enemy.startPositionX + moveCountTest * 0.01;
                this.updateEnemyAvatar(enemy,'moveRight');
                break;
            case 1:
                enemy.position.y = enemy.startPositionY + moveCountTest * 0.01;
                this.updateEnemyAvatar(enemy,'moveUP');
                break;
            case 2:
                enemy.position.x = enemy.startPositionX - moveCountTest * 0.01;
                this.updateEnemyAvatar(enemy,'moveLeft');
                break;
            case 3:
                enemy.position.y = enemy.startPositionY - moveCountTest * 0.01;
                this.updateEnemyAvatar(enemy,'moveDown');
                break;
        }


        if (moveCountTest === 120) {
            this.fixPoint++;
            enemy.startPositionX = enemy.position.x;
            enemy.startPositionY = enemy.position.y;

        }

        if (this.fixPoint > 3) {
            this.fixPoint = 0;
        }
    }
}





