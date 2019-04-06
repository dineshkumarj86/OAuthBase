const constants = require('../constants/constants')

class AppEmailTemplate {
    constructor(options) {
        this.options = options || {}
        if (this.options.db === null || undefined === this.options.db) {
            throw new Error('DB : Required')
        }

        if (this.options.logger === null || undefined === this.options.logger) {
            throw new Error('logger : Required')
        }
    }

    getEmailTemplate(appId, templateName){
        var result = this.options.db.query(constants.query.SELECT_APP_EMAIL_BODY_BY_APPID_TEMPLATENAME, [appId, templateName])
        return new Promise(function (resolve, reject) {
            result.then(function (data) {
                // console.log(data);
                resolve(data);
            }).catch(function (err) {
                reject(err);
            })
        })
    }
}

module.exports = exports = AppEmailTemplate;