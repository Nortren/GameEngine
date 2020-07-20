import * as openSocket from 'socket.io-client';
import {globalVariables} from "../Client/GlobalVariables";
const socket = openSocket(`${globalVariables.serverPath}:8010`);
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

    sendUserMessage(message){
        socket.emit('sendMessage',message);
    }
    getUserMessage(callback){
        socket.on('getUserMessage', (data) => {
            callback(data);
        });
    }


    getTestDataServerConnect(callback){
        socket.on('getTestServerConnect', (data) => {
            callback(data);
        });
    }
}
