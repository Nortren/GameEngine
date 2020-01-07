import * as React from 'react';


/**
 * Компонент построения графиков в режими реального времени
 */
export default class StickController extends React.Component {

    constructor(props) {
        super(props);
        this.changeX = this.changeX.bind(this);
        this.changeY = this.changeY.bind(this);
        this.state = {
            moveX: 0,
            moveY: 0, countMove: 0,
            moveXBoll: true
        };
    }

    componentDidMount() {
        this.touchEvent("UserLeftStick",this.changeX,this.changeY);
        this.createCanvas("UserLeftStick");
        this.createCanvas("UserRightStick");
    }

    touchEvent(touchControll,changeX,changeY) {
        let el = document.getElementById(touchControll);
        el.addEventListener("touchmove", (e) => {
            changeX(e.changedTouches[0].clientX);
            changeY(e.changedTouches[0].clientY);
        }, false);
    }

    createCanvas(id) {
        let canvas = document.getElementById(id);
        canvas.width = 100;
        canvas.height  = 100;
        let context = canvas.getContext("2d");
        context.beginPath();
        context.arc(350, 90, 50, 0, Math.PI * 2, false);
        context.closePath();
        context.stroke();
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillRect(this.state.moveX, this.state.moveY, 100, 100);
    }

    changeX(params) {
        this.props.changeX(params);
    }

    changeY(params) {
        this.props.changeY(params);
    }

    render() {
        return (
            <div className="Sticks col-12">
                <div className="leftStick" >
                    <canvas id="UserLeftStick"></canvas>
                </div>
                <div className="rightStick" >
                    <canvas id="UserRightStick"></canvas>
                </div>
            </div>
        );
    }
}





