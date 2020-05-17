import * as React from 'react';
import EditorWindows from "./EditorWindows/EditorWindows";
import TopMenu from "./Controls/TopMenu/TopMenu";
import DropDownButton from "./Controls/DropDownButton/DropDownButton";
import Button from "./Controls/Button/Button";
import LayoutBrowserTabs from "./Controls/LayoutBrowserTabs/LayoutBrowserTabs";


import Hierarchy from "./Tools/Hierarchy/Hierarchy";
import ObjectView from "./Tools/ObjectView/ObjectView";
import Project from "./Tools/Project/Project";



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

        document.addEventListener("Full screen scene", (event) => {
         this.hideEditorToolbar();
        });
    }

    hideEditorToolbar(){
        console.log(12312312);
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
                if (!this.testSPX) {
                    this.testSPX = this.startPositionX;
                }
                if (!this.testSPY) {
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


        const editButton = {componentName: DropDownButton, name: 'edit', id: 2, componentArray: []};

        const fileButton = {componentName: DropDownButton, name: 'file', id: 1, componentArray: [], linkList:['Settings','Add Object','Scene',{name:'TestList',arrayList:['Settings','Add Object','Scene']},'Tools','Windows Manager','About Program']};
        const gameObjectButton = {componentName: DropDownButton, name: 'game object', id: 3, componentArray: []};
        const componentButton = {componentName: DropDownButton, name: 'component', id: 4, componentArray: []};

        const topMenuHeader = {componentName: TopMenu, id: 1, componentArray: [fileButton, editButton, gameObjectButton, componentButton]};

        const handTool = {componentName: Button,name:'', icon: '', id: 1, componentArray: []};
        const moveTool = {componentName: Button,name:'Full screen scene', icon: '', id: 2, componentArray: []};
        const rotateTool = {componentName: Button,name:'', icon: '', id: 3, componentArray: []};
        const scaleTool = {componentName: Button,name:'', icon: '', id: 4, componentArray: []};
        const rectTool = {componentName: Button,name:'', icon: '', id: 4, componentArray: []};
        const customEditorTool = {componentName: Button, name: '', id: 4, componentArray: []};

        const bottomMenuHeader = {componentName: TopMenu, id: 2, componentArray: [handTool, moveTool, rotateTool, scaleTool,rectTool,customEditorTool]};

        const start = {componentName: Button, name: '', id: 1, componentArray: []};
        const pause = {componentName: Button, name: '', id: 2, componentArray: []};
        const step = {componentName: Button, name: '', id: 3, componentArray: []};

        const sceneTopMenuHeader = {componentName: TopMenu, id: 3, height:'5%',justifyContent: 'center', componentArray: [start, pause, step]};


        const ToolHierarch =  {componentName: Hierarchy, id: 1, componentArray: [],style:{maxHeight:'77vh'}};
        const ToolObjectView =  {componentName: ObjectView, id: 1, componentArray: [],style:{maxHeight:'77vh'}};
        const ToolProject =  {componentName: Project, id: 1, componentArray: [],style:{maxHeight:'77vh'}};

        const tabSceneObject = {componentName: LayoutBrowserTabs, id: 1, componentArray: [ToolHierarch,ToolObjectView,ToolProject],style:{maxHeight:'68vh'}};
        const tabInspector = {componentName: LayoutBrowserTabs, id: 2, componentArray: [ToolObjectView,ToolHierarch],style:{maxHeight:'68vh'}};
        const tabEditorFooter = {componentName: LayoutBrowserTabs, id: 3, componentArray: [ToolProject],style:{maxHeight:'20vh'}};

        return (
            <div className="editor_container">

                <EditorWindows id='editorHeader' position="top" componentArray={[topMenuHeader,bottomMenuHeader]}/>
                <EditorWindows id='sceneObject' position="left" componentArray={[tabSceneObject]}/>
                <EditorWindows id='scene' position="center" componentArray={[sceneTopMenuHeader]}/>
                <EditorWindows id='inspector' position="right"  componentArray={[tabInspector]}/>
                <EditorWindows id='editorFooter' position="bottom"   componentArray={[tabEditorFooter]}/>

            </div>
        );
    }
}





