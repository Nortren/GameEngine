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
                        // "POST /api"(req, res){
                        //     this.testActions(req, res)
                        // },
                        "POST /api": 'EditorService.testActions',
                        // "GET /api": "EditorService.testActions"
                    },
                    onBeforeCall(ctx, route, req, res) {
                        // console.log('onBeforeCall7',req.body);
                        // Set request headers to context meta
                        ctx.meta.userAgent = req.headers["user-agent"];

                    },
                    onAfterCall(ctx, route, req, res, data) {
                        console.log('onAfterCall');
                        return '123123';

                    },
                    onError(req, res, err) {
                        console.log('Error route');
                        res.setHeader("Content-Type", "text/plain");
                        res.writeHead(err.code || 500);
                        res.end("Route error test1: " + err.message);
                    }
                }]
            },
            actions: {
                checkUserAuthorization: this.userAuthorization,
                testActions: this.sendDirectoryEngine
            },
            events: {},
            created: this.serviceCreated,
            started: this.serviceStarted,
            stopped: this.serviceStopped,
        });
    }

    /**
     * Метод рексрусивного спуска по директории проекта ,для формирование структуры проекта в виде объекта
     */
    readFolder(folder, projectStructure,arrItem): object {
        let currentDirectory = fs.readdirSync(folder, 'utf8');

        currentDirectory.forEach(file => {
            let pathOfCurrentItem = path.join(folder, file);

            if (fs.statSync(pathOfCurrentItem).isFile()) {
                arrItem.push({name: file, type: 'file'});
            }
            else {

                projectStructure[file] = {name: file, type: 'directory',arrItem:[]};

                if(projectStructure.name){
                    console.log(folder,projectStructure.name,' TestStructute');
                    projectStructure[file].arrItem.push({name: file, type: 'directory',arrItem:[]});
                }


                this.readFolder(pathOfCurrentItem, projectStructure[file],projectStructure[file].arrItem);
            }
        });
        return projectStructure;
    }


    sendDirectoryEngine(request, response) {
        const folder = '/GameEngine/Client/Editor/Tools';

        let structure = this.readFolder(folder, {},[]);
        // console.log(structure, 'structure_1');

        request.options.parentCtx.params.res.writeHead(200, {'Content-Type': 'text/plain'});
        request.options.parentCtx.params.res.end(JSON.stringify({data: structure}));
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