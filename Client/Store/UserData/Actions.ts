
export const ACTION_CHANGE_USER_STATUS = "ACTION_CHANGE_USER_STATUS";

export const changeUserStatus = new_x_position=>{

    return {
        type: ACTION_CHANGE_USER_STATUS,
        payload: new_x_position
    }
};

