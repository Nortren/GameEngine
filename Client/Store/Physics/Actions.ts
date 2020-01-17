
export const ACTION_CHANGE_PHYSICS = "ACTION_CHANGE_PHYSICS";

export const changePhysics = physicalCollision=>{

    return {
        type: ACTION_CHANGE_PHYSICS,
        payload: physicalCollision
    }
};

