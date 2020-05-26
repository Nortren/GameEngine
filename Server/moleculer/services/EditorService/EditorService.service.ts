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
                testActions: this.testActions
            },
            events: {},
            created: this.serviceCreated,
            started: this.serviceStarted,
            stopped: this.serviceStopped,
        });
    }

    /**
     * Метод,для чтения структуры проекта
     * @param folder корень от куда надо начать читать
     */
    readFolder(folder, parent, promise): object {

        let projectStructure = [];
        promise = promise || [];


        let test =   fs.readdir(folder, (err, items) => {

            items.map(fileName => {
                let arrayItem = [];
                let type = 'file';
                let itemStatus = fs.statSync(path.join(folder, fileName));
                try {

                    if (itemStatus.isDirectory()) {
                        type = 'directory';
                        if (fileName !== 'node_modules' && fileName !== '.git') {

                            arrayItem.push(     this.readFolder(path.join(folder, fileName), projectStructure, fileName, promise));
                        }
                    }


                   return projectStructure.push({type:type,parent:fileName, items:arrayItem});
                }
                catch (error) {
                    console.log(error);

                }
              return projectStructure;
            });
            console.log(projectStructure);
            return projectStructure;
        });

        return test || 'NO'
    }

    testActions(request, response) {
        const folder = '/GameEngine';

        let structure = this.readFolder(folder, null, null, null);
        // console.log(structure, 'structure_1');

        // structure.then((result) => {
        //     console.log(result, 'structure_2');
        // });
        // Promise.all(structure).then((result) => {
        //     // console.log(result);
        //        result.forEach((res_1)=>{res_1.forEach((res_2)=>{console.log(res_2)})})
        //     });
        request.options.parentCtx.params.res.writeHead(200, {'Content-Type': 'text/plain'});
        request.options.parentCtx.params.res.end('TETETETTETETETE');
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