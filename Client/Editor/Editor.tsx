import * as React from 'react';
import EditorWindows from "./EditorWindows/EditorWindows";


export default class Editor extends React.Component {


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

                <EditorWindows id='editorHeader' />
                <EditorWindows id='sceneObject' />
       
                <EditorWindows id='inspector'/>
                <EditorWindows id='editorFooter'/>

            </div>
        );
    }
}





