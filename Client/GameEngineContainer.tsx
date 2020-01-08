import * as React from 'react';
import Auth from './Auth';
import {connect} from 'react-redux';
import {changeFirstName, changeSecondName} from './Store/first/Actions';
import {changeX, changeY} from './Store/UserControls/Actions';
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
                {/*<Auth firstName={this.props.firstName} secondName={this.props.secondName} changeFirstName={this.props.changeFirstName} changeSecondName={this.props.changeSecondName}/>*/}
                <div className="row">
                    <EngineInitialization moveX={this.props.moveX}
                                          moveY={this.props.moveY}/>
                </div>
                {/*<div className="row">*/}
                    {/*<StickController className=".container-fluid" changeX={this.props.changeX}*/}
                                     {/*changeY={this.props.changeY}/>*/}
                {/*</div>*/}
            </div>

        )


    }
}

const mapStateToProps = state => {
    return {
        firstName: state.first.firstName,
        secondName: state.first.secondName,
        moveX: state.userControls.moveX,
        moveY: state.userControls.moveY,
    };
};
const mapDispatchToProps = {
    changeFirstName,
    changeSecondName,
    changeX,
    changeY
};
export default connect(mapStateToProps, mapDispatchToProps)(GameEngineContainer);