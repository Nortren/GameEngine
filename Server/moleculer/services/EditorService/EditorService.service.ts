import {async} from "q";
const Service = require("moleculer").Service;
const ApiGateway = require("moleculer-web");
const fs = require('fs');
const path = require('path');
class EditorService extends Service {

    constructor(broker) {
        super(broker);

        this.parseServiceSchema({
            name: "EditorService",
            mixins: [ApiGateway],
            meta: {
                scalable: true
            },
            settings: {
                port: process.env.PORT || 3001,
                upperCase: true,

                routes: [{
                    path: "/",
                    cors: {
                        origin: ["http://localhost:3001", "http://localhost:8080"],
                        methods: ["GET", "OPTIONS", "POST"]
                    },
                    bodyParsers: {
                        json: true,
                        urlencoded: {extended: true}
                    },
                    aliases: {
                        "GET /api/getProjectStructure": "EditorService.getProjectStructure",
                        "POST /api/getInfoAboutStructure": 'EditorService.getInfoAboutStructure',
                    },
                    onBeforeCall(ctx, route, req, res) {

                        ctx.meta.userAgent = req.headers["user-agent"];

                    },
                    // onAfterCall(ctx, route, req, res, data) {
                    //     console.log('onAfterCall');
                    //     return '123123';
                    //
                    // },
                    onError(req, res, err) {
                        console.log('Error route');
                        res.setHeader("Content-Type", "text/plain");
                        res.writeHead(err.code || 500);
                        res.end("Route error GameEngineServer response: " + err.message);
                    }
                }]
            },
            actions: {
                checkUserAuthorization: this.userAuthorization,
                getProjectStructure: this.sendDirectoryEngine,
                getInfoAboutStructure: this.sendInfoAboutStructure
            },
            events: {},
            created: this.serviceCreated,
            started: this.serviceStarted,
            stopped: this.serviceStopped,
        });
    }

    /**
     * Метод чтения запрошеного с клиента файла и отправки его клиенту
     * @param request
     * @param response
     */
    sendInfoAboutStructure(request, response): void {
        const name =  request.params.name;
        const type =  request.params.type;
        const promise = new Promise((resolve, reject) => {
            fs.readFile(request.params.path, "utf8", (error, data) => {
                resolve(data);
            });
        });
        request.options.parentCtx.params.res.writeHead(200, {'Content-Type': 'text/plain'});
        promise.then((data) => {
            try {

                request.options.parentCtx.params.res.end(JSON.stringify({
                    data: {
                        name,
                        type,
                        fileData: data
                    }
                }));
            }
            catch (e) {
                console.log(e);
            }
        });
    }

    /**
     * Метод рексрусивного спуска по директории проекта ,для формирование структуры проекта в виде массива объектов
     * @param folder
     * @param arrayOfStructures
     * @returns {[Object]}
     */

    readFolder(folder: string, arrayOfStructures: [object]): [object] {
        const projectStructure = {};
        let currentDirectory = fs.readdirSync(folder, 'utf8');
        console.log(folder);
        currentDirectory.forEach(file => {
            let pathOfCurrentItem = path.join(folder, file);

            if (fs.statSync(pathOfCurrentItem).isFile()) {
                arrayOfStructures.push({
                    name: file,
                    path: folder.concat('/' + file),
                    extension: path.extname(file),
                    type: 'file'
                });
            }
            else {
                projectStructure[file] = {name: file, path: folder, type: 'directory', arrayOfStructures: []};
                arrayOfStructures.push(projectStructure[file]);
                this.readFolder(pathOfCurrentItem, projectStructure[file].arrayOfStructures);
            }
        });
        return arrayOfStructures;
    }


    /**
     * Метод отправки массива объектов со структурой директории клиенту
     * @param request
     * @param response
     */
    sendDirectoryEngine(request, response): void {
        const folder = '/GameEngine/Client';
        const structure = this.readFolder(folder, [{}]);

        request.options.parentCtx.params.res.writeHead(200, {'Content-Type': 'text/plain'});
        request.options.parentCtx.params.res.end(JSON.stringify({
            data: [{
                name: 'root',
                type: 'directory',
                arrayOfStructures: structure
            }]
        }));
    }

    userAuthorization(ctx) {
        const userParams = ctx.params;
        return this.broker.call("DB.checkAuthorization", userParams).then(
            result => {
                return result;
            },
            error => {
                console.log('Ошибка Авторизации пользователя DB')
            }
        );
    }

    serviceCreated() {
        this.logger.info("ES6 Service created.");
    }

    serviceStarted() {
        this.logger.info("ES6 Service started.");
    }

    serviceStopped() {
        this.logger.info("ES6 Service stopped.");
    }
}

module.exports = EditorService;