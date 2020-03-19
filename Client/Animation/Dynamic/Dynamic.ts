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

    /**
     * Обновления sprite анимации
     * @param props данные от контроллеров управления
     */
    updateUserAvatar(props,spriteData,userSpriteTextureFrames) {
        //Шаг фрэйма по оси X и Y

        const frameToX = 1/spriteData.numberOfFramesX;
        const frameToY = 1/spriteData.numberOfFramesY;
        let rect = this.animationSpriteNew(0.0588, 0.0714,  1);
        //Если нет props значит это первичная инициализация игрока
        if (props) {
            if(props.attackStatus && this._count >= spriteData.firstFrameAttack + 1){
                this._count = spriteData.firstFrameAttack-1;
            }
            //Проверяем отпустил ли пользователь клавишу ,что бы прекратить анимацию
            if (props.moveDirection !== "STOP" || props.attackStatus) {
                this.lastDirectionMove = props.moveDirection;
                this._count++;
            }

            if(props.attackStatus && !this.animationAttack) {
                this._count = spriteData.firstFrameAttack-1;
                this.animationAttack = setInterval(() => {
                    this.updateUserAvatar(props,spriteData,userSpriteTextureFrames);
                }, 60);
                console.log(this._count);
            }
            if(!props.attackStatus){
                clearInterval(this.animationAttack);
                this.animationAttack = 0;
            }

            if (props.attackStatus) {
                rect = this.animationSpriteAttack(frameToX*1, frameToY,  this._count);
            }



            if (this._count > spriteData.lastFrameMove && !props.attackStatus) {
                this._count = spriteData.firstFrameMove;
            }

            if (this._pressKey === "A" || ( this.lastDirectionMove === "LEFT")) {
                rect = this.animationSpriteNew(frameToX*spriteData.frameMoveLeft, frameToY,  this._count);
            }
            if (this._pressKey === "D" || (this.lastDirectionMove === "RIGHT")) {
                rect = this.animationSpriteNew(frameToX*spriteData.frameMoveRight, frameToY,  this._count);
            }
            if (this._pressKey === "W" || (this.lastDirectionMove === "UP")) {
                rect = this.animationSpriteNew(frameToX*spriteData.frameMoveUp, frameToY,  this._count);
            }
            if (this._pressKey === "S" || (this.lastDirectionMove === "DOWN")) {
                rect = this.animationSpriteNew(frameToX*spriteData.frameMoveDown, frameToY,  this._count);
            }
        }

        userSpriteTextureFrames.offset.x = rect.x;
        userSpriteTextureFrames.offset.y = rect.y;

        // return rect

    }
}





