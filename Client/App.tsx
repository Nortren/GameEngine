import * as React from 'react'
import * as ReactDOM from "react-dom";
import  {createStore,bindActionCreators} from 'redux';
import {connect, Provider} from 'react-redux';
import '../Client/projectLibrary.css';
import {rootReducer} from './Store/Reducers';
import {changeFirstName,changeSecondName} from './Store/Actions'
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
        const {firstName, secondName,changeFirstName,changeSecondName} = this.props;
        return (
            <div className="MainPage">
                <div>
                    <input type="text"
                            value={this.props.firstName}
                            placeholder="First Name"
                           onChange={(event)=>{
                        changeFirstName(event.target.value)
                    }}
                    />
                </div>

                <div>
                    <input type="text"
                           value={this.props.secondName}
                           placeholder="Second Name"
                           onChange={(event)=>{
                               changeSecondName(event.target.value)
                           }}
                    />

                </div>

                <div>{`${this.props.firstName} ${this.props.secondName}`}</div>
                {/*<EngineInitialization/>*/}
                {/*<StickController/>*/}
            </div>
        )
    }


}
const mapStateToProps = (state) => {
    console.log(state);
    return {
        firstName: state.firstName,
        secondName: state.secondName
    }
};

const mapDispatchToProps = (dispatch) => {
  return {
      changeFirstName: bindActionCreators(changeFirstName,dispatch),
      changeSecondName: bindActionCreators(changeSecondName,dispatch)
  }
};
const WrapperApp = connect(mapStateToProps,mapDispatchToProps)(App);
ReactDOM.render(<Provider store={store}>
    <WrapperApp />
</Provider>, document.getElementById("root"));