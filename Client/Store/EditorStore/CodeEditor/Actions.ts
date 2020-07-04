
export const ACTION_CHANGE_CODE_EDITOR = "ACTION_CHANGE_CODE_EDITOR";
export const ACTION_CHANGE_CODE_EDITOR_STATUS = "ACTION_CHANGE_CODE_EDITOR_STATUS";

export const changeCodeEditor = codeEditorData=>{

    return {
        type: ACTION_CHANGE_CODE_EDITOR,
        payload: codeEditorData
    }
};

export const changeCodeEditorStatus = codeEditorData=>{

    return {
        type: ACTION_CHANGE_CODE_EDITOR_STATUS,
        payload: codeEditorData
    }
};