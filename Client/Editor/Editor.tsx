import * as React from 'react';
import EditorWindows from "./EditorWindows/EditorWindows";




export default class Editor extends React.Component  {


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


    }
    componentDidUpdate() {
        this._animate = this.props.animations;
    }

    render() {
        return (
            <div className="editor_container">
                <EditorWindows/>
{/*<div className="editor_container__sceneObject"></div>*/}
{/*<div className="editor_container__projectStructure"></div>*/}
{/*<div className="editor_container_inspector"></div>*/}
            </div>
        );
    }
}





