import * as React from 'react';
import EditorWindows from "./EditorWindows/EditorWindows";


export default class Editor extends React.Component {

private testSt = false;
private testTarget = null;
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
        document.addEventListener('mousedown',(event)=>{
            if(event.target.classList.contains('resizeActive')){
              this.testSt = true;
              this.testTarget = event.target;
            }
        });
        document.addEventListener('mousemove',(event)=>{
            if(this.testSt){
                this.testTarget.parentNode.style.width = event.x+'px';
                this.testTarget.parentNode.style.height = event.y+'px';
                    // console.log(event.x,event.y,event.target);

            }
           });
        document.addEventListener('mouseup',(event)=>{
            if(this.testSt){
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

                <EditorWindows id='editorHeader' position="top" />
                <EditorWindows id='sceneObject' position="left" />
                <EditorWindows id='inspector' position="right"/>
                <EditorWindows id='editorFooter' position="bottom"/>

            </div>
        );
    }
}





