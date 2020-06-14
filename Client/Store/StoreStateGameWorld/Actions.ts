
export const ACTION_CHANGE_GAME_WORLD_STATE = "ACTION_CHANGE_GAME_WORLD_STATE";

export const gameWorldState = GWState=>{

    return {
        type: ACTION_CHANGE_GAME_WORLD_STATE,
        payload: GWState
    }
};

