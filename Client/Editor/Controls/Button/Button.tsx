import * as React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faEyeDropper,
    faPencilAlt,
    faPaintBrush,
    faTint,
    faPhotoVideo,
    faPowerOff,
    faHandScissors,
    faBold,
    faExpandAlt,
    faExpandArrowsAlt,
    faExpand,
    faWrench,
    faSlidersH,
    faPalette,
    faMousePointer,
    faHammer,
    faFolderOpen,
    faFolderMinus,
    faFolderPlus,
    faFile,
    faCompressArrowsAlt,
    faArrowsAlt,
    faEdit,
    faEraser,
    faTools,
faPaperclip,
    faRedo,
    faList,
    faObjectUngroup,
    faCut,
    faPlay,
    faPause,
    faForward,
    faCheck,
    faTimes,
    faFileSignature,
    faSave,
    faSitemap,
    faEllipsisH,
    faCog,
    faCamera,
    faCameraRetro,
} from '@fortawesome/free-solid-svg-icons'

import * as fontAwesome from '@fortawesome/free-solid-svg-icons'

export default class Button extends React.Component {

    private ButtonIcon: boolean;

    constructor(props: object) {

        super(props);
        this.id = props.id;
        this.state = {
            style: {
                margin: props.options.style ? props.options.style.margin : '',
                border: props.options.style ? props.options.style.border : ''
            },
            moveY: 0, countMove: 0,
            moveXBoll: true,
            fps: 0,
        };
        this.clickButton = this.clickButton.bind(this);
    }

    componentDidMount() {


    };

    startInit() {
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
            faRedo = 'Redo',
            faList = 'List',
            faObjectUngroup = 'ObjectUngroup',
            faCut = 'Cut',
            faPlay = 'Play',
            faPause = 'Pause',
            faForward = 'Forward',
            faCheck = "Check",
            faTimes = "Times",
            faSave = "Save",
            faSitemap = "Sitemap",
            faEllipsisH = "EllipsisH",
            faCog = "Cog",
            faCamera = 'Camera',
            faCameraRetro = 'CameraRetro',
        }
        if (this.props.options.type === 'EditorButton') {
            return <div className="editorButton_container">
                <button className="editorButton_container-button"
                        onClick={this.clickButton.bind(this, this.props.options.name)} style={this.state.style}>
                    <FontAwesomeIcon icon={fontAwesome[fontAwesomeArray[this.props.options.iconType]]}
                                     size={this.props.options.iconSize}/>
                </button>
            </div>
        }
        else {
            return <div className="button_container" style={this.state.style}>
                <button className="button_container-button"
                        onClick={this.clickButton.bind(this, this.props.options.name)}><FontAwesomeIcon
                    icon={fontAwesome[fontAwesomeArray[this.props.options.iconType]]}
                    size={this.props.options.iconSize}/></button>
            </div>
        }
    }


    componentDidUpdate() {

    }

    clickButton(data, event) {
        let getData = new CustomEvent(data, {bubbles: true, cancelable: true, detail: {options: this.props.options}});
        event.target.dispatchEvent(getData);
    }

    render() {
        return this.startInit();
    }
}





