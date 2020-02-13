import * as React from 'react'
import * as ReactDOM from "react-dom";
import  {createStore} from 'redux';

import '../Client/projectLibrary.css';
import GameEngineContainer from './GameEngineContainer'
import rootReducer from './Store/Reducers'
import {Provider} from 'react-redux';
import  Authorization from "./ClientAuthorization/ClientAuthorization"
import {changeUserStatus} from './Store/UserData/Actions';
import StickController from "./StickController/StickController";

const store = createStore(rootReducer);


export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <Authorization       changeX={this.props.changeX}/>
                    {/*<GameEngineContainer className="container-fluid"/>*/}
            </Provider>
        )
    }


}

ReactDOM.render(<App/>, document.getElementById("root"));
