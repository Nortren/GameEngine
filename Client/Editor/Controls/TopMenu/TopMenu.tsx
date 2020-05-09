import * as React from 'react';

export default class TopMenu extends React.Component {

    constructor(props: object) {
        super(props);
        this.id = props.id;
        this.state = {
            style: {
                height: props.params ? (props.params.height || '') : '',
                width:  props.params ? (props.params.width || '') : '',
                justifyContent:  props.params ? (props.params.justifyContent || '') : '',
            },
            moveY: 0, countMove: 0,
            moveXBoll: true,
            fps: 0
        };
    }

    componentDidMount() {

    };

    componentDidUpdate() {

    }


    /**
     * Метод который рендерит переданные в наш компонент сторонние компоненты
     * @returns {any}
     */
    getComponents() {
        return (
            this.props.params.componentArray.map(Component => (
                <Component.componentName key={Component.name + Component.id} params={Component}/>
            ))
        );
    }

    render() {


        return (
            <div className="topMenu_container" key={this.props.id} style={ this.state.style}>
                <div className="topMenu_container-components">
                    {this.props.params.componentArray ? this.getComponents() : ''}
                </div>
            </div>
        );
    }
}





