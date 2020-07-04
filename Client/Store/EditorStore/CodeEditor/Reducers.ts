import {ACTION_CHANGE_CODE_EDITOR} from './Actions'
import {ACTION_CHANGE_CODE_EDITOR_STATUS} from './Actions'
const initionState = {
    codeEditorData: [],
    codeEditorStatus: false
};


export const codeEditorStore = (state = initionState, action) => {
    switch (action.type){
        case ACTION_CHANGE_CODE_EDITOR:
            return {
                ...state,
                codeEditorData: action.payload
            };
        case ACTION_CHANGE_CODE_EDITOR_STATUS:
            return {
                ...state,
                codeEditorStatus: action.payload
            };
    }
    return state;
};
