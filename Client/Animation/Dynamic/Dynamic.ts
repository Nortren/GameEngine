export default class Dynamic {
    _count: number;
    _pressKey: string;
    _animationTimer: number;
    fixPoint: number;
    animationAttackLoop: NodeJS.Timeout;
    player: number;
    lastDirectionMove: string;
    lastStatusAttack: number;
    constructor(player?:number) {
        this._count = 1;
        this.player = player;
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
    updateUserAvatar(props, spriteData, userSpriteTextureFrames) {
        //Шаг фрэйма по оси X и Y
        const frameToX = 1 / spriteData.numberOfFramesX;
        const frameToY = 1 / spriteData.numberOfFramesY;
        let rect = null;
        //Если нет props значит это первичная инициализация игрока
        if (props) {
            //Проверяем отпустил ли пользователь клавишу ,что бы прекратить анимацию
            if (props.moveDirection !== "STOP" || props.attackStatus) {
                this.lastDirectionMove = props.moveDirection;
                if(props.moveContinue) {
                    this._count++;
                }

            }

            if (!props.attackStatus) {
                // lastStatusAttack = spriteData.frameMoveDown;
                rect = this.animationSpriteNew(frameToX * spriteData.frameMoveDown, frameToY, this._count);
            }

            if (props.attackStatus && this._count > spriteData.lastFrameAttack) {
                this._count = spriteData.firstFrameAttack;
            }

            //Тут вызываем цикл анимаций для стрельбы т.к с сервера к нам приходит либо нажата клавиша либо отпущена и это происходит не циклично
            if (props.attackStatus && !this.animationAttackLoop) {
                this._count = spriteData.firstFrameAttack;

                this.animationAttackLoop = setInterval(() => {
                    this.updateUserAvatar(props, spriteData, userSpriteTextureFrames);
                }, 60);

            }
            if (!props.attackStatus) {
                clearInterval(this.animationAttackLoop);
                this.animationAttackLoop = null;
            }

            if (props.attackStatus) {
                rect = this.animationSpriteAttack(frameToX * this.lastStatusAttack, frameToY, this._count);
            }


            if (this._count > spriteData.lastFrameMove && !props.attackStatus) {
                this._count = spriteData.firstFrameMove;
            }

            if ( this.lastDirectionMove === "LEFT") {
                this.lastStatusAttack = spriteData.frameMoveLeft;
                rect = this.animationSpriteNew(frameToX * spriteData.frameMoveLeft, frameToY, this._count);
            }
            if (this.lastDirectionMove === "RIGHT") {
                this.lastStatusAttack = spriteData.frameMoveRight;
                rect = this.animationSpriteNew(frameToX * spriteData.frameMoveRight, frameToY, this._count);
            }
            if (this.lastDirectionMove === "UP") {
                this.lastStatusAttack = spriteData.frameMoveUp;
                rect = this.animationSpriteNew(frameToX * spriteData.frameMoveUp, frameToY, this._count);
            }
            if (this.lastDirectionMove === "UP_LEFT") {
                this.lastStatusAttack = spriteData.frameMoveUpLeft;
                rect = this.animationSpriteNew(frameToX * spriteData.frameMoveUpLeft, frameToY, this._count);
            }
            if (this.lastDirectionMove === "UP_RIGHT") {
                this.lastStatusAttack = spriteData.frameMoveUpRight;
                rect = this.animationSpriteNew(frameToX * spriteData.frameMoveUpRight, frameToY, this._count);
            }
            if (this.lastDirectionMove === "DOWN") {
                this.lastStatusAttack = spriteData.frameMoveDown;
                rect = this.animationSpriteNew(frameToX * spriteData.frameMoveDown, frameToY, this._count);
            }
            if (this.lastDirectionMove === "DOWN_LEFT") {
                this.lastStatusAttack = spriteData.frameMoveDownLeft;
                rect = this.animationSpriteNew(frameToX * spriteData.frameMoveDownLeft, frameToY, this._count);
            }
            if (this.lastDirectionMove === "DOWN_RIGHT") {
                this.lastStatusAttack = spriteData.frameMoveDownRight;
                rect = this.animationSpriteNew(frameToX * spriteData.frameMoveDownRight, frameToY, this._count);
            }
        }
        else {
            this.lastStatusAttack = spriteData.frameMoveDown;
            rect = this.animationSpriteNew(frameToX * spriteData.frameMoveDown, frameToY, this._count);
        }
        userSpriteTextureFrames.offset.x = rect.x;
        userSpriteTextureFrames.offset.y = rect.y;
    }
}





