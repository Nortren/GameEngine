
export const ACTION_CHANGE_FPS_COUNT = "ACTION_CHANGE_FPS_COUNT";

export const fpsCounter = fps=>{

    return {
        type: ACTION_CHANGE_FPS_COUNT,
        payload: fps
    }
};

