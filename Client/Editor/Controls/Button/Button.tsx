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
    faUser,
    faUserFriends,
    faMap,
    faFlag,
    faHandRock,
    faChild,
    faGamepad,
    faGasPump

} from '@fortawesome/free-solid-svg-icons'

import * as fontAwesome from '@fortawesome/free-solid-svg-icons'
import {SizeProp} from "@fortawesome/fontawesome-svg-core";


interface IProps {
    options: IButtonOptions;
}

interface IState {
    style: IButtonOptionsStyle;
}

interface IButtonOptions {
    componentArray: object[];
    iconSize: SizeProp;
    iconType: string;
    id: number;
    name: string;
    style: IButtonOptionsStyle;
    type: string;
}

interface IButtonOptionsStyle {
    height?: string;
    margin?: string;
    width?: string;
    border?: string;
}

export default class Button extends React.Component {

    private ButtonIcon: boolean;
    props: IProps;
    state: IState;
    id: number;

    constructor(props: IProps) {

        super(props);
        this.id = props.options.id;
        this.state = {
            style: {
                width: props.options.style ? props.options.style.width : '',
                height: props.options.style ? props.options.style.height : '',
                margin: props.options.style ? props.options.style.margin : '',
                border: props.options.style ? props.options.style.border : ''
            }
        };
        this.clickButton = this.clickButton.bind(this);
    }

    componentDidMount() {


    };

    startInit() {
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
            CameraRetro: 'faCameraRetro',
            Map: 'faMap',
            Flag: 'faFlag',
            Gamepad: 'faGamepad',
            GasPump: 'faGasPump',
            HandRock: 'faHandRock',
            Child: 'faChild',
            UserFriends: 'faUserFriends'
        };

        if (this.props.options.type === 'EditorButton') {
            return <div className="editorButton_container">
                <button className="editorButton_container-button"
                        onClick={this.clickButton.bind(this, this.props.options.name)} style={this.state.style}>
                    {this.props.options.iconType ?
                        <FontAwesomeIcon icon={fontAwesome[fontAwesomeArray[this.props.options.iconType]]}
                                         size={this.props.options.iconSize}/> : this.props.options.name}
                </button>
            </div>
        } else {
            return <div className="button_container" style={this.state.style}>
                <button className="button_container-button"
                        onClick={this.clickButton.bind(this, this.props.options.name)}>
                    {this.props.options.iconType ? <FontAwesomeIcon
                        icon={fontAwesome[fontAwesomeArray[this.props.options.iconType]]}
                        size={this.props.options.iconSize}/> : this.props.options.name}</button>
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





