import * as React from 'react';
import DropDownButton from "../DropDownButton/DropDownButton";
import Button from "../Button/Button";
import Hierarch from "../../Tools/Hierarch/Hierarch";

export default class LayoutBrowserTabs extends React.Component {
    private _tab: NodeListOf<Element>;
    private _tabArea: [];

    constructor(props: object) {
        super(props);
        this.id = props.id;
        this.state = {
            style: props.options.style,
            button: [{id: 1}]

        };
        this.openTabs = this.openTabs.bind(this);
        this.specialIdentificationClass = 'tab_' + this.props.options.id;
        this.specialIdentificationClassArea = 'area_' + this.props.options.id;
        this.tabClassName = 'tab_container_header-buttonArray-button';
        this.tabAreaClassName = 'tab_container-tabArea tabcontent';
    }

    componentDidMount() {
        this.updateTabStatus();
        this._tab.forEach((el) => {
            el.addEventListener("click", this.openTabs);
        });


        document.addEventListener("Add Tab", (event) => {
            if (event.detail.parentID === this.props.options.id) {
                this.createNewTab(event);
            }
        });
        this.openTabs();
    };

    /**
     * Метод который рендерит новых табы
     * @returns {any}
     */
    addTab() {

        return (
            this.state.button.map(element => (


                <button onClick={this.openTabs}
                        className={this.tabClassName}
                        data-id={element.id}
                        data-idtab={this.specialIdentificationClassArea + '_' + element.id}
                        data-idContainerTab={this.specialIdentificationClassArea}>

                    Tab_{element.id}
                </button>


            ))
        );
    }

    /**
     * Метод который рендерит новых табы
     * @returns {any}
     */
    addTabArea() {

        return (
            this.state.button.map(element => (


                <div className={this.tabAreaClassName} id={this.props.options.id}
                     data-idtab={this.specialIdentificationClass + '_' + element.id}
                     data-idcontainerarea={this.specialIdentificationClassArea}>



                    <Hierarch/>
                </div>


            ))
        );
    }

    /**
     * Метод созданиянового таба
     * @param event
     */
    createNewTab(event) {
        this.state.button.push({id: this.state.button.length + 1, name: event.type});
        this.setState({button: this.state.button});
    }

    /**
     * Собираем данные по tab и tabArea на вкладке
     */
    updateTabStatus() {
        this._tab = document.querySelectorAll('[data-idContainerTab='+this.specialIdentificationClassArea+']');
        this._tabArea = document.querySelectorAll('[data-idcontainerarea='+this.specialIdentificationClassArea+']');
    }

    componentDidUpdate() {
        this.updateTabStatus();
    }

    /**
     * Метод открытия таба (при первичной инициализации выставляем первой вкладке класс active ,чтобы она сразу была активна)
     * @param event
     */
    openTabs(event) {
        let id = 1;
        if(event) {
            const btnTarget = event.currentTarget;
            id = btnTarget.dataset.id;
            btnTarget.classList.add("active");
        }

        this._tabArea.forEach(function (event) {
            event.classList.remove("active");
        });

        this._tab.forEach(function (event) {
            event.classList.remove("active");
        });

        document.querySelector('[data-idtab='+this.specialIdentificationClass+ '_' + id+']').classList.add("active");
        document.querySelector('[data-idtab='+this.specialIdentificationClassArea+ '_' + id+']').classList.add("active");

    }


    render() {


        return (
            <div className="tab_container" style={this.state.style}>
                <div className="tab_container_header">
                    <div className="tab_container_header-buttonArray">
                        {this.addTab()}
                    </div>
                    <div className="tab_container_header-setting">
                        <Button options={{name: '', id: 4, componentArray: []}}/>
                        <DropDownButton options={{
                            name: '',
                            parentElement: this.props.options.id,
                            id: 4,
                            componentArray: [],
                            linkList: ['Collapse All', 'Lock', 'Maximize', 'Close Tab', 'Add Tab', 'UI element Debugger']
                        }}/>
                    </div>
                </div>
                {this.addTabArea()}


            </div>
        );
    }
}





