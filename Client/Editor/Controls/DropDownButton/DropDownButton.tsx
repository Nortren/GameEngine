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
        const fontAwesomeArray = {
            Dropper: 'faEyeDropper',
            PencilAlt: 'faPencilAlt',
            faPaintBrush: 'faPaintBrush',
            PaintBrush: 'faPaintBrush',
            Tint: 'faTint',
            PhotoVideo: 'faPhotoVideo',
            PowerOff: 'faPowerOff',
            HandScissors: 'faHandScissors',
            Bold: 'faBold',
            ExpandAlt: 'faExpandAlt',
            ExpandArrowsAlt: 'faExpandArrowsAlt',
            Expand: 'faExpand',
            Wrench: 'faWrench',
            SlidersH: 'faSlidersH',
            Palette: 'faPalette',
            MousePointer: 'faMousePointer',
            Hammer: 'faHammer',
            FolderOpen: 'faFolderOpen',
            FolderMinus: 'faFolderMinus',
            FolderPlus: 'faFolderPlus',
            File: 'faFile',
            CompressArrowsAlt: 'faCompressArrowsAlt',
            ArrowsAlt: 'faArrowsAlt',
            Edit: 'faEdit',
            Eraser: 'faEraser',
            Tools: 'faTools',
            Paperclip: 'faPaperclip',
            Redo: 'faRedo',
            List: 'faList',
            ObjectUngroup: 'faObjectUngroup',
            Cut: 'faCut',
            Play: 'faPlay',
            Pause: 'faPause',
            Forward: 'faForward',
            Check: 'faCheck',
            Times: 'faTimes',
            Save: 'faSave',
            Sitemap: 'faSitemap',
            EllipsisH: 'faEllipsisH',
            Cog: 'faCog',
            Camera: 'faCamera',
            CameraRetro: 'faCameraRetro'
        };
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





