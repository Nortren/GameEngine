import * as React from 'react';

import 'bootstrap/dist/css/bootstrap.css'

export default class ClientAuthorization extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="container-fluid Authorization-container">
                <div className="Authorization-window">

                        <div className="Authorization-window-controls-input">
                            <input type="name" className="Authorization-window-controls-input_login"/>
                            <input type="password" className="Authorization-window-controls-input_password"/>
                        </div>
                        <div className="Authorization-window-controls-button">
                            <button className="Authorization-window-controls-button_login">
                                login
                            </button>
                            <button className="Authorization-window-controls-button_registration">
                                registration
                            </button>
                        </div>

                </div>
            </div>

        )


    }
}

