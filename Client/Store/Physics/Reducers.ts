import {ACTION_CHANGE_PHYSICS} from './Actions'
const initionState = {
    physicalCollision:false
};



export const physicsReducer = (state = initionState, action) => {
    switch (action.type){
        case ACTION_CHANGE_PHYSICS:
            return {
                ...state,
                physicalCollision: action.payload
            };

    }
    return state;
};
