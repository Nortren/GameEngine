import * as React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import {
//     faEyeDropper,
//     faPencilAlt,
//     faPaintBrush,
//     faTint,
//     faPhotoVideo,
//     faPowerOff,
//     faHandScissors,
//     faBold
// } from '@fortawesome/free-solid-svg-icons'

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
            faEyeDropper = 'dropper',
            faPencilAlt = 'pencil',
            faPaintBrush = 'brush',
            faTint = 'tint',
            faPhotoVideo = 'photo',
            faPowerOff = 'off',
            faHandScissors = 'scissors',
            faBold = 'bold',
            faEdit = 'edit'
        }
        if (this.props.options.type === 'EditorButton') {
            return <div className="editorButton_container" >
                <button className="editorButton_container-button"
                        onClick={this.clickButton.bind(this, this.props.options.name)} style={this.state.style}>
                    <FontAwesomeIcon icon={fontAwesome[fontAwesomeArray[this.props.options.iconType]]} size='2x'/>
                </button>
            </div>
        }
        else {
            return <div className="button_container" style={this.state.style}>
                <button className="button_container-button"
                        onClick={this.clickButton.bind(this, this.props.options.name)}>{this.props.options.icon || this.props.options.name}</button>
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





