import * as openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8010');
export default class BusinessLogic {

    /**
     * Запрос на бизнес логику для получения данных и построения по ним графиков
     * @param interval частота обращения на БЛ
     * @param data данные для отправки на сервер
     */

    getAIData(interval, data, callback) {
        socket.emit('getAIStatus', interval, data);
        socket.on('setAIStatus', (data) => {
            callback(data);
        });
    }


}
