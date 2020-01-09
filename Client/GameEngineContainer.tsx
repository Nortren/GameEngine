import * as React from 'react';
import {connect} from 'react-redux';

import {changeX, changeY,directionOfMovementX,directionOfMovementY,directionOfMovement} from './Store/UserControls/Actions';
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
                        animations={true}
                        // directionX={this.props.directionX}
                        // directionY={this.props.directionY}
                        direction={this.props.direction}
                    />
                </div>
                <div className="row">
                    <StickController className=".container-fluid"
                                     changeX={this.props.changeX}
                                     changeY={this.props.changeY}
                                     directionOfMovementX={this.props.directionOfMovementX}
                                     directionOfMovementY={this.props.directionOfMovementY}
                                     directionOfMovement={this.props.directionOfMovement}
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
        directionX: state.userControls.directionX,
        directionY: state.userControls.directionY,
        direction: state.userControls.direction,
    };
};
const mapDispatchToProps = {
    changeX,
    changeY,
    directionOfMovementX,
    directionOfMovementY,
    directionOfMovement
};
export default connect(mapStateToProps, mapDispatchToProps)(GameEngineContainer);
