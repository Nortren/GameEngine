import * as React from 'react';
import Button from "../../Controls/Button/Button";
import FPSCounter from "./FPSCounter/FPSCounter";
export default class ControllPanel extends React.Component {


    constructor(props: object) {
        super(props);
        this.id = props.id;
        this.state = {
            style: {
                height: props.height || '100%',
                width: props.width,
                justifySelf: props.justifySelf,
            },
        };
    }

    componentDidMount(a, b) {

    };

    componentDidUpdate(a, b) {

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
            <div className="controllPanel_container">
                <div className="controllPanel_container-left">
                </div>
                <div className="controllPanel_container-center">
                    {this.props.options.componentArray ? this.getComponents() : ''}
                </div>
                <div className="controllPanel_container-right">
                    <FPSCounter/>
                </div>
            </div>
        );
    }
}





