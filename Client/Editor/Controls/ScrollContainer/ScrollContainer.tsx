import * as React from 'react';


interface IScrollContainer {
    id?:string;
    componentArray?: object[];
    options?:object;
    template?:object;
    type?:string;
}
interface IState {
    elementShiftVertical: number;
    elementShiftHorizontal: number;
}

//TODO доделать горизонтальный и переключение опциями
/**
 * Универсальный компонент слайдера(вертикальный/горизонтальный)
 */

export default class ScrollContainer extends React.Component {
    props:IScrollContainer;
    state:IState;
    constructor(props:IScrollContainer) {
        super(props);
        this.state = {
            elementShiftVertical: 0,
            elementShiftHorizontal: 0,
        };
    }


    /**
     * Метод который рендерит переданные в наш компонент сторонние компоненты
     * @returns {any}
     */
    getComponents() {

        return (
            this.props.componentArray.map(Component => (
                <div className="scroll_container-component"><Component.componentName className="scroll_container_component" key={(Component.name || '') + Component.id} options={Component}/></div>

            ))
        );
    }

    /**
     * Метод отображения вертикального скрола
     * @param componentRender
     * @param lengthArrayData
     * @param style
     */
    getVerticalCarousel(componentRender, lengthArrayData, style) {
        return (
            <div className="scroll_container">
                <div className="carousel_container-vertical">
                    <div style={style} className="carousel_vertical_line">

                        {
                            this.getComponents()
                        }

                    </div>
                </div>
            </div>
        );
    }

    /**
     * Метод отображения горизонтального скрола
     * @param componentRender
     * @param lengthArrayData
     * @param style
     */
    getHorizontalCarousel(componentRender, lengthArrayData, style) {
        return (
            <div className="carousel_horizontal">
                <div style={style} className="carousel_horizontal_line">
                    {
                        this.props.componentArray ? this.getComponents() : ''
                    }
                </div>
            </div>
        );
    }

    render() {
        const styleVertical = {top: this.state.elementShiftVertical};
        const styleHorizontal = {left: this.state.elementShiftHorizontal};
        //TODO эти данные должен отдавать сервер

        const elementContainerWidth = 300;
        const lengthArrayData = (this.props.componentArray ? this.props.componentArray.length : 0) * elementContainerWidth;
        const ComponentRender = this.props.template || null;
        const type = this.props.type;
        if (type === "vertical" && lengthArrayData > 0) {
            return this.getVerticalCarousel(ComponentRender, lengthArrayData, styleVertical);
        }
        else if (type === "horizontal" && lengthArrayData > 0) {
            return this.getHorizontalCarousel(ComponentRender, lengthArrayData, styleHorizontal);
        }
        else {
            return <div>Empty ScrollContainer</div>;
        }
    }
}



