const constants = require('../constants/constants'),
      util = require('util');

class UserApplicationRepo{
  constructor(options){
    this.options = options || {}
    if (this.options.db === null || undefined === this.options.db) {
        throw new Error('DB : Required')
    }

    if(this.options.logger === null || undefined === this.options.logger){
        throw new Error('logger : Required')
    }
  }

  updateAppUser(appUser){
    var result = this.options.db.executeUpdate(constants.query.UPDATE_APP_USERS, appUser)
    return new Promise(function (resolve, reject) {
        result.then(function(result){
            resolve(result)
        }).catch(function(err){
            reject(false)
        })
    })
  }

  getAppUser(appId, userId){
    var result = this.options.db.query(constants.query.SELECT_APP_USERS_BY_USERID_APPID, [userId, appId])
    return new Promise(function (resolve, reject) {
        result.then(function(result){
            resolve(result)
        }).catch(function(err){
            reject(false)
        })
    })
  }

  deleteAppUser(appId, userId){
    var result = this.options.db.query(constants.query.DELETE_APP_USERS_BY_USERID_APPID, [userId, appId])
    return new Promise(function (resolve, reject) {
        result.then(function(result){
            resolve(result)
        }).catch(function(err){
            reject(false)
        })
    })
  }

  getAppUserInfoByAppIdUserName(AppId, UserName){
    let data = [UserName,AppId];
    var result = this.options.db.query(constants.query.SELECT_APP_BY_APPID_USERNAME, data)
    return new Promise(function (resolve, reject) {
        result.then(function (data) {
            resolve(data);
        }).catch(function (err) {
            console.error(err)
            reject(err);
        })
    })
    this.options.logger.log('debug', result.query)
  }
}

module.exports = exports = UserApplicationRepo
