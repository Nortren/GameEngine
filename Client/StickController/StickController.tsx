import * as React from 'react';


/**
 * Компонент построения графиков в режими реального времени
 */
export default class StickController extends React.Component {
    userSpeed: number = 10;

    constructor(props) {

        super(props);
        this.changeX = this.changeX.bind(this);
        this.changeY = this.changeY.bind(this);
        this.directionOfMovement = this.directionOfMovement.bind(this);
        this.animationStatusChange = this.animationStatusChange.bind(this);
        this.state = {
            moveX: 0,
            moveY: 0, countMove: 0,
            moveXBoll: true
        };
    }

    componentDidMount() {
        this.createCanvas("UserLeftStick");
        this.createCanvas("UserRightStick");


        this.thisXUp = 0;
        this.thisYUp = 0;
        let evenObject = document.getElementById('UserLeftStick');
        document.addEventListener('keydown', (event) => {
            this.animationStatusChange(true);
            this.movePosition(event);

        });
        document.addEventListener('keyup', (event) => {
            this.animationStatusChange(false);
            this.movePosition(event);

        });
        evenObject.addEventListener("touchstart", (event) => {
            this.touchStartPositionX = event.changedTouches[0].clientX;
            this.touchStartPositionY = event.changedTouches[0].clientY;
            this._startAnimationTouch = true;

            this._startAnimationTouch = setInterval(() => {
                this.movePosition(event);
            }, 10);
            this.animationStatusChange(true);
        }, false);
        evenObject.addEventListener("touchend", (event) => {
            clearInterval(this._startAnimationTouch);
            this.animationStatusChange(false);
        }, false);
        evenObject.addEventListener("touchmove", (event) => {
            this.touchMovePositionX = event.changedTouches[0].clientX;
            this.touchMovePositionY = event.changedTouches[0].clientY;
        }, false);

    }

    createCanvas(id) {
        let canvas = document.getElementById(id);
        canvas.width = 100;
        canvas.height = 100;
        let context = canvas.getContext("2d");
        context.beginPath();
        context.arc(350, 90, 50, 0, Math.PI * 2, false);
        context.closePath();
        context.fill();
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.arc(51, 50, 45, 0, Math.PI * 2, false);
        context.fillStyle = 'transparent';
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = 'red';
        context.stroke();
    }

    movePosition(e) {
        let moveX = this.touchMovePositionX;
        let moveY = this.touchMovePositionY;
        let resPosX = (this.thisXUp > moveX);
        let resPosY = (this.thisYUp > moveY);

        let xTest = Math.abs(this.thisXUp - moveX);
        let yTest = Math.abs(this.thisYUp - moveY);

        this.moveDirection;
        if (yTest > 2) {
            if (resPosY) {
                this.moveDirection = "UP";
            }
            if (!resPosY) {
                this.moveDirection = "DOWN";
            }
        }
        if (xTest > 2) {
            if (resPosX) {
                this.moveDirection = "LEFT";
            }
            if (!resPosX) {
                this.moveDirection = "RIGHT";
            }
        }

        let code = e.keyCode;
        if (code === 87) {
            this.moveDirection = "UP"
        }
        if (code === 83) {
            this.moveDirection = "DOWN"
        }
        if (code === 65) {
            this.moveDirection = "LEFT"
        }
        if (code === 68) {
            this.moveDirection = "RIGHT"
        }

        this.thisXUp = moveX;
        this.thisYUp = moveY;


        this._animate = true;
        if (this.moveDirection === "UP") {
            let move = this.state.moveY;
            move += this.userSpeed;
            this.setState({moveY: move});
            this.changeY(move);
        }
        if (this.moveDirection === "DOWN") {
            let move = this.state.moveY;
            move -= this.userSpeed;
            this.setState({moveY: move});
            this.changeY(move);
        }
        if (this.moveDirection === "LEFT") {
            let move = this.state.moveX;
            move += this.userSpeed;
            this.setState({moveX: move});
            this.changeX(move);
        }
        if (this.moveDirection === "RIGHT") {
            let move = this.state.moveX;
            move -= this.userSpeed;
            this.setState({moveX: move});
            this.changeX(move);
        }
        this.directionOfMovement(this.moveDirection);
    }

    directionOfMovement(result) {
        this.props.directionOfMovement(result);

    }

    animationStatusChange(result) {
        this.props.animationStatusChange(result);

    }

    changeX(params) {
        this.props.changeX(params);
    }

    changeY(params) {
        this.props.changeY(params);
    }

    render() {
        return (
            <div className="Sticks">
                <div className="leftStick">
                    <canvas id="UserLeftStick"></canvas>
                </div>
                <div className="rightStick">
                    <canvas id="UserRightStick"></canvas>
                </div>
            </div>
        );
    }
}





