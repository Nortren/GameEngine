import * as React from 'react';
import DropDownButton from "../DropDownButton/DropDownButton";
import Button from "../Button/Button";
import Hierarch from "../../Tools/Hierarch/Hierarch";

export default class LayoutBrowserTabs extends React.Component {
    private _tab: NodeListOf<Element>;
    private _tabArea: NodeListOf<Element>;

    constructor(props: object) {
        super(props);
        this.id = props.id;
        this.state = {
            style: {
                height: props.height || '100%',
                width: props.width,
                justifySelf: props.justifySelf,
            },
            button: [{id:1}]

        };
        this.openTabs = this.openTabs.bind(this);
        this.specialIdentificationClass = 'tab_' + this.props.params.id;
        this.specialIdentificationClassArea = 'area_' + this.props.params.id;
        this.tabClassName = 'tab_container_header-buttonArray-button  ' + this.specialIdentificationClass;
        this.tabAreaClassName = 'tab_container-tabArea tabcontent ';
    }

    componentDidMount() {
        this.updateTabStatus();
        this._tab.forEach((el) => {
            el.addEventListener("click", this.openTabs);
        });


        document.addEventListener("Add Tab", (event) => {
            if(event.detail.parentID === this.props.params.id) {
                this.createNewTab(event);
            }
        });
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
                        data-id={element.id}>
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


                <div className={this.tabAreaClassName + this.specialIdentificationClassArea+' ' +this.specialIdentificationClassArea+'_'+element.id} id={this.props.params.id}>
                    first_{this.props.params.id}_{element.id}
                    <Hierarch/>
                </div>


            ))
        );
    }

    createNewTab(event) {
        this.state.button.push({id:this.state.button.length+1,name:event.type});
        this.setState({button: this.state.button});
    }

    updateTabStatus(){
        this._tab = document.querySelectorAll(".tablinks" + '.' + this.specialIdentificationClass);
        this._tabArea = document.querySelectorAll(".tabcontent" + '.' + this.specialIdentificationClassArea);
    }

    componentDidUpdate() {
      this.updateTabStatus();
    }

    openTabs(event) {

        const btnTarget = event.currentTarget;
        const id = btnTarget.dataset.id;

        this._tabArea.forEach(function (event) {
            event.classList.remove("active");
        });

        this._tab.forEach(function (event) {
            event.classList.remove("active");
        });

        document.querySelector(".area_"+ this.props.params.id +'_' + id).classList.add("active");

        btnTarget.classList.add("active");
    }


    render() {


        return (
            <div className="tab_container">
                <div className="tab_container_header">
                    <div className="tab_container_header-buttonArray">
                        {this.addTab()}
                    </div>
                    <div className="tab_container_header-setting">
                        <Button  params={{name: '', id: 4, componentArray: []}}/>
                        <DropDownButton  params={{
                            name: '',
                            parentElement:this.props.params.id,
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





