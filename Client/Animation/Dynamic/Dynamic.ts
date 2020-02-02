
export default class Dynamic {
    _count: number;
    _pressKey: string;
    _animationTimer: number;
    fixPoint: number;

    constructor() {
        this._count = 0;


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

    animationSprite(startX, startY,stepX, stepY, numberOfFrames) {
        let spriteOffsets = [];
        let xPosition = startX;
        let yPosition = startY;
        for (let i = 0; i < numberOfFrames; i++) {
            spriteOffsets.push({x: xPosition, y: yPosition});

            xPosition += stepX ? stepX : 0;
            yPosition += stepY ? stepY : 0;
        }


        return spriteOffsets;
    }

    /**
     * Обновления sprite анимации
     * @param context
     * @param canvas
     * @param imgHero картинка отображения гавного героя
     * @param props данные от контроллеров управления
     */
    updateUserAvatar(playerData, props,player) {

        if (this._count > 3) {
            this._count = 0;
        }

        let rect = this.animationSprite(0.03,0.99,0.25,null,4)[this._count];
        if (this._pressKey === "A" || (props && props.direction === "LEFT")) {
            rect = this.animationSprite(0.03,0.39,0.25,null,4)[this._count];
        }
        if (this._pressKey === "D" || (props && props.direction === "RIGHT")) {
            rect = this.animationSprite(0.03,0.59,0.25,null,4)[this._count];
        }
        if (this._pressKey === "W" || (props && props.direction === "UP")) {
            rect = this.animationSprite(0.03,0.19,0.25,null,4)[this._count];
        }
        if (this._pressKey === "S" || (props && props.direction === "DOWN")) {
            rect = this.animationSprite(0.03,0.99,0.25,null,4)[this._count];
        }
        player.update(playerData,props,rect);


    }

}





