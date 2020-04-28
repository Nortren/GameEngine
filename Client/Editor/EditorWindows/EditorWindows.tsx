import * as React from 'react';


export default class Editor extends React.Component {


    constructor(props: object) {
        super(props);
        this.id = props.id;
        this.state = {
            style: {
                height: props.height || '100%',
                width: props.width,
                justifySelf: props.justifySelf,
            },
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
            <div className="editor_windows_container" id={this.id} style={this.state.style}>
                <div id="resizeLineTop" className="editor_windows_container-resizeLine-H"></div>
                <div id="resizeLineLeft" className="editor_windows_container-resizeLine-V"></div>
                <div id="resizeLineRight" className="editor_windows_container-resizeLine-V"></div>
                <div id="resizeLineBottom" className="editor_windows_container-resizeLine-H"></div>

                <div className="editor_windows_container-stackPanel"></div>
            </div>
        );
    }
}





