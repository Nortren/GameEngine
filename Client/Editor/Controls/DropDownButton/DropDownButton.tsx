import * as React from 'react';


export default class DropDownButton extends React.Component {


    constructor(props: object) {
        super(props);
        this.id = props.id;
        this.state = {
            style: {
                height: props.height || '100%',
                width: props.options.width,
                margin: props.options.margin || 0,
                justifySelf: props.justifySelf,
            },
            moveY: 0, countMove: 0,
            moveXBoll: true,
            fps: 0
        };
        this.clickButton = this.clickButton.bind(this);
        this.clicklLink = this.clicklLink.bind(this);
    }

    componentDidMount() {

    };

    componentDidUpdate() {

    }

    /**
     * Метод который рендерит переданные в наш компонент сторонние компоненты
     * @returns {any}
     */
    getDropDownList(Link) {

        return (
            <div
                 class="dropDown_contentContainer-content">{Link.name}
                <div class="dropDown_arrayListContainer">

                { ( Link.arrayList ? Link.arrayList .map(listLink => (

                    typeof listLink === 'string' ? (
                        <div onClick={this.clicklLink.bind(this, Link.name,listLink)}
                             class="dropDown_contentContainer-content">{listLink}</div>) : this.getDropDownList(listLink)
                )) : 'Empty')}
                 </div>
            </div>
        );
    }


    clickButton() {
        console.log('clickButton');
    }

    clicklLink(mainButtonName,buttonName, event):void {
        const createTab = new CustomEvent(mainButtonName, {
            bubbles: true,
            cancelable: true,
            detail: {parentID: this.props.options.parentElement,buttonName}
        });
        event.target.dispatchEvent(createTab);
    }


    render() {


        return (
            <div className="dropDownButton_container" style={this.state.style}>
                <button drop className="dropDownButton_container-button"
                        onClick={this.clickButton}>
                    {this.props.options.name}
                    <div class="dropDown_contentContainer">
                        { ( this.props.options.linkList ? this.props.options.linkList.map(Link => (

                            typeof Link === 'string' ? (
                                <div onClick={this.clicklLink.bind(this, Link)}
                                     class="dropDown_contentContainer-content">{Link}</div>) : this.getDropDownList(Link)
                        )) : 'Empty')}

                    </div>
                </button>

            </div>
        );
    }
}





