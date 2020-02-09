import {
    ACTION_CHANGE_X_POSITION,
    ACTION_CHANGE_Z_POSITION,
    DIRECTION_CHANGE_X_MOVEMENT,
    DIRECTION_CHANGE_Z_MOVEMENT,
    DIRECTION_CHANGE_MOVEMENT,
    ANIMATION_CHANGE,
    CLICKED_BUTTON_SKILL
} from './Actions'
const initionState = {
    moveX: 0,
    moveZ: 0
};


export const userControlsReducer = (state = initionState, action) => {
    switch (action.type) {
        case ACTION_CHANGE_X_POSITION:
            return {
                ...state,
                moveX: action.payload
            };
        case ACTION_CHANGE_Z_POSITION:
            return {
                ...state
                , moveZ: action.payload
            };
        case DIRECTION_CHANGE_X_MOVEMENT:
            return {
                ...state
                , directionX: action.payload
            };
        case DIRECTION_CHANGE_Z_MOVEMENT:
            return {
                ...state
                , directionZ: action.payload
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
        case CLICKED_BUTTON_SKILL:
            return {
                ...state
                , skillButton: action.payload
            };
    }
    return state;
};
