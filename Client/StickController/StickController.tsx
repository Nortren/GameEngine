import * as React from 'react';


/**
 * Компонент построения графиков в режими реального времени
 */
export default class StickController extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            moveX: 0,
            moveY: 0, countMove: 0,
            moveXBoll: true
        };
    }

    componentDidMount() {

    }



    render() {
        return (
            <div className="Sticks">
                <div className="leftStick">
                    L
                </div>
                <div className="rightStick">
                    R
                </div>
            </div>
        );
    }
}





