import * as openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8010');
export default class BusinessLogic {


    checkUserAuthorization(userData, callback) {
        socket.emit('checkUserAuthorization', userData);
        socket.on('resultUserAuthorization', (data) => {
            callback(data);
        });
    }


    static  getInfoAboutStructute(structure:object) {

        let url = 'http://localhost:3001/api/getInfoAboutStructure';

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(structure)
        });
    }

    /**
     * Метод получение структуры проекта с сервера
     * @returns {Promise<Response>}
     */
    static  getDirectoryProject(): Promise<Response> {
        let url = 'http://localhost:3001/api/getProjectStructure';

        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        });
    }
}
