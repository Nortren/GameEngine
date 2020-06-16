import * as React from 'react';

import {HierarchyContext} from '../../Tools/Hierarchy/Hierarchy';
/**
 * Компонент лоадер загрузки
 * показываем его пока нам не пришли готовые данные
 * @returns {any}
 * @constructor
 */

export default function FileLoad() {
    if (HierarchyContext && HierarchyContext._currentValue) {
        const {progressBarStatus, progressBarLength, progressStatusLength} = React.useContext(HierarchyContext);

        console.log(progressBarLength, progressStatusLength, 'Loader');
    }
    return (
        <div className="loader_container">
            <div className="loader_container-loader"></div>
        </div>
    );
}