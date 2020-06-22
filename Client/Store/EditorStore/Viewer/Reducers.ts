import {ACTION_CHANGE_VIEWER} from './Actions'
const initionState = {
    viewData: []
};


export const viewer = (state = initionState, action) => {
    switch (action.type) {
        case ACTION_CHANGE_VIEWER:
//Проверяем есть ли искомый массив в хранилище
            if (initionState.viewData.some((item) => {
                    return item.name === action.payload.name
                })) {

                initionState.viewData.map(
                    (item) => {
                        //Если он есть заменяем его данные на новые
                        if (item.name === action.payload.name) {
                            item.type = action.payload.type;
                            item.fileData = action.payload.fileData;
                            item.extension = action.payload.extension;

                            return item;
                        }
                        return item;
                    }
                );
            } else {
                //если нет записываем в хранилище
                initionState.viewData.push(action.payload);
            }


            return {
                ...state,
                viewData: initionState.viewData
            };

    }
    return state;
};
