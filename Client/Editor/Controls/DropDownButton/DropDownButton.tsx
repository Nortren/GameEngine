import * as React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as fontAwesome from '@fortawesome/free-solid-svg-icons'
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
                key={Link.name}
                className="dropDown_contentContainer-content">{Link.name}
                <div className="dropDown_arrayListContainer">

                    { ( Link.arrayList ? Link.arrayList.map((listLink,index) => (

                        typeof listLink === 'string' ? (
                            <div key={index} onClick={this.clicklLink.bind(this, Link.name, listLink)}
                                 className="dropDown_contentContainer-content">{listLink}</div>) : this.getDropDownList(listLink)
                    )) : 'Empty')}
                </div>
            </div>
        );
    }


    clickButton() {
        console.log('clickButton');
    }

    clicklLink(mainButtonName, buttonName, event): void {
        const createTab = new CustomEvent(mainButtonName, {
            bubbles: true,
            cancelable: true,
            detail: {parentID: this.props.options.parentElement, buttonName}
        });
        event.target.dispatchEvent(createTab);
    }


    render() {
        enum fontAwesomeArray {
            faEyeDropper = 'Dropper',
            faPencilAlt = 'PencilAlt',
            faPaintBrush = 'PaintBrush',
            faTint = 'Tint',
            faPhotoVideo = 'PhotoVideo',
            faPowerOff = 'PowerOff',
            faHandScissors = 'HandScissors',
            faBold = 'Bold',
            faExpandAlt = 'ExpandAlt',
            faExpandArrowsAlt = 'ExpandArrowsAlt',
            faExpand = 'Expand',
            faWrench = 'Wrench',
            faSlidersH = 'SlidersH',
            faPlay = 'Play',
            faPalette = 'Palette',
            faMousePointer = 'MousePointer',
            faHammer = 'Hammer',
            faFolderOpen = 'FolderOpen',
            faFolderMinus = 'FolderMinus',
            faFolderPlus = 'FolderPlus',
            faFile = 'File',
            faCompressArrowsAlt = 'CompressArrowsAlt',
            faArrowsAlt = 'ArrowsAlt',
            faEdit = 'Edit',
            faEraser = 'Eraser',
            faTools = 'Tools',
            faPaperclip = 'Paperclip',
            faRedo = 'Redo'
        }

        return (
            <div key={this.props.options.key+this.props.options.name} className="dropDownButton_container" style={this.state.style}>
                <button className="dropDownButton_container-button"
                        onClick={this.clickButton}>
                    {this.props.options.iconType ?
                        <FontAwesomeIcon icon={fontAwesome[fontAwesomeArray[this.props.options.iconType]]}
                                         size={this.props.options.iconSize}/> : this.props.options.name}
                    <div className="dropDown_contentContainer">
                        { ( this.props.options.linkList ? this.props.options.linkList.map((Link, index) => (

                            typeof Link === 'string' ? (
                                <div key={Link+index} onClick={this.clicklLink.bind(this, Link)}
                                     className="dropDown_contentContainer-content">{Link}</div>) : this.getDropDownList(Link)
                        )) : 'Empty')}

                    </div>
                </button>

            </div>
        );
    }
}





