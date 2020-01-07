import * as React from 'react'
import * as ReactDOM from "react-dom";
import  {createStore, bindActionCreators} from 'redux';

import '../Client/projectLibrary.css';
// import {rootReducer} from './Store/Reducers';
import {changeFirstName, changeSecondName} from './Store/Actions'
import AuthContainer from './AuthContainer'
import rootReducer from './Store/Reducers'
import {Provider} from 'react-redux';
import EngineInitialization from "./EngineInitialization/EngineInitialization";
import StickController from "./StickController/StickController";


const store = createStore(rootReducer);


export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const dispatch = this.props.dispatch;
        //Диструктор
        const {firstName, secondName, changeFirstName, changeSecondName} = this.props;
        return (
            <Provider store={store}>
                <div className="MainPage">
                    <AuthContainer/>

                </div>
            </Provider>
        )
    }


}

ReactDOM.render(<App/>, document.getElementById("root"));