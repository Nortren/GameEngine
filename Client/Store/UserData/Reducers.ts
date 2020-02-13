import {
    ACTION_CHANGE_USER_STATUS
} from './Actions'
const initionState = {
    authorizationStatus: false
};


export const userStatusReducer = (state = initionState, action) => {
    switch (action.type) {
        case ACTION_CHANGE_USER_STATUS:
            return {
                ...state,
                authorizationStatus: action.payload
            };
    }
    return state;
};
