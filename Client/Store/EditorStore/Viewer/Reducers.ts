import {ACTION_CHANGE_VIEWER} from './Actions'
const initionState = {
    viewData:[]
};



export const viewer = (state = initionState, action) => {
    switch (action.type){
        case ACTION_CHANGE_VIEWER:
            initionState.viewData.push(action.payload);
            return {
                ...state,
                viewData: initionState.viewData
            };

    }
    return state;
};
