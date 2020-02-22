const Service = require("moleculer").Service;
import Authorization from './ClientAuthorization/Authorization'

class AccountService extends Service {

    _authorization: Authorization = new Authorization;
    // services/AccountService/AccountService.service.js
    constructor(broker) {


        super(broker);

        this.parseServiceSchema({
            name: "AccountService",
            // version: "v2",
            meta: {
                scalable: true
            },
            settings: {
                upperCase: true
            },
            actions: {
                checkUserAuthorization: this.userAuthorization
            },
            events: {},
            created: this.serviceCreated,
            started: this.serviceStarted,
            stopped: this.serviceStopped,
        });
    }

    testH() {
        console.log('Test Hello');
    }

    userAuthorization(ctx) {
        console.log(ctx.params);
        const authorization = new Authorization();
        return authorization.checkAuthorizationData(ctx.params)
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

module.exports = AccountService;