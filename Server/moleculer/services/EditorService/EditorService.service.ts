const Service = require("moleculer").Service;
const ApiGateway = require("moleculer-web");
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
                    aliases: {
                        "POST /api"(req, res){
                            this.testActions(req, res)
                        },
                        // "GET /api": "EditorService.testActions"
                    },
                    onBeforeCall(ctx, route, req, res) {
                        console.log('onBeforeCall7',req.body,res.body);
                        // Set request headers to context meta
                        ctx.meta.userAgent = req.headers["user-agent"];

                    },
                    onAfterCall(ctx, route, req, res, data) {
                        console.log('onAfterCall');
                        return '123123';

                    },
                    onError(req, res, err) {
                        console.log('Error route', req);
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

    testActions(request, response) {

        console.log(request.body, 'REQ');
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end('okay');
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