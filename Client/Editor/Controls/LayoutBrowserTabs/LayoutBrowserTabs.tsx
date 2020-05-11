import * as React from 'react';
import DropDownButton from "../DropDownButton/DropDownButton";
import Button from "../Button/Button";

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
            moveY: 0, countMove: 0,
            moveXBoll: true,
            fps: 0
        };
        this.openTabs = this.openTabs.bind(this);
        this.specialIdentificationClass = 'id_'+ this.props.params.id;
        this.tabClassName = 'tab_container_header-buttonArray-button tablinks ' + this.specialIdentificationClass;
        this.tabAreaClassName = 'tab_container-tabArea tabcontent ' + this.specialIdentificationClass;
    }

    componentDidMount() {
        this._tab = document.querySelectorAll(".tablinks"+'.'+this.specialIdentificationClass);
        this._tabArea = document.querySelectorAll(".tabcontent"+'.'+this.specialIdentificationClass);
        this._tab.forEach((el) => {
            el.addEventListener("click", this.openTabs);
        });
    };

    componentDidUpdate() {

    }

    openTabs(event) {

        const btnTarget = event.currentTarget;
        const country = btnTarget.dataset.country;

        this._tabArea.forEach(function (event) {
            event.classList.remove("active");
        });

        this._tab.forEach(function (event) {
            event.classList.remove("active");
        });

        document.querySelector("#" + country).classList.add("active");

        btnTarget.classList.add("active");
    }


    render() {


        return (
            <div className="tab_container">
                <div className="tab_container_header">
                    <div className="tab_container_header-buttonArray">
                        <button onClick={this.openTabs} id="tab_container-button_id-"
                                className={this.tabClassName + ' active'}
                                data-country={'London' + this.props.params.id}>
                            Tab_1
                        </button>
                        <button onClick={this.openTabs} id="tab_container-button_id-1"
                                className={this.tabClassName}
                                data-country={'Paris' + this.props.params.id}>
                            Tab_1
                        </button>
                    </div>
                    <div className="tab_container_header-setting">
                        <Button key={DropDownButton + 12312} params={{name: '', id: 4, componentArray: []}}/>
                        <DropDownButton key={DropDownButton + 5436} params={{name: '', id: 4, componentArray: []}}/>
                    </div>
                </div>

                <div className={this.tabAreaClassName + ' active'} id={'London' + this.props.params.id}>
                    first_{this.props.params.id}</div>
                <div className={this.tabAreaClassName} id={'Paris' + this.props.params.id}>
                    second_{this.props.params.id}</div>

            </div>
        );
    }
}





