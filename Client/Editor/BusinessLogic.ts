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
        /* let response = fetch(url,{ method: 'POST',
         headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         },
         body : data
         });*/
        let response = fetch(url, {
            method: 'POST',
            headers: {

                'test_data_connection': 'TEST'
            },
            body: '123123123'
        });

       /* let response_1 = fetch(url, {
            method: 'GET',
            headers: {

                'test_data_connection': 'TEST'
            }

        });

        response_1.then((commits) => {
            console.log(commits);
        });*/
        response.then((commits) => {
                console.log(commits,'Test console');
            },
            error => {
                console.log('Error', error);
            })

    }
}
