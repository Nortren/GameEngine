import * as React from 'react';
import {connect} from 'react-redux';
import BL from "./BusinessLogic";

import {
    changeX,
    changeZ,
    directionOfMovement,
    animationStatusChange,
    clickedSkillButton
} from './Store/UserControls/Actions';
import {changePhysics} from './Store/Physics/Actions';
import {changeUserStatus} from './Store/UserData/Actions';
import EngineInitialization from "./EngineInitialization/EngineInitialization";
import StickController from "./StickController/StickController";
import Editor from "./Editor/Editor";
import 'bootstrap/dist/css/bootstrap.css'
import Authorization from "./ClientAuthorization/ClientAuthorization";
import {globalVariables} from "./GlobalVariables";

class GameEngineContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           editorData: null
        };
    }

    componentDidMount() {
        document.addEventListener("EditorEventBus", (event) => {
            this.eventBusEditor(event)
        });


    }

    eventBusEditor(event){
        this.setState({editorData:event.detail});

    }

    startInit() {
        const blData = new BL();
        if (this.props.userStatusAuthorization || globalVariables.disableAuthorization) {

            return <div>
                {globalVariables.enableEditor ?   <Editor/> : '' }

                <EngineInitialization
                    showElement={this.props.userStatusAuthorization}
                    moveX={this.props.moveX}
                    moveZ={this.props.moveZ}
                    animations={this.props.animationStatus}
                    direction={this.props.direction}
                    changePhysics={this.props.changePhysics}
                    skillButton={this.props.skillButton}
                    editorData={this.state.editorData}
                />
                <StickController className=".container-fluid"
                                 showElement={this.props.userStatusAuthorization}
                                 physicalCollision={this.props.physicalCollision}
                                 changePhysics={this.props.changePhysics}
                                 changeX={this.props.changeX}
                                 changeZ={this.props.changeZ}
                                 directionOfMovement={this.props.directionOfMovement}
                                 animationStatusChange={this.props.animationStatusChange}
                                 clickedSkillButton={this.props.clickedSkillButton}
                />
            </div>;
        }
        return <Authorization changeUserStatus={this.props.changeUserStatus}/>;
    }

    render() {
        this.startInit();
        return (
            <div className="MainPage">
                {this.startInit()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        moveX: state.userControls.moveX,
        moveZ: state.userControls.moveZ,
        direction: state.userControls.direction,
        animationStatus: state.userControls.animationStatus,
        skillButton: state.userControls.skillButton,
        physicalCollision: state.physics.physicalCollision,
        userStatusAuthorization: state.userData.authorizationStatus
    };
};
const mapDispatchToProps = {
    changeX,
    changeZ,
    directionOfMovement,
    animationStatusChange,
    changePhysics,
    clickedSkillButton,
    changeUserStatus
};
export default connect(mapStateToProps, mapDispatchToProps)(GameEngineContainer);
