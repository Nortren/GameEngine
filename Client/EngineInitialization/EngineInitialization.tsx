import * as React from 'react';
import DinamicAnimation from "../Animation/Dynamic/Dynamic";
import MapCreator from "../MapCreator/MapCreator";

/**
 * Главный контрол первичной инициализации движка
 */
export default class EngineInitialization extends React.Component {
    public canvas: object;
    public context: CanvasRenderingContext2D;
    public imgBacground: object;
    public imgHero: object;
    private _testImageMap: object;
    private _dynamicAnimation: DinamicAnimation = new DinamicAnimation(this);
    private _mapCreator: MapCreator = new MapCreator();

    constructor(props: object) {
        super(props);
        this.state = {
            moveX: 0,
            moveY: 0, countMove: 0,
            moveXBoll: true
        };
    }

    componentDidMount() {
        this._testImageMap = this._mapCreator.parserJSON();
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext("2d");
        this.imgBacground = new Image();
        this.imgBacground.src = this._testImageMap.src;
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

    /**
     * Отрисовка канваса на запущенном устройстве
     * @param context
     * @param canvas
     * @param img картинка локации
     * @param imgHero картинка героя
     * @param dynamicAnimation метод изменения state через redux
     */
    drawCanvas(context: CanvasRenderingContext2D, canvas: object, img: object, imgHero: object, dynamicAnimation: DinamicAnimation) {
        dynamicAnimation.updateMap(this.context, this.canvas, this.imgBacground, this.props);
        dynamicAnimation.humanoidAnimation();
        dynamicAnimation.updateUserAvatar(this.context, this.canvas, this.imgHero, this.props);
    }

    /**
     * Обновления Canvas в зависимости от разрешения экрана (работает при первичной инициализации)
     * @param canvas
     */
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





