import * as React from 'react';
import {connect} from 'react-redux';


class FPSCounter extends React.Component {


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
            <div className="FPSCounter_container">
                <div className="FPSCounter_container-count">
                    60
                </div>
                <div className="FPSCounter_container-graphs">
                </div>

            </div>
        );
    }
}
const storeTest =(state)=>{
    // console.log(state.fpsCounter,'STORE');
};
export default connect(storeTest)(FPSCounter);



