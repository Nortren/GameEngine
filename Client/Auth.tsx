import * as React from 'react'
import {connect} from 'react-redux';

export default class Auth extends React.Component {
    constructor(props) {
        super(props);

        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onSecondNameChange = this.onSecondNameChange.bind(this);
    }

    onFirstNameChange(event) {
        this.props.changeFirstName(event.target.value)
    }
    onSecondNameChange(event) {
        this.props.changeSecondName(event.target.value)
    }
    render() {
        const dispatch = this.props.dispatch;
        //Диструктор
        const {firstName, secondName, changeFirstName, changeSecondName} = this.props;
        return (
            <div className="MainPage">
                <div>
                    <input type="text"
                           value={this.props.firstName}
                           placeholder="First Name"
                           onChange={this.onFirstNameChange}
                    />
                </div>

                <div>
                    <input type="text"
                           value={this.props.secondName}
                           placeholder="Second Name"
                           onChange={this.onSecondNameChange}
                    />

                </div>

                <div>{`${this.props.firstName} ${this.props.secondName}`}</div>
                {/*<EngineInitialization/>*/}
                {/*<StickController/>*/}
            </div>
        )
    }


}
