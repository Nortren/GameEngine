import * as React from 'react';
import EditorWindows from "./EditorWindows/EditorWindows";
import {match} from "minimatch";


export default class Editor extends React.Component {

    private testSt = false;
    private testTarget = null;
    private _styleTargetElement = 0;
    private _startWidth = 0;


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
    }

    /**
     * метод отвечающий за изменения размера окон редактора
     */
    resizeWindows(): void {
        document.addEventListener('mousedown', (event) => {
            let targetElement = event.target.parentNode;
            this._styleTargetElement = parseInt(window.getComputedStyle(targetElement).width);
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


                if (this.moveElement === 'resizeLineTop') {

                }
                //TODO метод для правильного ресайза правого окна
                else if (this.moveElement === 'resizeLineLeft' && event.x <= window.innerWidth) {
                    let resultResize = this.startPositionX - event.x;

                    if (resultResize > 0 || parseInt(this.testTarget.parentNode.style.width) > this._startWidth) {
                        this.testTarget.parentNode.style.position = '';
                        this.testTarget.parentNode.style.width = this._styleTargetElement + (this.startPositionX - event.x) + 'px';
                        this.testSPX = event.x;
                    }
                    else {
                        this.testTarget.parentNode.style.position = 'absolute';
                        this.testTarget.parentNode.style.left = Math.abs(event.x - this.testSPX) + 'px';
                        this.testTarget.parentNode.style.width = this._styleTargetElement + (this.startPositionX - event.x) + 'px';
                    }

                }
                else if (this.moveElement === 'resizeLineRight') {
                    this.testTarget.parentNode.style.width = event.x + 'px';
                }
                else if (this.moveElement === 'resizeLineBottom') {

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





