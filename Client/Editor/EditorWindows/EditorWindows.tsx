import * as React from 'react';


export default class EditorWindows extends React.Component {


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

        this.resize();
    }

    resize = event => {
        //Получаем главнуюсетку которую ибудем двигать
        let mainGrid = event.target.parentNode.parentNode;
        console.log(event);
    };

    componentDidUpdate() {
        this._animate = this.props.animations;
    }

    render() {

        let horizontalResizeLine = 'editor_windows_container-resizeLine-H';
        let verticalResizeLine = 'editor_windows_container-resizeLine-V';

        let topResizeLine = horizontalResizeLine + ' resizeLineTop';
        let leftResizeLine = verticalResizeLine + ' resizeLineLeft';
        let rightResizeLine = verticalResizeLine + ' resizeLineRight';
        let bottomResizeLine = horizontalResizeLine + ' resizeLineBottom';

        topResizeLine = this.props.position === 'top' ? topResizeLine : topResizeLine + ' resizeActive';
        leftResizeLine = this.props.position === 'left' ? leftResizeLine : leftResizeLine + ' resizeActive';
        rightResizeLine = this.props.position === 'right' ? rightResizeLine : rightResizeLine + ' resizeActive';
        bottomResizeLine = this.props.position === 'bottom' ? bottomResizeLine : bottomResizeLine + ' resizeActive';

        return (
            <div className="editor_windows_container" id={this.id} style={this.state.style}>
                <div onMouseDown={this.resize} className={topResizeLine}></div>
                <div onMouseDown={this.resize} className={leftResizeLine}></div>
                <div onMouseDown={this.resize} className={rightResizeLine}></div>
                <div onMouseDown={this.resize} className={bottomResizeLine}></div>
                <div onMouseDown={this.resize} className="editor_windows_container-stackPanel"></div>
            </div>
        );
    }
}





