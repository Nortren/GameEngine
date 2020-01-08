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

        document.addEventListener('keydown', (e) => {
            this.setKey(e, true);
        });
        /*
         let el = document.getElementById("canvas");
        el.addEventListener("touchstart", (e) => {
            this.handleStart(e, true);
        }, false);
        el.addEventListener("touchend", (e) => {
            this.handleStart(e, true);
        }, false);
        el.addEventListener("touchcancel", (e) => {
            this.handleStart(e, true);
        }, false);
        el.addEventListener("touchmove", (e) => {
            this.handleStart(e, true);
        }, false);*/

        let canvas = document.getElementById('canvas');

        let context = canvas.getContext("2d");
        let img = new Image();
        img.src = "../Client/image/map.jpg";

        let imgHero = new Image();
        imgHero.src = "../Client/image/hero.png";

        img.onload = ()=> {
            this.resize(canvas,img);
        };
        this._count = 0;
        setInterval(() => {
            this.update(context,canvas,img,imgHero);
        }, 1000/60)

    }
    componentDidUpdate() {
        console.log(this.props.moveX,this.props.moveY,'TUT');
    }

    handleStart(evt) {

        // console.log(evt.changedTouches[0]);
        if (evt.type === "touchmove") {
            this.setState({moveX: evt.changedTouches[0].clientX, moveY: evt.changedTouches[0].clientY});
        }
    }

    setKey(e) {
        let code = e.keyCode;
        console.log(code);
        if (code === 87) {
            let move = this.state.moveY;
            move++;
            this.setState({moveY: move});
        }
        if (code === 83) {
            let move = this.state.moveY;
            move--;
            this.setState({moveY: move});
        }
        if (code === 65) {
            let move = this.state.moveX;
            move++;
            this.setState({moveX: move});
        }
        if (code === 68) {
            let move = this.state.moveX;
            move--;
            this.setState({moveX: move});
        }
    }

    resize(canvas,img)
    {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // canvas.width = img.width;
        // canvas.height = img.height;
    }
    update(context,canvas,img,imgHero) {

        // задаем картинки для анимации (позиции из большой картинки)
        let spriteOffsets = [];
        spriteOffsets.push({x:0, y:10, width:57, height:42});
        spriteOffsets.push({x:80, y:4, width:54, height:39});
        spriteOffsets.push({x:160, y:4, width:57, height:38});
        spriteOffsets.push({x:240, y:1, width:55, height:40});

        let xPos = 0;
        let yPos = 20;

        let rect = spriteOffsets[this._count];

        context.clearRect(0, 0, canvas.width, canvas.height);
        //Двигаем картинку перемещая персоонажа
        context.drawImage(img, this.state.moveX, this.state.moveY);
        //рисуем героя по центру картинки
        context.drawImage(imgHero,rect.x,10,70,70, canvas.width/2, canvas.height/2,50,50);
        //квадрат без картинки
        // context.fillRect(canvas.width/2, canvas.height/2 , 30, 30);
        this._count++;
        if(this._count > 3){
            this._count =0;
        }
    }


    render() {
        return (
                <canvas className="col-12" id="canvas"></canvas>
        );
    }
}





