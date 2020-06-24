import * as React from 'react';
import EditorWindows from "./EditorWindows/EditorWindows";
import TopMenu from "./Controls/TopMenu/TopMenu";
import DropDownButton from "./Controls/DropDownButton/DropDownButton";
import Button from "./Controls/Button/Button";
import LayoutBrowserTabs from "./Controls/LayoutBrowserTabs/LayoutBrowserTabs";
import ImageEditor from './Controls/ImageEditor/ImageEditor';

import Hierarchy from "./Tools/Hierarchy/Hierarchy";
import Inspector from "./Tools/Inspector/Inspector";
import Project from "./Tools/Project/Project";
import ControllPanel from "./Tools/ControllPanel/ControllPanel";

export const GlobalEditorContext = React.createContext();

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

        document.addEventListener("Hide screen scene", (event) => {
            this.hideEditorToolbar();
        });
        document.addEventListener("ReadFile", (event) => {
            this.setState({inspectorData: event.detail})
        });
        document.addEventListener("LoadStart", (event) => {
            this.setState({testLoaderStatus: event.detail.status})
        });
    }

    hideEditorToolbar() {
        document.querySelector('.editor_container').classList.add('editor_container-full');
        document.getElementById('sceneObject').classList.add('editor_container-sceneObject');
        document.getElementById('inspector').classList.add('editor_container-inspector');
        document.querySelector('.editor_visibleButton-button').classList.add('editor_visibleButton-button-visible');
    }

    fullscreenEditorToolbar() {
        document.querySelector('.editor_container').classList.remove('editor_container-full');
        document.getElementById('sceneObject').classList.remove('editor_container-sceneObject');
        document.getElementById('inspector').classList.remove('editor_container-inspector');
        document.querySelector('.editor_visibleButton-button').classList.remove('editor_visibleButton-button-visible');
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

        const fileButton = {
            componentName: DropDownButton,
            name: 'file',
            id: 1,
            componentArray: [],
            linkList: ['Settings', 'Add Object', 'Scene', {
                name: 'TestList',
                arrayList: ['Settings', 'Add Object', 'Scene']
            }, 'Tools', 'Windows Manager', 'About Program']
        };
        const gameObjectButton = {componentName: DropDownButton, name: 'game object', id: 3, componentArray: []};
        const componentButton = {componentName: DropDownButton, name: 'component', id: 4, componentArray: []};

        const topMenuHeader = {
            componentName: TopMenu,
            id: 1,
            componentArray: [fileButton, editButton, gameObjectButton, componentButton]
        };
        const handTool = {componentName: Button, name: '',iconType:'MousePointer',iconSize:'1x', id: 1, componentArray: []};
        const moveTool = {componentName: Button, name: 'Full screen scene',iconType:'Expand',iconSize:'1x', id: 2, componentArray: []};
        const rotateTool = {componentName: Button, name: '',iconType:'Redo',iconSize:'1x', id: 3, componentArray: []};
        const scaleTool = {componentName: Button, name: 'Hide screen scene',iconType:'ArrowsAlt',iconSize:'1x', id: 4, componentArray: []};
        const rectTool = {componentName: Button, name: '',iconType:'Dropper',iconSize:'1x', id: 4, componentArray: []};
        const customEditorTool = {componentName: Button,iconType:'Dropper',iconSize:'1x', id: 4, componentArray: []};

        const bottomMenuHeader = {
            componentName: TopMenu,
            id: 2,
            componentArray: [handTool, moveTool, rotateTool, scaleTool, rectTool, customEditorTool]
        };

        const start = {componentName: Button, name: '',iconType:'Dropper',iconSize:'1x', id: 1, componentArray: []};
        const pause = {componentName: Button, name: '',iconType:'Dropper',iconSize:'1x', id: 2, componentArray: []};
        const step = {componentName: Button, name: '',iconType:'Dropper',iconSize:'1x', id: 3, componentArray: []};

        const sceneTopMenuHeader = {
            componentName: ControllPanel,
            id: 3,
            height: '5%',
            justifyContent: 'center',
            componentArray: [start, pause, step]
        };


        const ToolHierarch = {componentName: Hierarchy, id: 1, componentArray: [], style: {maxHeight: '77vh'}};
        const ToolInspector = {
            componentName: Inspector,
            id: 1,
            componentArray: [],
            style: {maxHeight: '77vh'},
            inspectorData: this.state.inspectorData
        };
        const ToolProject = {componentName: Project, id: 1, componentArray: [], style: {maxHeight: '77vh'}};

        const tabSceneObject = {
            componentName: LayoutBrowserTabs,
            id: 1,
            componentArray: [ToolHierarch, ToolInspector, ToolProject],
            style: {maxHeight: '58vh'}
        };
        const tabInspector = {
            componentName: LayoutBrowserTabs,
            id: 2,
            componentArray: [ToolInspector, ToolHierarch],
            style: {maxHeight: '58vh'}
        };
        const tabEditorFooter = {
            componentName: LayoutBrowserTabs,
            id: 3,
            componentArray: [ToolProject]
        };
        const inspectorData = this.state.inspectorData;
        const testLoaderStatus = this.state.testLoaderStatus;
        return (
            <div className="editor">
                <div className="editor_visibleButton">
                    <button onClick={this.fullscreenEditorToolbar.bind(this)} className="editor_visibleButton-button">
                        
                    </button>
                </div>
                <GlobalEditorContext.Provider value={{inspectorData, testLoaderStatus}}>
                    <div className="editor_container">
                        <EditorWindows id='editorHeader' position="top"
                                       componentArray={[topMenuHeader, bottomMenuHeader]}/>
                        <EditorWindows id='sceneObject' position="left" componentArray={[tabSceneObject]}/>
                        <EditorWindows id='scene' position="center" componentArray={[sceneTopMenuHeader]}
                                       templateStyle={{border: "none"}}/>
                        <EditorWindows id='inspector' position="right" componentArray={[tabInspector]}/>
                        <EditorWindows id='editorFooter' position="bottom" componentArray={[tabEditorFooter]}/>
                        <ImageEditor/>
                    </div>
                </GlobalEditorContext.Provider>
            </div>
        );
    }
}





