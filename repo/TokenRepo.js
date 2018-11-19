const constants = require('../constants/constants'),
      util = require('util');

class TokenRepo{
  constructor(options){
    this.options = options || {}
    if (this.options.db === null || undefined === this.options.db) {
        throw new Error('DB : Required')
    }

    if(this.options.logger === null || undefined === this.options.logger){
        throw new Error('logger : Required')
    }
  }

  getUserAccessToken(userId, appId){
    let data = [userId, appId]
    console.log(data)
    var result = this.options.db.query(constants.query.SELECT_OAUTH_TOKEN_BY_USERID_APPID_FOR_USER_TOKEN, data)
    return new Promise(function (resolve, reject) {
        result.then(function (data) {
            resolve(data);
        }).catch(function (err) {
            reject(err);
        })
    })
  }

  getAppAccessToken(appId){
    console.log('Inside get AppAccess token')
    var result = this.options.db.query(constants.query.SELECT_OAUTH_TOKEN_BY_USERID_APPID_FOR_APP_TOKEN, appId)
    return new Promise(function (resolve, reject) {
        result.then(function (data) {
            resolve(data);
        }).catch(function (err) {
          console.log(err)
            reject(err);
        })
    })
  }

  insertAppToken(appToken){
    console.log('Inside insertAppToken')
    var result = this.options.db.executeUpdate(constants.query.INSERT_APP_TOKENS, appToken)
    return new Promise(function (resolve, reject) {
        result.then(function (data) {
            resolve(data);
        }).catch(function (err) {
            reject(err);
        })
    })
  }
}
module.exports = exports = TokenRepo
