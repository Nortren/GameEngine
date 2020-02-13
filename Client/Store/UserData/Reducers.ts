import {
    ACTION_CHANGE_USER_STATUS
} from './Actions'
const initionState = {
    moveX: 0,
    moveZ: 0
};


export const userStatusReducer = (state = initionState, action) => {
    switch (action.type) {
        case ACTION_CHANGE_USER_STATUS:
            return {
                ...state,
                moveX: action.payload
            };
    }
    return state;
};
