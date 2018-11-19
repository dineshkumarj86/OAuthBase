const constants = require('../constants/constants'),
    util = require('util')

class ApplciationRepo {
    constructor(options) {
        this.options = options || {}
        if (this.options.db === null || undefined === this.options.db) {
            throw new Error('DB : Required')
        }

        if(this.options.logger === null || undefined === this.options.logger){
            throw new Error('logger : Required')
        }
    }

    getAllApplications() {
        var result = this.options.db.query(constants.query.SELECT_ALL_APPLICATIONS)
        return new Promise(function (resolve, reject) {
            result.then(function (data) {
                resolve(data);
            }).catch(function (err) {
                reject(err);
            })
        })
    }

    getApplicationByAppName(appName){
      var result = this.options.db.query(constants.query.SELECT_APPLICATION_BY_APPNAME, appName)
      return new Promise(function (resolve, reject) {
          result.then(function (data) {
              resolve(data);
          }).catch(function (err) {
              reject(err);
          })
      })
    }

    async getApplicationByAppIdAndSecret(appId, appSecret) {
        let query = util.format(constants.query.SELECT_APPLICATION_BY_APPID_AND_APPSECRET, `'${appId}'`, `'${appSecret}'`);
        this.options.logger.log('debug', query)
        var result = this.options.db.query(query)
        return new Promise(function (resolve, reject) {
            result.then(function (data) {
                if(data.length == 0)
                    resolve(false)
                else
                    resolve(data[0]);
            }).catch(function(err){
                console.log(err)
                reject(err);
            })
        })
    }

    async insertApplication(application){
        var result = this.options.db.executeUpdate(constants.query.INSERT_APPLICATION, application)
        return new Promise(function (resolve, reject) {
            result.then(function(result){
                resolve(result)
            }).catch(function(err){
                reject(false)
            })
        })
    }
}

module.exports = exports = ApplciationRepo
