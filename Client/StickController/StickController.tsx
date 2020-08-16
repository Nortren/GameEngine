import * as React from 'react';
import BL from "../BusinessLogic";

interface IProps {
    showMobileController: boolean;
}

/**
 * Компонент построения графиков в режими реального времени
 */
export default class StickController extends React.Component {
    blData: BL;
    pressedKeys: string[];
    startPositionX: number;
    startPositionZ: number;
    autoMove: NodeJS.Timeout;
    props: IProps;

    constructor(props) {

        super(props);
        this.state = {
            moveX: 0,
            moveZ: 0, countMove: 0,
            moveXBoll: true
        };
    }
    componentWillUnmount(){
        document.removeEventListener('mousedown');
        document.removeEventListener('mousemove');
        document.removeEventListener('mouseup');
        this.blData = null;
        this.autoMove = null;
        this.pressedKeys = null;
    }
    componentDidMount() {
        this.blData = new BL();
        this.pressedKeys = [];
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
        let canvas = document.getElementById(id) as HTMLCanvasElement;
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
        this.mouseControl();
    }

    /**
     * Контроллер мышки
     */
    mouseControl() {
        document.addEventListener('mousedown', () => {
            this.blData.setUserPosition({nameButton: 'ButtonAttack', press: true});
        });

        document.addEventListener('mousemove', (event) => {
            this.startPositionX = event.clientX;
            this.startPositionZ = event.clientY;
            this.blData.setUserPosition({
                event: 'mouseMove',
                x: this.startPositionX,
                z: this.startPositionZ,
                windowSize: {width: window.innerWidth, height: window.innerHeight}
            });
        });
        document.addEventListener('mouseup', () => {
            this.blData.setUserPosition({nameButton: 'ButtonAttack', press: false});
        });
    }

    /**
     * Контроллер нажатий на клавиатуре и мыши
     */
    keyBoardControl() {
        this.startEventPress();
        document.addEventListener('keydown', (event) => {

            this.checkArrayKey(event.code);

            if (!this.pressedKeys.length) {
                this.pressedKeys.push(event.code);
            }

        });
        document.addEventListener('keyup', (event) => {

            this.pressedKeys.forEach((key, index) => {
                if (key === event.code) {
                    this.pressedKeys.splice(index, 1);
                }
            });

            this.blData.setUserPosition('keyUp');
        });
    }

    /**
     * Метод отправки данных на бл который корректно отрабатывает нажатые клавиши
     * (Т.К нам надо знать клавиша все еще нажата или нет и в зависимости от этого оповещать сервер)
     */
    startEventPress() {
        setInterval(() => {
            if (this.pressedKeys.length) {
                this.blData.setUserPosition(this.pressedKeys);
            }

        }, 30)
    }

    /**
     *  Метод сбора нажатых клавишь(для проверки одновременного нажатия)
     * @param key
     * @returns {Array}
     */

    checkArrayKey(key) {
        const resultCheckKey = this.pressedKeys.filter((keyCode) => {
            return keyCode === key
        });
        if (!resultCheckKey.length) {
            this.pressedKeys.push(key);
        }

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
            clearInterval(this.autoMove);
            this.autoMove = null;
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

    render() {
        const display = this.props.showMobileController ? 'flex' : 'none';
        return (
            <div className="Sticks" style={{display}}>
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





