import * as React from 'react'
import * as ReactDOM from "react-dom";
import  {createStore} from 'redux';

import '../Client/projectLibrary.css';
import GameEngineContainer from './GameEngineContainer'
import rootReducer from './Store/Reducers'
import {Provider} from 'react-redux';


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
                    <GameEngineContainer/>
            </Provider>
        )
    }


}

ReactDOM.render(<App/>, document.getElementById("root"));