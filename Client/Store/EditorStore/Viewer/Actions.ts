
export const ACTION_CHANGE_VIEWER = "ACTION_CHANGE_VIEWER";

export const changeViewer = viewData=>{

    return {
        type: ACTION_CHANGE_VIEWER,
        payload: viewData
    }
};

