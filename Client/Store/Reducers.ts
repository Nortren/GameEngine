import {combineReducers} from "redux";
import {userControlsReducer} from "./UserControls/Reducers";
import {userStatusReducer} from "./UserData/Reducers";
import {fpsCounter} from "./EditorStore/FPSCounter/Reducers";
import {viewer} from "./EditorStore/Viewer/Reducers";
import {gameWorldState} from "./StoreStateGameWorld/Reducers";
import {imageEditorStore} from "./EditorStore/ImageEditor/Reducers";
import {codeEditorStore} from "./EditorStore/CodeEditor/Reducers";
import {colorPaletteStore} from "./EditorStore/ColorPalette/Reducers";
//Собираем reducers
export default combineReducers({
    userControls: userControlsReducer,
    userData: userStatusReducer,
    fpsCounter: fpsCounter,
    viewer: viewer,
    gameWorldState: gameWorldState,
    imageEditorStore: imageEditorStore,
    codeEditorStore: codeEditorStore,
    colorPaletteStore: colorPaletteStore,
});
