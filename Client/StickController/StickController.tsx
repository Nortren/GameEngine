import * as React from 'react';


/**
 * Компонент построения графиков в режими реального времени
 */
export default class StickController extends React.Component {

    constructor(props) {

        super(props);
        this.changeX = this.changeX.bind(this);
        this.changeY = this.changeY.bind(this);
        this.directionOfMovementX = this.directionOfMovementX.bind(this);
        this.directionOfMovementY = this.directionOfMovementY.bind(this);
        this.directionOfMovement = this.directionOfMovement.bind(this);
        this.state = {
            moveX: 0,
            moveY: 0, countMove: 0,
            moveXBoll: true
        };
    }

    componentDidMount() {
        this.thisXUp = 0;
        this.thisYUp = 0;

        this.touchStartPositionX;
        this.touchStartPositionY;
        this.touchMovePositionX;
        this.touchMovePositionY;
        this.touchEvent("UserLeftStick", this.changeX, this.changeY, this.directionOfMovementX, this.directionOfMovementY, this.directionOfMovement);
        this.createCanvas("UserLeftStick");
        this.createCanvas("UserRightStick");
    }

    touchEvent(touchControll, changeX, changeY, directionOfMovementX, directionOfMovementY, directionOfMovement) {
        let el = document.getElementById(touchControll);

        el.addEventListener("touchstart", (e) => {
            this.touchStartPositionX = e.changedTouches[0].clientX;
            this.touchStartPositionY = e.changedTouches[0].clientY;

        }, false);
        el.addEventListener("touchmove", (e) => {
            this.touchMovePositionX = e.changedTouches[0].clientX;
            this.touchMovePositionY = e.changedTouches[0].clientY;
            changeX(this.touchMovePositionX);
            changeY(this.touchMovePositionY);
            let resultMoveX = this.touchStartPositionX > this.touchMovePositionX;
            let resultMoveY = this.touchStartPositionY > this.touchMovePositionY;
            directionOfMovementX(resultMoveX);
            directionOfMovementY(resultMoveY);
            directionOfMovement(this.touchStartPositionX, this.touchMovePositionX, this.touchStartPositionY, this.touchMovePositionY);
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
        // context.fillRect(this.state.moveX, this.state.moveY, 100, 100);
        context.beginPath();
        context.arc(51, 50, 45, 0, Math.PI * 2, false);
        context.fillStyle = 'transparent';
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = 'red';
        context.stroke();
    }

    directionOfMovementX(params) {
        this.props.directionOfMovementX(params);
    }

    directionOfMovementY(params) {
        this.props.directionOfMovementY(params);
    }

    directionOfMovement(startX, moveX, startY, moveY) {
        let resPosX = (this.thisXUp > moveX);
        let resPosY = (this.thisYUp > moveY);

        let xTest = Math.abs(this.thisXUp - moveX);
        let yTest = Math.abs(this.thisYUp - moveY);

        if (yTest > 2) {
            if (resPosY) {
                this.props.directionOfMovement("UP")
            }
            if (!resPosY) {
                this.props.directionOfMovement("DOWN")
            }
        }
        if (xTest > 2) {
            if (resPosX) {
                this.props.directionOfMovement("LEFT")
            }
            if (!resPosX) {
                this.props.directionOfMovement("RIGHT")
            }
        }
        this.thisXUp = moveX;
        this.thisYUp = moveY;
    }

    changeX(params) {
        this.props.changeX(-params);
    }

    changeY(params) {
        this.props.changeY(-params);
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





