import {combineReducers} from "redux";
import {userControlsReducer} from "./UserControls/Reducers";
import {physicsReducer} from "./Physics/Reducers";
import {userStatusReducer} from "./UserData/Reducers";
import {fpsCounter} from "./EditorStore/FPSCounter/Reducers";
import {viewer} from "./EditorStore/Viewer/Reducers";
import {gameWorldState} from "./StoreStateGameWorld/Reducers";
import {imageEditorStore} from "./EditorStore/ImageEditor/Reducers";

//Собираем reducers
export default combineReducers({
    userControls: userControlsReducer,
    physics: physicsReducer,
    userData: userStatusReducer,
    fpsCounter: fpsCounter,
    viewer: viewer,
    gameWorldState: gameWorldState,
    imageEditorStore: imageEditorStore,
});
