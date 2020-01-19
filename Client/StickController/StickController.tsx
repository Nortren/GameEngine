import * as React from 'react';


/**
 * Компонент построения графиков в режими реального времени
 */
export default class StickController extends React.Component {
    userSpeed: number = 10;

    constructor(props) {

        super(props);
        this.changeX = this.changeX.bind(this);
        this.changeZ = this.changeZ.bind(this);
        this.directionOfMovement = this.directionOfMovement.bind(this);
        this.animationStatusChange = this.animationStatusChange.bind(this);
        this.state = {
            moveX: 0,
            moveZ: 0, countMove: 0,
            moveXBoll: true
        };
    }

    componentDidMount() {
        this.createCanvas("UserLeftStick");
        this.createCanvas("UserRightStick");


        this.thisXUp = 0;
        this.thisZUp = 0;
        let evenObject = document.getElementById('UserLeftStick');
        document.addEventListener('keydown', (event) => {
            this.animationStatusChange(true);
            this.movePosition(event, true);

        });
        document.addEventListener('keyup', (event) => {
            this.animationStatusChange(false);
            this.movePosition(event, false);

        });
        evenObject.addEventListener("touchstart", (event) => {
            this.touchStartPositionX = event.changedTouches[0].clientX;
            this.touchStartPositionZ = event.changedTouches[0].clientZ;
            this._startAnimationTouch = true;

            this._startAnimationTouch = setInterval(() => {
                this.movePosition(event, true);
            }, 10);
            this.animationStatusChange(true);
        }, false);
        evenObject.addEventListener("touchend", (event) => {
            this.movePosition(event, false);
            clearInterval(this._startAnimationTouch);
            this.animationStatusChange(false);
        }, false);
        evenObject.addEventListener("touchmove", (event) => {
            this.touchMovePositionX = event.changedTouches[0].clientX;
            this.touchMovePositionZ = event.changedTouches[0].clientZ;
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

    movePosition(e, stopMove) {
        if (!stopMove) {
            this.moveKeyFix = clearInterval(this.moveKeyFix);
        }
        if (stopMove && !this.moveKeyFix) {
            this.moveKeyFix = setInterval(() => {
                //collisionObject это прроверка куда было движение перед тем как игрок столкнулся с препятствием, мы блокируем изминение координат по этому вектору
                this.collisionObject = this.props.physicalCollision;
                let moveX = this.touchMovePositionX;
                let moveZ = this.touchMovePositionY;
                let resPosX = (this.thisXUp > moveX);
                let resPosZ = (this.thisZUp > moveZ);

                let xTest = Math.abs(this.thisXUp - moveX);
                let zTest = Math.abs(this.thisZUp - moveZ);

                this.moveDirection;
                if (zTest > 2) {
                    if (resPosZ) {
                        this.moveDirection = "UP";
                    }
                    if (!resPosZ) {
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
                this.thisZUp = moveZ;


                this._animate = true;
                this.directionOfMovement(this.moveDirection);
                if (this.moveDirection === "UP" && this.collisionObject !== "UP") {

                    let move = this.state.moveZ;
                    move += this.userSpeed;
                    this.setState({moveZ: move});
                    this.changeZ(move);

                }

                if (this.moveDirection === "DOWN" && this.collisionObject !== "DOWN") {

                    let move = this.state.moveZ;
                    move -= this.userSpeed;
                    this.setState({moveZ: move});
                    this.changeZ(move);

                }
                if (this.moveDirection === "LEFT" && this.collisionObject !== "LEFT") {

                    let move = this.state.moveX;
                    move += this.userSpeed;
                    this.setState({moveX: move});
                    this.changeX(move);

                }
                if (this.moveDirection === "RIGHT" && this.collisionObject !== "RIGHT") {

                    let move = this.state.moveX;
                    move -= this.userSpeed;
                    this.setState({moveX: move});
                    this.changeX(move);

                }


            }, 10);
        }
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

    changeZ(params) {
        this.props.changeZ(params);
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





