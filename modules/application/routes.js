const application = require('./controller'),
        appFilter = require('./applicationFilter');

class applicationroute{
    constructor(app, applicationRepo, passport, uuidHelper, appValidator){
        this.app = app;
        this.applicationRepo = applicationRepo
        this.passport = passport
        this.domain = new application(applicationRepo, appValidator)
        this.filters = new appFilter(uuidHelper)
    }

    loadRoutes(basePath) {
        let v1Path = basePath.concat('v1/application/');
        this.app.route(v1Path)
                .get(this.passport.authenticate('basic', { session: false }),
                      this.domain.getApplications)
                .post(this.passport.authenticate('basic', { session: false }),
                      this.filters.fillUUID,
                      this.domain.insertApplication);
	}
}

module.exports = exports = applicationroute
