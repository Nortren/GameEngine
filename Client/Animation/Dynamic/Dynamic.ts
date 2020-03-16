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

    /**
     * Обновления sprite анимации
     * @param props данные от контроллеров управления
     */
    updateUserAvatar(props) {
        //y = 0.08
        let rect = this.animationSprite(-0.011, 0.07, 0, 0.05, 14)[this._count];
        //Если нет props значит это первичная инициализация игрока
        if (props) {
            //Проверяем отпустил ли пользователь клавишу ,что бы прекратить анимацию
            if (props.moveDirection !== "STOP") {
                this.lastDirectionMove = props.moveDirection;
                this._count++;
            }
            //||  this.lastDirectionMove !== props.moveDirection
            if (this._count > 13 ) {
                this._count = 0;
            }

            if (this._pressKey === "A" || ( this.lastDirectionMove === "LEFT")) {
                rect = this.animationSprite(0.03, 0.39, 0.25, null, 14)[this._count];
            }
            if (this._pressKey === "D" || (this.lastDirectionMove === "RIGHT")) {
                rect = this.animationSprite(0.03, 0.59, 0.25, null, 14)[this._count];
            }
            if (this._pressKey === "W" || (this.lastDirectionMove === "UP")) {
                rect = this.animationSprite(0.05, 0.66, 0, 0.073, 14)[this._count];
            }
            if (this._pressKey === "S" || (this.lastDirectionMove === "DOWN")) {
                rect = this.animationSprite(0.95, 0.88, 0, 0.08, 14)[this._count];
            }
        }
        return rect

    }
}





