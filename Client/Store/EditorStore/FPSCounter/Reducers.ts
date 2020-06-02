import {ACTION_CHANGE_FPSCounter} from './Actions'
const initionState = {
    physicalCollision:false
};



export const FPSCounterReducer = (state = initionState, action) => {
    switch (action.type){
        case ACTION_CHANGE_FPSCounter:
            return {
                ...state,
                physicalCollision: action.payload
            };

    }
    return state;
};
