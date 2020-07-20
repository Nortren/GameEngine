import * as openSocket from 'socket.io-client';
import {globalVariables} from "../GlobalVariables";
const socket = openSocket(`${globalVariables.serverPath}:8010`);

interface ISelectedStructure {
    extension: string,
    name: string,
    path: string,
    stats: object,
    type: string,
}


export default class BusinessLogic {

    /**
     * Метод получение данных о выбранной сущности
     * @param structure
     * @returns {Promise<Response>}
     */
    static  getInfoAboutStructure(structure: ISelectedStructure) {

        let url = `${globalVariables.serverPath}:3001/api/getInfoAboutStructure`;

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
        let url = `${globalVariables.serverPath}:3001/api/getProjectStructure`;

        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        });
    }
}
