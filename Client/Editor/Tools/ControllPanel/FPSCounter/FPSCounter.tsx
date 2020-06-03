import * as React from 'react';
import {connect} from 'react-redux';


class FPSCounter extends React.Component {


    constructor(props: object) {
        super(props);
        this.id = props.id;
        this.state = {
            fps: 0
        };
}

    componentDidMount() {
        setInterval(()=>{   this.drawsGraphs('fpsChart', [1,2334,123,346,123,1,2334,123,346,1231,2334,123,346,1231,2334,123,346,1231,2334,123,346,123], 1);},100);
    };

    componentDidUpdate() {

    }


    /**
     * Отрисовка графиков на Canvas
     * @param idCanvas
     * @param dataGraphs данны с для отрисовки
     * @param color цвет линии графика
     */
    drawsGraphs(idCanvas: number, dataGraphs: number | [], color: number): void {
        //цвета линий
        const colors = ['#2196f3', '#1CC39C', '#FF5F62', '#2196f3'];
        const canvas = document.getElementById(idCanvas);
        const gr = canvas.getContext('2d');
        //Тут мы узнаем текущий размер окна где распологается график чтоб отрисовать размеры canvas
        const bodySizeWidth = document.getElementsByClassName('FPSCounter_container-graphs')[0];
        const bodySizeHeight = document.getElementsByClassName('FPSCounter_container-graphs')[0];
        canvas.setAttribute('width', bodySizeWidth.offsetWidth);
        canvas.setAttribute('height', bodySizeHeight.offsetHeight * 0.6);
        const maxCount = 35 + 10;
        const x0 = 30;
        const y0 = 60;
        const width = canvas.widt;
        const height = canvas.height;
        const stepY = Math.round(height / bodySizeHeight.offsetHeight * 10);
        const stepX = Math.round(width / bodySizeWidth.offsetWidth * 10);

        //рисуются кривые

        gr.beginPath();

        for (let counData in dataGraphs) {
            const count = dataGraphs[counData];
            const x = x0 + ((counData - 1) * stepX);
            const y = y0 + (height - count * stepY);

            if (1 == counData) {
                gr.moveTo(x, y);
            } else {
                gr.lineTo(x, y);
            }
        }
        gr.strokeStyle = colors[color]; //цвет линии
        gr.lineWidth = 3;//толщина линии
        gr.stroke();

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



