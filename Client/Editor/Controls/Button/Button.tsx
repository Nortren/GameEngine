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

    clickButton(data, event) {
        let getData = new CustomEvent(data, {bubbles: true, cancelable: true,detail:{options:this.props.options}});
        event.target.dispatchEvent(getData);
    }

    render() {
        return (
            <div className="button_container">
                <button className="button_container-button" onClick={this.clickButton.bind(this, this.props.options.name)}>{this.props.options.icon || this.props.options.name}</button>
            </div>
        );
    }
}





