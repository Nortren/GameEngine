import * as React from 'react';
import DinamicAnimation from "../Animation/Dynamic/Dynamic";

/**
 * Компонент построения графиков в режими реального времени
 */
export default class EngineInitialization extends React.Component {
    public canvas: object;
    public context: CanvasRenderingContext2D;
    public imgBacground: object;
    public imgHero: object;
    private _dynamicAnimation: DinamicAnimation = new DinamicAnimation(this);
    constructor(props: object) {
        super(props);
        this.state = {
            moveX: 0,
            moveY: 0, countMove: 0,
            moveXBoll: true
        };
    }

    componentDidMount() {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext("2d");
        this.imgBacground = new Image();
        this.imgBacground.src = "./Client/image/map.jpg";
        this.imgHero = new Image();
        this.imgHero.src = "./Client/image/hero.png";

        this.imgBacground.onload = () => {
            this.resize(this.canvas, this.imgBacground);

            this.drawCanvas(this.context, this.canvas, this.imgBacground, this.imgHero, this._dynamicAnimation);
        };
        this._count = 0;
    }

    componentDidUpdate() {
        this.context = this.canvas.getContext("2d");
        this._animate = this.props.animations;
        this._dynamicAnimation.updateMap(this.context, this.canvas, this.imgBacground, this.props);
        this._dynamicAnimation.updateUserAvatar(this.context, this.canvas, this.imgHero, this.props);
    }

    drawCanvas(context: CanvasRenderingContext2D, canvas: object, img: object, imgHero: object, dynamicAnimation: DinamicAnimation) {
        dynamicAnimation.updateMap(this.context, this.canvas, this.imgBacground, this.props);
        dynamicAnimation.humanoidAnimation();
        dynamicAnimation.updateUserAvatar(this.context, this.canvas, this.imgHero, this.props);
    }

    resize(canvas: object) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    render() {
        return (
            <canvas id="canvas"/>
        );
    }
}





