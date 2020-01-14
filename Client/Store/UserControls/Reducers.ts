import {ACTION_CHANGE_X_POSITION,ACTION_CHANGE_Y_POSITION,DIRECTION_CHANGE_X_MOVEMENT,DIRECTION_CHANGE_Y_MOVEMENT,DIRECTION_CHANGE_MOVEMENT,ANIMATION_CHANGE} from './Actions'
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
        case DIRECTION_CHANGE_X_MOVEMENT:
            return {
                ...state
                , directionX: action.payload
            };
        case DIRECTION_CHANGE_Y_MOVEMENT:
            return {
                ...state
                , directionY: action.payload
            };
        case DIRECTION_CHANGE_MOVEMENT:
            return {
                ...state
                , direction: action.payload
            };
        case ANIMATION_CHANGE:
            return {
                ...state
                , animationStatus: action.payload
            };
    }
    return state;
};
