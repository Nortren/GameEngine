import {ACTION_CHANGE_GAME_WORLD_STATE} from './Actions'
const initionState = {
    GWState:{}
};



export const gameWorldState = (state = initionState, action) => {
    switch (action.type){
        case ACTION_CHANGE_GAME_WORLD_STATE:
            return {
                ...state,
                GWState: action.payload
            };

    }
    return state;
};
