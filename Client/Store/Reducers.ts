import {combineReducers} from "redux";
import {rootReducer} from "./first/Reducers";
import {userControlsReducer} from "./UserControls/Reducers";

//Собираем reducers
export default combineReducers({
    first:rootReducer,
    userControls:userControlsReducer
});