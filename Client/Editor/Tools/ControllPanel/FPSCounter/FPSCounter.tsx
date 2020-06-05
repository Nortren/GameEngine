import * as React from 'react';
import {connect} from 'react-redux';

interface IFPSCounter_state {
    fps: number
}
interface IFPSCounter_props {
    fpsCounter: number
}
class FPSCounter extends React.Component  {

    state:IFPSCounter_state;
    props:IFPSCounter_props;
    _arrayFPS: number[];
    private _arrayLength: number;

    constructor(props: object) {
        super(props);
        this.state = {
            fps: 0
        };

    }

    componentDidMount() {
        this._arrayFPS = [];
        setInterval(() => {
            this._arrayFPS.push(this.props.fpsCounter);
            this._arrayLength = 100;


            if (this._arrayFPS.length > this._arrayLength) {
                this._arrayFPS = [];
            }

            this.drawsGraphs('fpsChart', this._arrayFPS, 1);
        }, 100);
    };

    componentDidUpdate() {

    }

    /**
     * Отрисовка графиков на Canvas
     * @param idCanvas
     * @param dataGraphs данны с для отрисовки
     * @param color цвет линии графика
     */
    drawsGraphs(idCanvas: string, dataGraphs: number[], color: number): void {
        //цвета линий
        const colors = ['#2196f3', '#1CC39C', '#FF5F62', '#2196f3'];
        const canvas =  document.getElementById(idCanvas) as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');

        //Тут мы узнаем текущий размер окна где распологается график чтоб отрисовать размеры canvas
        const bodySizeWidth = document.getElementsByClassName('FPSCounter_container-graphs')[0] as HTMLCanvasElement;
        const bodySizeHeight = document.getElementsByClassName('FPSCounter_container-graphs')[0] as HTMLCanvasElement;
        canvas.setAttribute('width', bodySizeWidth.offsetWidth.toString() );
        canvas.setAttribute('height', bodySizeHeight.offsetHeight.toString());

        //Количество отрезков на которое мы делим график(его детализация)
        const graphsLinecount = this._arrayLength;

        const width = canvas.width;
        const height = canvas.height;

        const stepY = (bodySizeHeight.offsetHeight) / graphsLinecount;
        const stepX = (bodySizeWidth.offsetWidth) / graphsLinecount;

        //рисуются кривые
        ctx.beginPath();


        //Для правильного построения графика по оси X мы двигаемся на одинаковый шаг изменяя только значения по Y
        dataGraphs.forEach((item, i, array) => {

            const x = stepX * i;
            /*Поскольку ось строится из левого верхнего угла для правильного отображения координат по оси Y делаем таким образом
             что считаем максимальную точку, это высату нашего canvas  и вычитаем из нее полученые значения тем самым получая корректное отображение
             */
            const y = canvas.height - (stepY * item);

            if (i === 0) {
                //стартовая точка
                ctx.moveTo(0, canvas.height * 0.5);
            }

            ctx.lineTo(x, y);

        });

        ctx.strokeStyle = colors[color]; //цвет линии
        ctx.lineWidth = 3;//толщина линии

        ctx.stroke();
    }

    render() {

        return (
            <div className="FPSCounter_container">
                FPS:
                <div className="FPSCounter_container-count">
                    {this.props.fpsCounter}
                </div>
                <div className="FPSCounter_container-graphs">
                    <canvas id='fpsChart'></canvas>
                </div>

            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        fpsCounter: state.fpsCounter.fps
    };
};

export default connect(mapStateToProps)(FPSCounter);



