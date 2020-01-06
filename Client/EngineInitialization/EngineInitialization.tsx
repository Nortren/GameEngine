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
        let el = document.getElementById("canvas");
        document.addEventListener('keydown', (e) => {
            this.setKey(e, true);
        });

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
        }, false);
        setInterval(() => {
            this.createCanvas()
        }, 10)

    }

    handleStart(evt) {
        console.log(evt);
        if (evt.type === "touchmove") {
            this.setState({moveX: evt.changedTouches[0].clientX, moveY: evt.changedTouches[0].clientY});
        }
    }

    setKey(e) {
        let code = e.keyCode;
        console.log(code);
        if (code === 87) {
            let move = this.state.moveY;
            move--;
            this.setState({moveY: move});
        }
        if (code === 83) {
            let move = this.state.moveY;
            move++;
            this.setState({moveY: move});
        }
        if (code === 65) {
            let move = this.state.moveX;
            move--;
            this.setState({moveX: move});
        }
        if (code === 68) {
            let move = this.state.moveX;
            move++;
            this.setState({moveX: move});
        }
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
            <div>
                <canvas id="canvas"></canvas>
            </div>
        );
    }
}





