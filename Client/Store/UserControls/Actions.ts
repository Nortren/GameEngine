
export const ACTION_CHANGE_X_POSITION = "ACTION_CHANGE_X_POSITION";
export const ACTION_CHANGE_Z_POSITION = "ACTION_CHANGE_Z_POSITION";
export const DIRECTION_CHANGE_X_MOVEMENT = "DIRECTION_CHANGE_X_MOVEMENT";
export const DIRECTION_CHANGE_Z_MOVEMENT = "DIRECTION_CHANGE_Z_MOVEMENT";
export const DIRECTION_CHANGE_MOVEMENT = "DIRECTION_CHANGE_MOVEMENT";
export const CLICKED_BUTTON_SKILL = "CLICKED_BUTTON_SKILL";
export const ANIMATION_CHANGE = "ANIMATION_CHANGE";
export const changeX = new_x_position=>{

    return {
        type: ACTION_CHANGE_X_POSITION,
        payload: new_x_position
    }
};
export const changeZ = new_z_position=>{
    return {
        type: ACTION_CHANGE_Z_POSITION,
        payload: new_z_position
    }
};
export const directionOfMovement = new_direction =>{
    return {
        type: DIRECTION_CHANGE_MOVEMENT,
        payload: new_direction
    }
};
export const clickedSkillButton = buttonNameStatus =>{
    return {
        type: CLICKED_BUTTON_SKILL,
        payload: buttonNameStatus
    }
};
export const animationStatusChange = animationStatus =>{
    return {
        type: ANIMATION_CHANGE,
        payload: animationStatus
    }
};
export const animationStatusChange = animationStatus =>{
    return {
        type: ANIMATION_CHANGE,
        payload: animationStatus
    }
};