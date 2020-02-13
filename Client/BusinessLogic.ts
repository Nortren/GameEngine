import * as openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8010');
export default class BusinessLogic {


    getAIData(interval, data, callback) {
        socket.emit('getAIStatus', interval, data);
        socket.on('setAIStatus', (data) => {
            callback(data);
        });
    }
    getMapStaticData(callback) {
        socket.emit('getMapStatic');
        socket.on('returnMapStaticData', (data) => {
            callback(data);
        });
    }

    checkUserAuthorization(userData,callback){
        socket.emit('checkUserAuthorization',userData);
        socket.on('resultUserAuthorization', (data) => {
            callback(data);
        });
    }

}
