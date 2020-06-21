import {ACTION_CHANGE_IMAGE_EDITOR} from './Actions'
import {ACTION_CHANGE_IMAGE_EDITOR_STATUS} from './Actions'
const initionState = {
    imageEditorData: [],
    imageEditorStatus: false
};


export const imageEditorStore = (state = initionState, action) => {
    switch (action.type){
        case ACTION_CHANGE_IMAGE_EDITOR:
            return {
                ...state,
                imageEditorData: action.payload
            };
        case ACTION_CHANGE_IMAGE_EDITOR_STATUS:
            return {
                ...state,
                imageEditorStatus: action.payload
            };
    }
    return state;
};
