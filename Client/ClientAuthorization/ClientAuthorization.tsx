import * as React from 'react';
import BL from "../BusinessLogic";
import 'bootstrap/dist/css/bootstrap.css'
import DialogPopup from "../Editor/Controls/DialogPopup/DialogPopup";
export default class ClientAuthorization extends React.Component {
    businessLogic = new BL();

    constructor(props) {
        super(props);
        this.thisMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.login = this.login.bind(this);
        this.registration = this.registration.bind(this);
        this.changeUserStatus = this.changeUserStatus.bind(this);
    }

    componentDidMount() {
        document.addEventListener('ok', this.fullScreenModeOn.bind(this), false);
        document.addEventListener('cancel', this.fullScreenModeOff.bind(this), false);
    }

    changeUserStatus(params) {
        this.props.changeUserStatus(params);
    }

    login() {

        let login = document.getElementById('authorization_name');
        let password = document.getElementById('authorization_password');
        let userData = {login: login.value, password: password.value};

        this.businessLogic.checkUserAuthorization(userData, (data) => {
            this.changeUserStatus(data);
        });

    }

    registration() {
        let login = document.getElementById('authorization_name');
        let password = document.getElementById('authorization_password');
        let userData = {login: login.value, password: password.value};

        this.businessLogic.checkUserAuthorization(userData, (data) => {
            // console.log(data);
        });
    }

    /**
     * Метод автоматически переводящий игру в полноэкранный режим
     */
    fullScreenModeOn() {
        document.documentElement.requestFullscreen();
    }

    /**
     * Метод автоматически переводящий игру в полноэкранный режим
     */
    fullScreenModeOff() {

        if (document.fullscreen) {
            document.exitFullscreen();
        }
    }

    render() {
        const textMessage = 'Пожалуйста включите полноэкранный режим и переверните экран в горизонтальное положение для комфортной игры';
        return (
            <div className="Authorization_page">
                <DialogPopup textMessage={textMessage} mobile={this.thisMobileDevice} />
                <div className="Authorization_page-container">
                    <div className="Authorization_page-window">

                        <div className="Authorization_page-window-controls-input">
                            <input id="authorization_name" type="email"
                                   className="Authorization_page-window-controls-input_login"/>
                            <input id="authorization_password" type="password"
                                   className="Authorization_page-window-controls-input_password"/>
                        </div>
                        <div className="Authorization_page-window-controls-button">
                            <button id="authorization_button_login"
                                    className="Authorization_page-window-controls-button_login"
                                    onClick={this.login}>
                                login
                            </button>
                            <button id="authorization_button_registration"
                                    className="Authorization_page-window-controls-button_registration"
                                    onClick={this.registration}>
                                registration
                            </button>
                        </div>

                    </div>

                </div>
                <div className="Authorization_page_additionalInformation">
                    <div className="Authorization_page_additionalInformation-version">v.0.0.1</div>
                    <div className="Authorization_page_additionalInformation-developerName">by Nortren</div>
                </div>
            </div>
        )


    }
}

