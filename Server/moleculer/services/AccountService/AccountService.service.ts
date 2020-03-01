const Service = require("moleculer").Service;
class AccountService extends Service {

    constructor(broker) {
        super(broker);

        this.parseServiceSchema({
            name: "AccountService",
            // version: "v2",
            meta: {
                scalable: true
            },
            settings: {
                upperCase: true,
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


    userAuthorization(ctx) {
        const  userParams = ctx.params;
        return this.broker.call("DB.checkAuthorization",userParams).then(
            result => {
                return result;
            },
            error =>{   console.log('Ошибка Авторизации пользователя DB')}
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

module.exports = AccountService;