import * as openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8010');
export default class BusinessLogic {


    getAIData(interval, data, callback) {
        socket.emit('getAIStatus', interval, data);
        socket.on('setAIStatus', (data) => {
            callback(data);
        });
    }
    getUserRoom(callback) {
        socket.emit('getRoomData');
        socket.on('returnRoomData', (data) => {
            callback(data);
        });
    }

    checkUserAuthorization(userData,callback){
        socket.emit('checkUserAuthorization',userData);
        socket.on('resultUserAuthorization', (data) => {
            callback(data);
        });
    }
    setUserPosition(userData){
        socket.emit('setDataControls',userData);

    }
    getUserPosition(callback){
        socket.on('getUserPosition', (data) => {
            callback(data);
        });
    }

    getTestDataServerConnect(callback){
        socket.on('getTestServerConnect', (data) => {
            callback(data);
        });
    }
}
