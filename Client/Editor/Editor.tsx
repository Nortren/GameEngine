import * as React from 'react';
import EditorWindows from "./EditorWindows/EditorWindows";
import TopMenu from "./Controls/TopMenu/TopMenu";
import DropDownButton from "./Controls/DropDownButton/DropDownButton";
import Button from "./Controls/Button/Button";
import LayoutBrowserTabs from "./Controls/LayoutBrowserTabs/LayoutBrowserTabs";

import ImageEditor from './Controls/ImageEditor/ImageEditor';
import CodeEditor from './Controls/CodeEditor/CodeEditor';
import ColorPalette from "./Controls/ColorPalette/ColorPalette";
import DragAndDropContainer from "./Controls/DragAndDropContainer/DragAndDropContainer";

import Hierarchy from "./Tools/Hierarchy/Hierarchy";
import Inspector from "./Tools/Inspector/Inspector";
import Project from "./Tools/Project/Project";
import MapCreator from "./Tools/MapCreator/MapCreator";
import ControlPanel from "./Tools/ControlPanel/ControlPanel";

export const GlobalEditorContext = React.createContext(0);

export default class Editor extends React.Component {

    private testSt = false;
    private testTarget = null;
    private _styleTargetElement:number = 0;
    private _startWidth:number = 0;
    private _startHeight:number = 0;
    private _styleTargetElementX:number;
    private _styleTargetElementY:number;
    private _editorWindowStartPositionX:number;
    private _editorWindowStartPositionY:number;
    moveElement:string;
    startPositionX:number;
    startPositionY:number;
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
        this._startHeight = parseInt(window.getComputedStyle(document.getElementById('editorFooter')).height);

        document.addEventListener("Hide screen scene", (event) => {
            this.hideEditorToolbar();
        });
        document.addEventListener("ReadFile", (event:CustomEvent) => {
            this.setState({inspectorData: event.detail})
        });
        document.addEventListener("LoadStart", (event:CustomEvent) => {
            this.setState({loaderStatus: event.detail.status})
        });
    }
    /**
     * Метод скрывающий окна редактора оставляет только кнопку вернуть в первоначальное положение
     */
    hideEditorToolbar() {
        document.querySelector('.editor_container').classList.add('editor_container-full');
        document.getElementById('sceneObject').classList.add('editor_container-sceneObject');
        document.getElementById('inspector').classList.add('editor_container-inspector');
        document.querySelector('.editor_visibleButton-button').classList.add('editor_visibleButton-button-visible');
    }

    /**
     * Метод разворачивающий окна редактора на весь экран
     */
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
                if (!this._editorWindowStartPositionX) {
                    this._editorWindowStartPositionX = this.startPositionX;
                }
                if (!this._editorWindowStartPositionY) {
                    this._editorWindowStartPositionY = this.startPositionY;
                }

                if (this.moveElement === 'resizeLineTop') {
                    let resultResizeY = this.startPositionY - event.y;

                    if (resultResizeY > 0 || parseInt(this.testTarget.parentNode.style.height) > this._startHeight) {
                        this.testTarget.parentNode.style.position = '';
                        this.testTarget.parentNode.style.height = this._styleTargetElementY + (this.startPositionY - event.y) + 'px';
                        this._editorWindowStartPositionY = event.y;
                    }
                    else {
                        this.testTarget.parentNode.style.position = 'absolute';
                        this.testTarget.parentNode.style.top = Math.abs(event.y - this._editorWindowStartPositionY) + 'px';
                        this.testTarget.parentNode.style.height = this._styleTargetElementY + (this.startPositionY - event.y) + 'px';
                    }
                }
                //TODO метод для правильного ресайза правого окна
                else if (this.moveElement === 'resizeLineLeft' && event.x <= window.innerWidth) {
                    let resultResizeX = this.startPositionX - event.x;

                    if (resultResizeX > 0 || parseInt(this.testTarget.parentNode.style.width) > this._startWidth) {
                        this.testTarget.parentNode.style.position = '';
                        this.testTarget.parentNode.style.width = this._styleTargetElementX + (this.startPositionX - event.x) + 'px';
                        this._editorWindowStartPositionX = event.x;
                    }
                    else {
                        this.testTarget.parentNode.style.position = 'absolute';
                        this.testTarget.parentNode.style.left = Math.abs(event.x - this._editorWindowStartPositionX) + 'px';
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
        const gameObjectButton = {
            componentName: DropDownButton, name: 'game object', id: 3, componentArray: [],
            linkList: ['Create Empty',
                {
                    name: 'Create 3d Object',
                    arrayList: [
                        'BoxGeometry',
                        'CylinderGeometry',
                        'SphereGeometry',
                        'ConeGeometry',
                        'ExtrudeGeometry',
                        'LatheGeometry',
                        'ParametricGeometry',
                        'PlaneGeometry',
                        'RingGeometry',
                        'ShapeGeometry',
                        'TorusGeometry',
                        'TorusKnotGeometry',
                        'TubeGeometry'
                    ]
                }, {
                    name: 'Create 2d Object',
                    arrayList: [
                        'Bone',
                        'Group',
                        'InstancedMesh',
                        'Line',
                        'LineLoop',
                        'LineSegments',
                        'LOD',
                        'Mesh',
                        'Points',
                        'Skeleton',
                        'SkinnedMesh',
                        'Sprite'
                    ]
                }, 'Effect', 'Light', 'Audio', 'Video', 'UI', 'Camera']
        };
        const componentButton = {componentName: DropDownButton, name: 'component', id: 4, componentArray: []};

        const topMenuHeader = {
            componentName: TopMenu,
            id: 1,
            componentArray: [fileButton, editButton, gameObjectButton, componentButton]
        };
        const handTool = {
            componentName: Button,
            name: 'movingObject',
            iconType: 'MousePointer',
            iconSize: '1x',
            id: 1,
            componentArray: []
        };
        const cameraTool = {
            componentName: Button,
            name: 'CameraControl',
            iconType: 'CameraRetro',
            iconSize: '1x',
            id: 2,
            componentArray: []
        };
        const moveTool = {
            componentName: Button,
            name: 'Full screen scene',
            iconType: 'ArrowsAlt',
            iconSize: '1x',
            id: 2,
            componentArray: []
        };
        const rotateTool = {
            componentName: Button,
            name: '',
            iconType: 'Redo',
            iconSize: '1x',
            id: 3,
            componentArray: []
        };
        const scaleTool = {
            componentName: Button,
            name: 'Hide screen scene',
            iconType: 'Expand',
            iconSize: '1x',
            id: 4,
            componentArray: []
        };
        const rectTool = {
            componentName: Button,
            name: '',
            iconType: 'ObjectUngroup',
            iconSize: '1x',
            id: 4,
            componentArray: []
        };
        const customEditorTool = {componentName: Button, iconType: 'List', iconSize: '1x', id: 4, componentArray: []};

        const bottomMenuHeader = {
            componentName: TopMenu,
            id: 2,
            componentArray: [handTool, cameraTool, moveTool, rotateTool, scaleTool, rectTool, customEditorTool]
        };

        const start = {componentName: Button, name: '', iconType: 'Play', iconSize: '1x', id: 1, componentArray: []};
        const pause = {componentName: Button, name: '', iconType: 'Pause', iconSize: '1x', id: 2, componentArray: []};
        const step = {componentName: Button, name: '', iconType: 'Forward', iconSize: '1x', id: 3, componentArray: []};

        const sceneTopMenuHeader = {
            componentName: ControlPanel,
            id: 3,
            height: '5%',
            justifyContent: 'center',
            componentArray: [start, pause, step]
        };

        const ColorPaletteBlock = {
            componentName: ColorPalette,
            id: 3
        };
        const CodeEditorBlock = {
            componentName: CodeEditor,
            id: 3
        };
        const ToolHierarch = {componentName: Hierarchy, id: 1, componentArray: [], style: {maxHeight: '77vh'}};
        const ToolMapCreator = {componentName: MapCreator, id: 1, componentArray: [], style: {maxHeight: '77vh'}};
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
            componentArray: [ToolHierarch, ToolInspector, ToolProject,ToolMapCreator],
            style: {maxHeight: '58vh'}
        };
        const tabInspector = {
            componentName: LayoutBrowserTabs,
            id: 2,
            componentArray: [ToolInspector, ToolHierarch,ToolMapCreator],
            style: {maxHeight: '58vh'}
        };
        const tabEditorFooter = {
            componentName: LayoutBrowserTabs,
            id: 3,
            componentArray: [ToolProject]
        };
        const inspectorData = this.state.inspectorData;
        const loaderStatus = this.state.loaderStatus;


        return (
            <div className="editor">
                <div className="editor_visibleButton">
                    <button onClick={this.fullscreenEditorToolbar.bind(this)} className="editor_visibleButton-button">
                        
                    </button>
                </div>
                <GlobalEditorContext.Provider value={{inspectorData, loaderStatus}}>
                    <div className="editor_container">
                        <EditorWindows id='editorHeader' position="top"
                                       componentArray={[topMenuHeader, bottomMenuHeader]}/>
                        <EditorWindows id='sceneObject' position="left" componentArray={[tabSceneObject]}/>
                        <EditorWindows id='scene' position="center" componentArray={[sceneTopMenuHeader]}
                                       templateStyle={{border: "none"}}/>
                        <EditorWindows id='inspector' position="right" componentArray={[tabInspector]}/>
                        <EditorWindows id='editorFooter' position="bottom" componentArray={[tabEditorFooter]}/>
                        <ImageEditor/>
                        <DragAndDropContainer id="dragAndDropContainer_1" componentArray={[ColorPaletteBlock]}/>
                        <DragAndDropContainer id="dragAndDropContainer_2" componentArray={[CodeEditorBlock]}/>
                    </div>
                </GlobalEditorContext.Provider>
            </div>
        );
    }
}





