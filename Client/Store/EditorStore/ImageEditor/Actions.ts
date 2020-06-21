
export const ACTION_CHANGE_IMAGE_EDITOR = "ACTION_CHANGE_IMAGE_EDITOR";
export const ACTION_CHANGE_IMAGE_EDITOR_STATUS = "ACTION_CHANGE_IMAGE_EDITOR_STATUS";

export const changeImageEditor = imageEditorData=>{

    return {
        type: ACTION_CHANGE_IMAGE_EDITOR,
        payload: imageEditorData
    }
};

export const changeImageEditorStatus = imageEditorData=>{

    return {
        type: ACTION_CHANGE_IMAGE_EDITOR_STATUS,
        payload: imageEditorData
    }
};