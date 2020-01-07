
export const ACTION_CHANGE_X_POSITION = "ACTION_CHANGE_X_POSITION";
export const ACTION_CHANGE_Y_POSITION = "ACTION_CHANGE_Y_POSITION";
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
