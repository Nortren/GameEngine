import * as React from 'react';


export default class Editor extends React.Component {


    constructor(props: object) {
        super(props);
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
            <div className="editor_windows_container" style={this.state.style}>

            </div>
        );
    }
}





