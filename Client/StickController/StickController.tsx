import * as React from 'react';
import BL from "../BusinessLogic";

/**
 * Компонент построения графиков в режими реального времени
 */
export default class StickController extends React.Component {
    userSpeed: number = 30
    blData: BL;

    constructor(props) {

        super(props);
        this.changeX = this.changeX.bind(this);
        this.changeZ = this.changeZ.bind(this);
        this.directionOfMovement = this.directionOfMovement.bind(this);
        this.clickedSkillButton = this.clickedSkillButton.bind(this);
        this.animationStatusChange = this.animationStatusChange.bind(this);
        this.state = {
            moveX: 0,
            moveZ: 0, countMove: 0,
            moveXBoll: true
        };
    }

    componentDidMount() {
        this.blData = new BL();

        this.createCanvas("UserLeftStick", 100, 100, 45, 51, 50);
        this.createCanvas("ButtonAttack", 100, 100, 30, 51, 50);
        this.createCanvas("ButtonSkills_1", 35, 35, 15, 18, 18);
        this.createCanvas("ButtonSkills_2", 35, 35, 15, 18, 18);
        this.createCanvas("ButtonSkills_3", 35, 35, 15, 18, 18);


        this.skillButtonPress('ButtonAttack');
        this.skillButtonPress('ButtonSkills_1');
        this.skillButtonPress('ButtonSkills_2');
        this.skillButtonPress('ButtonSkills_3');


        this.controlOfManagement();
    }




    createCanvas(id, width, height, radius, startPositionX, startPositionY) {
        let canvas = document.getElementById(id);
        canvas.width = width;
        canvas.height = height;
        let context = canvas.getContext("2d");
        context.beginPath();
        context.arc(350, 90, 50, 0, Math.PI * 2, false);
        context.closePath();
        context.fill();
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.arc(startPositionX, startPositionY, radius, 0, Math.PI * 2, false);
        context.fillStyle = 'transparent';
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = 'red';
        context.stroke();
    }

    /**
     * Метод работы с устройствами ввода при нажатии на лкавишу или клик отправляем направление движения на сервер
     */
    controlOfManagement() {
        this.touchControl();
        this.keyBoardControl();
    }

    /**
     * Контроллер нажатий на клавиатуре и мыши
     */
    keyBoardControl() {
        document.addEventListener('keydown', (event) => {
            this.blData.setUserPosition(event.code);
        });
        document.addEventListener('keyup', (event) => {
            this.blData.setUserPosition('keyUp');
        });
    }

    /**
     * Контроллер нажатий Touch устройств (стик управление движением)
     */
    touchControl() {
        let evenObject = document.getElementById('UserLeftStick');
        evenObject.addEventListener('touchstart', (event) => {
            this.startPositionX = event.changedTouches[0].clientX;
            this.startPositionZ = event.changedTouches[0].clientY;
            this.blData.setUserPosition({event: 'touchstart', x: this.startPositionX, z: this.startPositionZ});
        });
        evenObject.addEventListener('touchmove', (event) => {
            this.startPositionX = event.changedTouches[0].clientX;
            this.startPositionZ = event.changedTouches[0].clientY;
            if (!this.autoMove) {
                this.autoMove = setInterval(() => {
                    this.blData.setUserPosition({event: 'touchmove', x: this.startPositionX, z: this.startPositionZ});
                }, 10);
            }
        });
        evenObject.addEventListener('touchend', (event) => {
            this.autoMove = clearInterval(this.autoMove);
            this.blData.setUserPosition({event: 'touchend'});
        });
    }

    /**
     * Управление нажатием на доп. стики (скилов и аттак)
     * @param nameButton
     */
    skillButtonPress(nameButton) {
        let evenObject = document.getElementById(nameButton);
        evenObject.addEventListener("touchstart", (event) => {
            this.blData.setUserPosition({nameButton: nameButton, press: true});
        }, false);
        evenObject.addEventListener("touchend", (event) => {
            this.blData.setUserPosition({nameButton: nameButton, press: false});
        }, false);
    }


    directionOfMovement(result) {
        this.props.directionOfMovement(result);

    }

    clickedSkillButton(result) {
        this.props.clickedSkillButton(result);
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
                    <canvas id="ButtonAttack"></canvas>
                    <canvas id="ButtonSkills_1"></canvas>
                    <canvas id="ButtonSkills_2"></canvas>
                    <canvas id="ButtonSkills_3"></canvas>
                </div>
            </div>
        );
    }
}





