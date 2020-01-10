
export const ACTION_CHANGE_X_POSITION = "ACTION_CHANGE_X_POSITION";
export const ACTION_CHANGE_Y_POSITION = "ACTION_CHANGE_Y_POSITION";
export const DIRECTION_CHANGE_X_MOVEMENT = "DIRECTION_CHANGE_X_MOVEMENT";
export const DIRECTION_CHANGE_Y_MOVEMENT = "DIRECTION_CHANGE_Y_MOVEMENT";
export const DIRECTION_CHANGE_MOVEMENT = "DIRECTION_CHANGE_MOVEMENT";
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
export const directionOfMovementX = new_x_direction =>{
    return {
        type: DIRECTION_CHANGE_X_MOVEMENT,
        payload: new_x_direction
    }
};
export const directionOfMovementY = new_y_direction =>{
    return {
        type: DIRECTION_CHANGE_Y_MOVEMENT,
        payload: new_y_direction
    }
};
export const directionOfMovement = new_direction =>{
    return {
        type: DIRECTION_CHANGE_MOVEMENT,
        payload: new_direction
    }
};
