
export const ACTION_CHANGE_USER_STATUS = "ACTION_CHANGE_USER_STATUS";

export const changeUserStatus = data=>{

    return {
        type: ACTION_CHANGE_USER_STATUS,
        payload: data
    }
};

