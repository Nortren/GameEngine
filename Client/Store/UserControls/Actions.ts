
export const ACTION_CHANGE_X_POSITION = "ACTION_CHANGE_X_POSITION";
export const ACTION_CHANGE_Y_POSITION = "ACTION_CHANGE_Y_POSITION";
export const DIRECTION_CHANGE_X_MOVEMENT = "DIRECTION_CHANGE_X_MOVEMENT";
export const DIRECTION_CHANGE_Y_MOVEMENT = "DIRECTION_CHANGE_Y_MOVEMENT";
export const DIRECTION_CHANGE_MOVEMENT = "DIRECTION_CHANGE_MOVEMENT";
export const ANIMATION_CHANGE = "ANIMATION_CHANGE";
export const changeX = new_x_position=>{

    return {
        type: ACTION_CHANGE_X_POSITION,
        payload: new_x_position
    }
};
export const changeY = new_y_position=>{
    return {
        type: ACTION_CHANGE_Y_POSITION,
        payload: new_y_position
    }
};
export const directionOfMovement = new_direction =>{
    return {
        type: DIRECTION_CHANGE_MOVEMENT,
        payload: new_direction
    }
};
export const animationStatusChange = animationStatus =>{
    return {
        type: ANIMATION_CHANGE,
        payload: animationStatus
    }
};
