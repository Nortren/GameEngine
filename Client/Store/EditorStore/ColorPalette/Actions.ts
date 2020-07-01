
export const ACTION_COLOR_PALETTE_EDITOR = "ACTION_COLOR_PALETTE_EDITOR";
export const ACTION_CHANGE_COLOR_PALETTE_STATUS = "ACTION_CHANGE_COLOR_PALETTE_STATUS";

export const changeColorPalette = colorPaletteData=>{

    return {
        type: ACTION_COLOR_PALETTE_EDITOR,
        payload: colorPaletteData
    }
};

export const changeColorPaletteStatus = colorPaletteData=>{

    return {
        type: ACTION_CHANGE_COLOR_PALETTE_STATUS,
        payload: colorPaletteData
    }
};