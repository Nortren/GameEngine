import * as React from 'react';
import {connect} from 'react-redux';

import {changeX, changeY,directionOfMovementX,directionOfMovementY,directionOfMovement,animationStatusChange} from './Store/UserControls/Actions';
import EngineInitialization from "./EngineInitialization/EngineInitialization";
import StickController from "./StickController/StickController";
import 'bootstrap/dist/css/bootstrap.css'
class GameEngineContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="container-fluid MainPage">
                <div className="row">
                    <EngineInitialization
                        moveX={this.props.moveX}
                        moveY={this.props.moveY}
                        animations={this.props.animationStatus}
                        direction={this.props.direction}
                    />
                </div>
                <div className="row">
                    <StickController className=".container-fluid"
                                     changeX={this.props.changeX}
                                     changeY={this.props.changeY}
                                     directionOfMovement={this.props.directionOfMovement}
                                     animationStatusChange={this.props.animationStatusChange}
                    />
                </div>
            </div>

        )


    }
}

const mapStateToProps = state => {
    return {
        moveX: state.userControls.moveX,
        moveY: state.userControls.moveY,
        direction: state.userControls.direction,
        animationStatus: state.userControls.animationStatus,
    };
};
const mapDispatchToProps = {
    changeX,
    changeY,
    directionOfMovement,
    animationStatusChange
};
export default connect(mapStateToProps, mapDispatchToProps)(GameEngineContainer);
