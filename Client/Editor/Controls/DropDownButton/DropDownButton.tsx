import * as React from 'react';


export default class DropDownButton extends React.Component {


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
        this.clickButton = this.clickButton.bind(this);
    }

    componentDidMount() {
        console.log(this.props);
    };

    componentDidUpdate() {

    }

    clickButton() {
        console.log(this.props.id);
    }

    render() {


        return (
            <div className="dropDownButton_container">
                <button drop className="dropDownButton_container-button"
                        onClick={this.clickButton}>{this.props.params.name}
                    <div></div>
                    <div class="dropDown_contentContainer">
                        <div class="dropDown_contentContainer-content">Settings</div>
                        <div class="dropDown_contentContainer-content">Add Object</div>
                        <div class="dropDown_contentContainer-content">Mesh</div>
                        <div class="dropDown_contentContainer-content">Scene</div>
                        <div class="dropDown_contentContainer-content">Tools</div>
                        <div class="dropDown_contentContainer-content">Windows Manager</div>
                        <div class="dropDown_contentContainer-content">About Program</div>
                    </div>
                </button>

            </div>
        );
    }
}





