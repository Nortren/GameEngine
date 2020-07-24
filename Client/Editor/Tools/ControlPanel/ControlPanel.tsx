import * as React from 'react';
import Button from "../../Controls/Button/Button";
import FPSCounter from "./FPSCounter/FPSCounter";

interface IControlPanel {
    options: {
        componentArray: object[],
        componentName: ControlPanel,
        height: string,
        id: string | number,
        width: string,
        justifyContent: string,
        justifySelf: string
    }
}
interface IComponent {
    componentName:object;
    name:string;
    id: string | number;
}

type MyState = {
    style: object
}

/**
 * Класс реализующий центральную панель управления с отображением счетчика FPS
 */
export default class ControlPanel extends React.Component {

    id: string | number;
    state:MyState;
    props:IControlPanel;
    constructor(props: IControlPanel) {
        super(props);
        this.id = props.options.id;
        this.state = {
            style: {
                height: props.options.height || '100%',
                width: props.options.width,
                justifySelf: props.options.justifySelf,
            },
        };
    }

    /**
     * Метод который рендерит переданные в наш компонент сторонние компоненты
     * @returns {any}
     */
    getComponents() {
        return (
            this.props.options.componentArray.map((Component:React.Component<IComponent>) => (
                <Component.componentName key={Component.name + Component.id} options={Component}/>
            ))
        );
    }

    render() {

        return (
            <div className="controlPanel_container">
                <div className="controlPanel_container-left">
                </div>
                <div className="controlPanel_container-center">
                    {this.props.options.componentArray ? this.getComponents() : ''}
                </div>
                <div className="controlPanel_container-right">
                    <FPSCounter/>
                </div>
            </div>
        );
    }
}





