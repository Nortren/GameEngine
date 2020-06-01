import * as openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8010');
export default class BusinessLogic {


    checkUserAuthorization(userData, callback) {
        socket.emit('checkUserAuthorization', userData);
        socket.on('resultUserAuthorization', (data) => {
            callback(data);
        });
    }


 /* Пример POST запроса
  static  getDirectoryProject() {
        let data = {
            'ordername': '12312',
            'receivername': 'Test'
        };
        let url = 'http://localhost:3001/api';

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });
    }*/


    static  getDirectoryProject(): Promise<Response> {
        let data = {
            'ordername': '12312',
            'receivername': 'Test'
        };
        let url = 'http://localhost:3001/api';

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });
    }
}
