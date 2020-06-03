import {combineReducers} from "redux";
import {userControlsReducer} from "./UserControls/Reducers";
import {physicsReducer} from "./Physics/Reducers";
import {userStatusReducer} from "./UserData/Reducers";
import {fpsCounter} from "./EditorStore/FPSCounter/Reducers";

//Собираем reducers
export default combineReducers({
    userControls:userControlsReducer,
    physics:physicsReducer,
    userData:userStatusReducer,
    fpsCounter:fpsCounter,
});
