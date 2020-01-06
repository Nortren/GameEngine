import * as React from 'react';


/**
 * Компонент построения графиков в режими реального времени
 */
export default class StickController extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            moveX: 0,
            moveY: 0, countMove: 0,
            moveXBoll: true
        };
    }

    componentDidMount() {
        setInterval(() => {
            this.createCanvas()
        }, 10)
    }

    createCanvas() {

        let countTest = this.state.countMove;
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(this.state.moveX, this.state.moveY, 10, 10);

    }


    render() {
        return (
            <div className="Sticks">
                <div className="leftStick">
                    L
                </div>
                <div className="rightStick">
                    R
                </div>
            </div>
        );
    }
}





