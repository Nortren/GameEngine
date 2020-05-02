import * as React from 'react';
import EditorWindows from "./EditorWindows/EditorWindows";
import {match} from "minimatch";


export default class Editor extends React.Component {

    private testSt = false;
    private testTarget = null;
    private _styleTargetElement = 0;
    private _startWidth = 0;
    private _startHight = 0;


    constructor(props: object) {
        super(props);
        this.state = {
            moveX: 0,
            moveY: 0, countMove: 0,
            moveXBoll: true,
            fps: 0
        };
    }

    componentDidMount() {
        this.resizeWindows();
        this._startWidth = parseInt(window.getComputedStyle(document.getElementById('inspector')).width);
        this._startHight = parseInt(window.getComputedStyle(document.getElementById('editorFooter')).height);
    }

    /**
     * метод отвечающий за изменения размера окон редактора
     */
    resizeWindows(): void {
        document.addEventListener('mousedown', (event) => {
            let targetElement = event.target.parentNode;
            this._styleTargetElementX = parseInt(window.getComputedStyle(targetElement).width);
            this._styleTargetElementY = parseInt(window.getComputedStyle(targetElement).height);
            this.startPositionX = event.x;
            this.startPositionY = event.y;
            if (event.target.classList.contains('resizeActive')) {
                this.testSt = true;
                this.testTarget = event.target;
            }


            if (event.target.classList.contains('resizeLineTop')) {
                this.moveElement = 'resizeLineTop';
            }
            else if (event.target.classList.contains('resizeLineLeft')) {
                this.moveElement = 'resizeLineLeft';
            }
            else if (event.target.classList.contains('resizeLineRight')) {
                this.moveElement = 'resizeLineRight';
            }
            else if (event.target.classList.contains('resizeLineBottom')) {
                this.moveElement = 'resizeLineBottom';
            }

        });
        document.addEventListener('mousemove', (event) => {
            if (this.testSt) {
                if(!this.testSPX){
                    this.testSPX = this.startPositionX;
                }
                if(!this.testSPY){
                    this.testSPY = this.startPositionY;
                }

                if (this.moveElement === 'resizeLineTop') {
                    let resultResizeY = this.startPositionY - event.y;

                    if (resultResizeY > 0 || parseInt(this.testTarget.parentNode.style.height) > this._startHight) {
                        this.testTarget.parentNode.style.position = '';
                        this.testTarget.parentNode.style.height = this._styleTargetElementY + (this.startPositionY - event.y) + 'px';
                        this.testSPY = event.y;
                    }
                    else {
                        this.testTarget.parentNode.style.position = 'absolute';
                        this.testTarget.parentNode.style.top = Math.abs(event.y - this.testSPY) + 'px';
                        this.testTarget.parentNode.style.height = this._styleTargetElementY + (this.startPositionY - event.y) + 'px';
                    }
                }
                //TODO метод для правильного ресайза правого окна
                else if (this.moveElement === 'resizeLineLeft' && event.x <= window.innerWidth) {
                    let resultResizeX = this.startPositionX - event.x;

                    if (resultResizeX > 0 || parseInt(this.testTarget.parentNode.style.width) > this._startWidth) {
                        this.testTarget.parentNode.style.position = '';
                        this.testTarget.parentNode.style.width = this._styleTargetElementX + (this.startPositionX - event.x) + 'px';
                        this.testSPX = event.x;
                    }
                    else {
                        this.testTarget.parentNode.style.position = 'absolute';
                        this.testTarget.parentNode.style.left = Math.abs(event.x - this.testSPX) + 'px';
                        this.testTarget.parentNode.style.width = this._styleTargetElementX + (this.startPositionX - event.x) + 'px';
                    }

                }
                else if (this.moveElement === 'resizeLineRight') {
                    this.testTarget.parentNode.style.width = event.x + 'px';
                }
                else if (this.moveElement === 'resizeLineBottom') {
                    this.testTarget.parentNode.style.height = event.y + 'px';
                }
            }
        });
        document.addEventListener('mouseup', (event) => {
            if (this.testSt) {
                this.testSt = false;
            }
        });
    }

    componentDidUpdate() {
        this._animate = this.props.animations;
    }

    render() {
        return (
            <div className="editor_container">

                <EditorWindows id='editorHeader' position="top"/>
                <EditorWindows id='sceneObject' position="left"/>
                <EditorWindows id='inspector' position="right"/>
                <EditorWindows id='editorFooter' position="bottom"/>

            </div>
        );
    }
}





