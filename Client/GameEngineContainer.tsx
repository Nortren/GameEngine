import * as React from 'react';
import {connect} from 'react-redux';

import {changeUserStatus} from './Store/UserData/Actions';
import EngineInitialization from "./EngineInitialization/EngineInitialization";
import StickController from "./StickController/StickController";
import Editor from "./Editor/Editor";
import 'bootstrap/dist/css/bootstrap.css'
import Authorization from "./ClientAuthorization/ClientAuthorization";

import GUI from "./GUI/GUI";
import {globalVariables} from "./GlobalVariables";

interface IProps {
    changeUserStatus(params:object): void;
    className: string
    userStatusAuthorization: IUserStatusAuthorization;
}
interface IState {
    editorData: object;
}
interface IUserStatusAuthorization {
    adminRoot: boolean;
    id: number;
    lastRoomType: string;
    login: string;
    name: string;
    status: boolean;
}

class GameEngineContainer extends React.Component {
    props:IProps;
    state:IState;
    constructor(props:IProps) {
        super(props);
        this.state = {
            editorData: null
        };
    }

    private thisMobileDevice: boolean;
    private _idLoggedUser: object;

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

    /**
     * В этом окне есть уже залогинившийся юзер
     * @returns {boolean}
     */
    checkUserLogged(userData) {
        if (!this._idLoggedUser) {
            this._idLoggedUser = userData;
        }
    }

    startInit() {
        if (this.props.userStatusAuthorization || globalVariables.disableAuthorization) {
            this.checkUserLogged(this.props.userStatusAuthorization);
            return <div>
                {(this.props.userStatusAuthorization.adminRoot && this._idLoggedUser.id === this.props.userStatusAuthorization.id) || globalVariables.enableEditor ? <Editor/> : ''}
                <GUI userName={this.props.userStatusAuthorization.name} deviceType={this.thisMobileDevice}/>
                <EngineInitialization
                    showElement={this.props.userStatusAuthorization}
                    editorData={this.state.editorData}
                />
                <StickController
                    showMobileController={this.thisMobileDevice}
                                 showElement={this.props.userStatusAuthorization}
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
        userStatusAuthorization: state.userData.authorizationStatus
    };
};
const mapDispatchToProps = {
    changeUserStatus
};
export default connect(mapStateToProps, mapDispatchToProps)(GameEngineContainer);
