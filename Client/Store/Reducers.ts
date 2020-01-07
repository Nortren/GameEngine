import {combineReducers} from "redux";
import {rootReducer} from "./first/Reducers";


//Собираем reducers
export default combineReducers({
    first:rootReducer
});