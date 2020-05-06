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
// document.addEventListener()
//         this.resize();

    }

    resize = event => {
        //Получаем главную сетку которую ибудем двигать
        if (event) {
            let mainGrid = event.target.parentNode.parentNode;
        }

        console.log(event);
    };

    componentDidUpdate() {
        this._animate = this.props.animations;
    }

    /**
     * Метод который рендерит переданные в наш компонент сторонние компоненты
     * @returns {any}
     */
    getComponents() {
        return (
                this.props.components.map(Component => (
                    <Component/>
                ))
        );
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
        this.componentE = '';

        if(this.props.components) {
            this.componentE = this.props.components.forEach((component) => {
                return this.getComponents(component)
            });
        }
        return (
            <div className="editor_windows_container" id={this.id} style={this.state.style}>
                <div className={topResizeLine}></div>
                <div className={leftResizeLine}></div>
                <div className={rightResizeLine}></div>
                <div className={bottomResizeLine}></div>
                <div className="editor_windows_container-stackPanel">
                    {this.props.components ?  this.getComponents() : ''}
                </div>
            </div>
        );
    }
}





