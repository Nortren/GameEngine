
export default class Dynamic {

    constructor(options) {
        // super(props);
        this._count = 0;
        this.props = options.props;
        this._animate = this.props.animations;
        this.state = {
            moveX: 0,
            moveY: 0, countMove: 0,
            moveXBoll: true
        };
    }

    humanoidAnimation() {
        setInterval(()=>{this._count++;},100);
            this._animate = false;
    }

    updateUserAvatar(context, canvas, imgHero,props) {

        if (this._count > 3) {
            this._count = 0;
        }
        let spriteOffsetsS = [];
        spriteOffsetsS.push({x: 0, y: 8, width: 57, height: 42});
        spriteOffsetsS.push({x: 80, y: 8, width: 54, height: 39});
        spriteOffsetsS.push({x: 160, y: 8, width: 57, height: 38});
        spriteOffsetsS.push({x: 240, y: 8, width: 55, height: 40});

        let spriteOffsetsW = [];
        spriteOffsetsW.push({x: 0, y: 245, width: 57, height: 42});
        spriteOffsetsW.push({x: 80, y: 245, width: 54, height: 39});
        spriteOffsetsW.push({x: 160, y: 245, width: 57, height: 38});
        spriteOffsetsW.push({x: 240, y: 245, width: 55, height: 40});
        let spriteOffsetsD = [];
        spriteOffsetsD.push({x: 0, y: 165, width: 57, height: 42});
        spriteOffsetsD.push({x: 80, y: 165, width: 54, height: 39});
        spriteOffsetsD.push({x: 160, y: 165, width: 57, height: 38});
        spriteOffsetsD.push({x: 240, y: 165, width: 55, height: 40});
        let spriteOffsetsA = [];
        spriteOffsetsA.push({x: 0, y: 85, width: 57, height: 42});
        spriteOffsetsA.push({x: 80, y: 85, width: 54, height: 39});
        spriteOffsetsA.push({x: 160, y: 85, width: 57, height: 38});
        spriteOffsetsA.push({x: 240, y: 85, width: 55, height: 40});

        let rect = spriteOffsetsS[this._count];
        if (this._pressKey === "A" || (props && props.direction === "LEFT")) {
            rect = spriteOffsetsA[this._count];
        }
        if (this._pressKey === "D" || (props &&props.direction === "RIGHT")) {
            rect = spriteOffsetsD[this._count];
        }
        if (this._pressKey === "W" || (props && props.direction === "UP")) {
            rect = spriteOffsetsW[this._count];
        }
        if (this._pressKey === "S" || (props && props.direction === "DOWN")) {
            rect = spriteOffsetsS[this._count];
        }
        //рисуем героя по центру картинки
        context.drawImage(imgHero, rect.x, rect.y, 70, 70, canvas.width / 2, canvas.height / 2, 50, 50);
    }
    updateMap(context, canvas, img,props) {
        //TODO Так мы устанавливаем стартовую позицию на карте (нужно доработать)
        let startPosition = 500;
        // задаем картинки для анимации (позиции из большой картинки)
        context.clearRect(0, 0, canvas.width, canvas.height);
        //Двигаем картинку перемещая персоонажаs
        context.drawImage(img, props.moveX - startPosition, props.moveY);
    }
}





