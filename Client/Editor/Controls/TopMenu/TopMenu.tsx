import * as React from 'react';

interface ITopMenu {
    id: string;
    options: ITopMenuOptions;
}

interface ITopMenuOptions {
    id?:string;
    height: string;
    width: string;
    justifyContent: string;
    componentArray?: object[]
}
interface IState {
    style: ITopMenuOptions;
}

/**
 * Компонент отображения верхнего меню(у нас реализован в несколько строк для разделения встроенных компонентов)
 */
export default class TopMenu extends React.Component {
    props: ITopMenu;
    state:IState;
    id: string;

    constructor(props: ITopMenu) {
        super(props);
        this.id = props.id;
        this.state = {
            style: {
                height: props.options ? (props.options.height || '') : '',
                width: props.options ? (props.options.width || '') : '',
                justifyContent: props.options ? (props.options.justifyContent || '') : '',
            },
        };
    }

    /**
     * Метод который рендерит переданные в наш компонент сторонние компоненты
     * @returns {any}
     */
    getComponents() {
        return (
            this.props.options.componentArray.map(Component => (
                <Component.componentName key={Component.name + Component.componentName.name + Component.id}
                                         options={Component}/>
            ))
        );
    }

    render() {
        return (
            <div className="topMenu_container" key={this.props.options.id} style={this.state.style}>
                <div className="topMenu_container-components">
                    {this.props.options.componentArray ? this.getComponents() : ''}
                </div>
            </div>
        );
    }
}





