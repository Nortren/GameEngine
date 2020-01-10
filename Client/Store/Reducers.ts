import {combineReducers} from "redux";
import {userControlsReducer} from "./UserControls/Reducers";

//Собираем reducers
export default combineReducers({
    userControls:userControlsReducer
});
