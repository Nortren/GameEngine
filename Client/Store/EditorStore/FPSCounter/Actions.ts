
export const ACTION_CHANGE_PHYSICS = "ACTION_CHANGE_FPSCounter";

export const changeFPSCounter = physicalCollision=>{

    return {
        type: ACTION_CHANGE_PHYSICS,
        payload: physicalCollision
    }
};

