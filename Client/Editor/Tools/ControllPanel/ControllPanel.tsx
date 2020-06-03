import * as React from 'react';
import Button from "../../Controls/Button/Button";
import FPSCounter from "./FPSCounter/FPSCounter";
export default class ControllPanel extends React.Component {


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

    };

    componentDidUpdate() {

    }

    clickButton() {

    }

    render() {


        return (
            <div className="controllPanel_container">
                <div className="controllPanel_container-left">
                </div>
                <div className="controllPanel_container-center">
                    <Button options={ {name: '', id: 1, componentArray: []}}/>
                    <Button options={ {name: '', id: 2, componentArray: []}}/>
                    <Button options={ {name: '', id: 3, componentArray: []}}/>

                </div>
                <div className="controllPanel_container-right">
                    <FPSCounter/>
                </div>
            </div>
        );
    }
}





