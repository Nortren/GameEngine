import * as React from 'react';


/**
 * Компонент построения графиков в режими реального времени
 */
export default class EngineInitialization extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            moveX: 0,
            moveY: 0, countMove: 0,
            moveXBoll: true
        };
    }

    componentDidMount() {

        document.addEventListener('keydown', (event) => {
            this.setKey(event);
        });
        document.addEventListener("touchstart", (event) => {
            this.touchStartPositionX = event.changedTouches[0].clientX;
            this.touchStartPositionY = event.changedTouches[0].clientY;
            this._startAnimationTouch = true;

            this._startAnimationTouch = setInterval(() => {
                    this._animate = true;
                this.setKey(event);
                }, 10);

        }, false);
        document.addEventListener("touchend", (event) => {
            clearInterval(this._startAnimationTouch);
        }, false);
        document.addEventListener("touchmove", (event) => {
            this.touchMovePositionX = event.changedTouches[0].clientX;
            this.touchMovePositionY = event.changedTouches[0].clientY;
        }, false);
        let canvas = document.getElementById('canvas');

        let context = canvas.getContext("2d");
        let img = new Image();
        img.src = "./Client/image/map.jpg";

        let imgHero = new Image();
        imgHero.src = "./Client/image/hero.png";

        img.onload = () => {
            this.resize(canvas, img);
        };
        this._count = 0;

        this.drawCanvas(context, canvas, img, imgHero);
        this.humanoidAnimation();

    }

    componentDidUpdate(){
        this._animate = this.props.animations;
        // this.setKey(event);
    }

    drawCanvas(context, canvas, img, imgHero) {
        setInterval(() => {
            this.updateMap(context, canvas, img);
            this.updateUserAvatar(context, canvas, imgHero);
        }, 1000 / 60);
    }

    humanoidAnimation() {
        setInterval(() => {
            if (this._animate) {
                this._count++;
            }
            this._animate = false;
        }, 1000 / 10);
    }

    directionOfMovement(startX, moveX, startY, moveY) {
        let resPosX = (this.thisXUp > moveX);
        let resPosY = (this.thisYUp > moveY);

        let xTest = Math.abs(this.thisXUp - moveX);
        let yTest = Math.abs(this.thisYUp - moveY);


        this.thisXUp = moveX;
        this.thisYUp = moveY;
    }
    setKey(e) {
        let moveX=this.touchMovePositionX;
        let moveY=this.touchMovePositionY;
        let resPosX = (this.thisXUp > moveX);
        let resPosY = (this.thisYUp > moveY);

        let xTest = Math.abs(this.thisXUp - moveX);
        let yTest = Math.abs(this.thisYUp - moveY);

        if (yTest > 2) {
            if (resPosY) {
                this.resultMovePosition = "UP";
            }
            if (!resPosY) {
                this.resultMovePosition = "DOWN";
            }
        }
        if (xTest > 2) {
            if (resPosX) {
                this.resultMovePosition = "LEFT";
            }
            if (!resPosX) {
                this.resultMovePosition = "RIGHT";
            }
        }
        this.thisXUp = moveX;
        this.thisYUp = moveY;

        let code = e.keyCode;
        this._animate = true;
        if (code === 87 || this.resultMovePosition === "UP") {
            let move = this.state.moveY;
            move++;
            this.setState({moveY: move});
            this._pressKey = "W";
        }
        if (code === 83 || this.resultMovePosition === "DOWN") {
            let move = this.state.moveY;
            move--;
            this.setState({moveY: move});
            this._pressKey = "S";
        }
        if (code === 65 || this.resultMovePosition === "LEFT") {
            let move = this.state.moveX;
            move++;
            this.setState({moveX: move});
            this._pressKey = "A";
        }
        if (code === 68 || this.resultMovePosition === "RIGHT") {
            let move = this.state.moveX;
            move--;
            this.setState({moveX: move});
            this._pressKey = "D";
        }
    }

    resize(canvas, img) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    updateUserAvatar(context, canvas, imgHero) {

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
        if (this._pressKey === "A" || this.props.direction === "LEFT") {
            rect = spriteOffsetsA[this._count];
        }
        if (this._pressKey === "D" || this.props.direction === "RIGHT") {
            rect = spriteOffsetsD[this._count];
        }
        if (this._pressKey === "W" || this.props.direction === "UP") {
            rect = spriteOffsetsW[this._count];
        }
        if (this._pressKey === "S" || this.props.direction === "DOWN") {
            rect = spriteOffsetsS[this._count];
        }
        //рисуем героя по центру картинки
        context.drawImage(imgHero, rect.x, rect.y, 70, 70, canvas.width / 2, canvas.height / 2, 50, 50);
        //квадрат без картинки
        // context.fillRect(canvas.width/2, canvas.height/2 , 30, 30);
    }


    updateMap(context, canvas, img) {
        //TODO Так мы устанавливаем стартовую позицию на карте (нужно доработать)
        let startPosition = 500;
        // задаем картинки для анимации (позиции из большой картинки)


        context.clearRect(0, 0, canvas.width, canvas.height);
        //Двигаем картинку перемещая персоонажаs
        context.drawImage(img, this.state.moveX - startPosition, this.state.moveY);


    }


    render() {
        return (
            <canvas className="col-12" id="canvas"></canvas>
        );
    }
}





