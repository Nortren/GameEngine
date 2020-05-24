import * as openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8010');
export default class BusinessLogic {


    checkUserAuthorization(userData, callback) {
        socket.emit('checkUserAuthorization', userData);
        socket.on('resultUserAuthorization', (data) => {
            callback(data);
        });
    }


    static  getDirectoryProject() {
        let data = {
            'ordername': '12312',
            'receivername': 'Test'
        };
        let url = 'http://localhost:3001/api';

        let response = fetch(url, {
            method: 'POST',
            headers: {

                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });

        response.then((commits) => {
                console.log(commits,'Test console');
            },
            error => {
                console.log('Error', error);
            })

    }
}
