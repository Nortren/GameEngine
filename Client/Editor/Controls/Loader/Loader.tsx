import * as React from 'react';
/**
 * Компонент лоадер загрузки
 * показываем его пока нам не пришли готовые данные
 * @returns {any}
 * @constructor
 */

export default function FileLoad() {
    return (
        <div className="loader_container">
            <div className="loader_container-loader"></div>
        </div>
    );
}
