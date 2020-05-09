import * as React from 'react';


export default class Button extends React.Component {


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
            <div className="button_container">
                <button className="button_container-button" onClick={this.clickButton}>{this.props.params.name}</button>
            </div>
        );
    }
}





