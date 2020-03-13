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
            <div className="container-fluid Authorization-container">
                <div className="Authorization-window">

                    <div className="Authorization-window-controls-input">
                        <input id="authorization_name" type="name"
                               className="Authorization-window-controls-input_login"/>
                        <input id="authorization_password" type="password"
                               className="Authorization-window-controls-input_password"/>
                    </div>
                    <div className="Authorization-window-controls-button">
                        <button id="authorization_button_login" className="Authorization-window-controls-button_login"
                                onClick={this.login}>
                            login
                        </button>
                        <button id="authorization_button_registration"
                                className="Authorization-window-controls-button_registration"
                                onClick={this.registration}>
                            registration
                        </button>
                    </div>

                </div>
            </div>

        )


    }
}

