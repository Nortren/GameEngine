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
import GUI from "./GUI/GUI";
import {globalVariables} from "./GlobalVariables";

class GameEngineContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorData: null
        };
    }

    componentDidMount() {
        this.thisMobileDevice = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

        let cameraControlStatus = false;
        let movingObjectStatus = false;
        document.addEventListener("EditorEventBus", (event) => {
            this.eventBusEditor("EditorEventBus", event);

        });
        document.addEventListener("Create 3d Object", (event) => {
            this.eventBusEditor("CreateObject", event);
        });
        document.addEventListener("movingObject", (event) => {
            console.log(event, "movingObject");


            const changeMovingObjectStatus = () => {
                return movingObjectStatus = !movingObjectStatus;
            };

            const data = {movingObjectStatus: changeMovingObjectStatus()};

            this.eventBusEditor("movingObject", event, data);
        });
        document.addEventListener("changeEditorData", (event) => {
            this.eventBusEditor("", {});
        });
        document.addEventListener("CameraControl", (event) => {


            const changeCameraStatus = () => {
                return cameraControlStatus = !cameraControlStatus;
            };

            const data = {cameraControlStatus: changeCameraStatus()};

            this.eventBusEditor("CameraControl", event, data);
        });
        //Обнуляем state для предотвращения повторноговыполнения события(т.к они будут постоянно храниться в стейте и проверка будет положительна)


    }

    eventBusEditor(eventName, event, data?) {
        this.setState({editorData: {name: eventName, data: data || event.detail, syntheticEvent: event}});
    }

    startInit() {
        if (this.props.userStatusAuthorization || globalVariables.disableAuthorization) {
            return <div>
                {this.props.userStatusAuthorization.adminRoot ? <Editor/> : '' }
                <GUI deviceType={this.thisMobileDevice}/>
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
                                 showMobileController={this.thisMobileDevice}
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
