import {ACTION_COLOR_PALETTE_EDITOR} from './Actions'
import {ACTION_CHANGE_COLOR_PALETTE_STATUS} from './Actions'
const initionState = {
    colorPaletteData: [],
    colorPaletteStatus: false
};


export const colorPaletteStore = (state = initionState, action) => {
    switch (action.type){
        case ACTION_COLOR_PALETTE_EDITOR:
            return {
                ...state,
                colorPaletteData: action.payload
            };
        case ACTION_CHANGE_COLOR_PALETTE_STATUS:
            return {
                ...state,
                colorPaletteStatus: action.payload
            };
    }
    return state;
};
