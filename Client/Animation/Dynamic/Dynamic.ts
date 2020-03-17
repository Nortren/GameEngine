export default class Dynamic {
    _count: number;
    _pressKey: string;
    _animationTimer: number;
    fixPoint: number;

    constructor() {
        this._count = 1;


        this._animationTimer = 0;
        this.fixPoint = 0;
    }

    animationSprite(startX, startY, stepX, stepY, numberOfFrames) {
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

    animationSpriteNew(titleCountX, titleCountY, numberOfFrames) {
        let spriteOffsets = [];
        let xPosition = numberOfFrames/titleCountX;
        let yPosition = numberOfFrames/titleCountY;
        spriteOffsets.push({x: xPosition, y: titleCountY});

        return spriteOffsets[0];
    }

    /**
     * Обновления sprite анимации
     * @param props данные от контроллеров управления
     */
    updateUserAvatar(props) {
        //y = 0.08
        // let rect = this.animationSprite(-0.011, 0.07, 0, 0.05, 14)[this._count];
        let rect = this.animationSpriteNew(8, 8,  this._count);
        //Если нет props значит это первичная инициализация игрока
        if (props) {
            //Проверяем отпустил ли пользователь клавишу ,что бы прекратить анимацию
            if (props.moveDirection !== "STOP") {
                this.lastDirectionMove = props.moveDirection;
                this._count++;
            }
            //||  this.lastDirectionMove !== props.moveDirection
            if (this._count > 9 ) {
                this._count = 1;
            }

            if (this._pressKey === "A" || ( this.lastDirectionMove === "LEFT")) {
                rect = this.animationSpriteNew(8, 0.875,  this._count);
            }
            if (this._pressKey === "D" || (this.lastDirectionMove === "RIGHT")) {
                rect = this.animationSpriteNew(8, 0.375,  this._count);
            }
            if (this._pressKey === "W" || (this.lastDirectionMove === "UP")) {
                rect = this.animationSpriteNew(8, 0.625,  this._count);
            }
            if (this._pressKey === "S" || (this.lastDirectionMove === "DOWN")) {
                rect = this.animationSpriteNew(8, 0.125,  this._count);
            }
        }
        return rect

    }
}





