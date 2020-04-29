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

        let horizontalResizeLine = 'editor_windows_container-resizeLine-H';
        let verticalResizeLine = 'editor_windows_container-resizeLine-V';


        const topResizeLine = this.props.position === 'top' ? horizontalResizeLine +' resizeLineTop' : horizontalResizeLine + ' resizeActive resizeLineTop';
        const leftResizeLine = this.props.position === 'left' ? verticalResizeLine + ' resizeLineLeft' : verticalResizeLine + ' resizeActive resizeLineLeft';
        const rightResizeLine = this.props.position === 'right' ? verticalResizeLine + ' resizeLineRight' : verticalResizeLine + ' resizeActive resizeLineRight';
        const bottomResizeLine = this.props.position === 'bottom' ? horizontalResizeLine + ' resizeLineBottom' : horizontalResizeLine + ' resizeActive resizeLineBottom';

        return (
            <div className="editor_windows_container" id={this.id} style={this.state.style}>
                <div className={topResizeLine}></div>
                <div className={leftResizeLine}></div>
                <div className={rightResizeLine}></div>
                <div className={bottomResizeLine}></div>
                <div className="editor_windows_container-stackPanel"></div>
            </div>
        );
    }
}





