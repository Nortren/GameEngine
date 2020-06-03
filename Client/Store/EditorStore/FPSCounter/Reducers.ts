import {ACTION_CHANGE_FPS_COUNT} from './Actions'
const initionState = {
    fps:0
};



export const fpsCounter = (state = initionState, action) => {
    switch (action.type){
        case ACTION_CHANGE_FPS_COUNT:
            return {
                ...state,
                fpsCounter: action.payload
            };

    }
    return state;
};
