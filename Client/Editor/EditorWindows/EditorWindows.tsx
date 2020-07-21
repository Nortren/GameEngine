import * as React from 'react';

interface IEditorWindows {
    id: string | number,
    mobile?: boolean,
    height?: string,
    width?: string,
    justifySelf?: string,
    templateStyle?: string,
    position: string,
    componentArray: object[]
}
type MyProps = {
    componentArray: object[];
    id:string;
    position:string;
};
type MyState = {
    style: object;
    templateStyle: string;
    moveY: number;
    countMove: number;
    moveXBoll: boolean;
    fps: number;
};
export default class EditorWindows extends React.Component {
    id: string | number;
    count: number;
    componentArray: object[];
    position: string;
    state: MyState;
    props: MyProps;

    constructor(props: IEditorWindows) {
        super(props);
        this.id = props.id;
        this.count = 0;
        this.state = {
            style: {
                height: props.height || '100%',
                width: props.width,
                justifySelf: props.justifySelf,
            },
            templateStyle: props.templateStyle,
            moveY: 0,
            countMove: 0,
            moveXBoll: true,
            fps: 0
        };
    }

    componentDidMount() {


    }

    resize = event => {
        //Получаем главную сетку которую будем двигать
        if (event) {
            let mainGrid = event.target.parentNode.parentNode;
        }


    };

    /**
     * Метод который рендерит переданные в наш компонент сторонние компоненты
     * @returns {any}
     */
    getComponents() {

        return (
            this.props.componentArray.map((Component:React.Component<IEditorWindows>) => (
                <Component.componentName key={Component.componentName.name + Component.id} options={Component}/>

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
        return (
            <div className="editor_windows_container" id={this.id} style={this.state.style}>
                <div className={topResizeLine}></div>
                <div className={leftResizeLine}></div>
                <div className={rightResizeLine}></div>
                <div className={bottomResizeLine}></div>
                <div className="editor_windows_container-stackPanel" style={this.state.templateStyle}>
                    {this.props.componentArray ? this.getComponents() : ''}
                </div>
            </div>
        );
    }
}





