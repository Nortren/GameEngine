import {ACTION_CHANGE_X_POSITION,ACTION_CHANGE_Y_POSITION} from './Actions'
const initionState = {
    moveX: 0,
    moveY: 0
};



export const userControlsReducer = (state = initionState, action) => {
    switch (action.type){
        case ACTION_CHANGE_X_POSITION:
            return {
                ...state,
                moveX: action.payload
            };
        case ACTION_CHANGE_Y_POSITION:
            return {
                ...state
                , moveY: action.payload
            };
    }
    return state;
};