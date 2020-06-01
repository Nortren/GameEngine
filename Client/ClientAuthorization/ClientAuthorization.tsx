import * as React from 'react';
import BL from "../BusinessLogic";
import 'bootstrap/dist/css/bootstrap.css'

export default class ClientAuthorization extends React.Component {
    businessLogic = new BL();

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.registration = this.registration.bind(this);
        this.changeUserStatus = this.changeUserStatus.bind(this);
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


    render() {

        return (
            <div className="Authorization_page">
                {/*<div className="Authorization_page-projectName">Game engine</div>*/}
            <div className="Authorization_page-container">
                <div className="Authorization_page-window">

                    <div className="Authorization_page-window-controls-input">
                        <input id="authorization_name" type="email"
                               className="Authorization_page-window-controls-input_login"/>
                        <input id="authorization_password" type="password"
                               className="Authorization_page-window-controls-input_password"/>
                    </div>
                    <div className="Authorization_page-window-controls-button">
                        <button id="authorization_button_login" className="Authorization_page-window-controls-button_login"
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

