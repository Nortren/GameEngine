import * as React from 'react';

export default class TopMenu extends React.Component {

    constructor(props: object) {
        super(props);
        this.id = props.id;
        this.state = {
            style: {
                height: props.options ? (props.options.height || '') : '',
                width:  props.options ? (props.options.width || '') : '',
                justifyContent:  props.options ? (props.options.justifyContent || '') : '',
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
            this.props.options.componentArray.map(Component => (
                <Component.componentName key={Component.name + Component.id} options={Component}/>
            ))
        );
    }

    render() {


        return (
            <div className="topMenu_container" key={this.props.id} style={ this.state.style}>
                <div className="topMenu_container-components">
                    {this.props.options.componentArray ? this.getComponents() : ''}
                </div>
            </div>
        );
    }
}





