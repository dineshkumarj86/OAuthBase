const constants = require('../constants/constants'),
  util = require('util');

class UserRepo {
  constructor(options) {
    this.options = options || {}
    if (this.options.db === null || undefined === this.options.db) {
      throw new Error('DB : Required')
    }

    if (this.options.logger === null || undefined === this.options.logger) {
      throw new Error('logger : Required')
    }
  }

  insertUser(user, userApp) {
    var queryArray = [constants.query.INSERT_USERS, constants.query.INSERT_APP_USERS]
    var paramArray = [user, userApp]
    var result = this.options.db.executeMultiple(queryArray, paramArray)
    return new Promise(function(resolve, reject) {
      result.then(function(result) {
        resolve(result)
      }).catch(function(err) {
        reject(false)
      })
    })
  }

  updateUser(user) {
    var result = this.options.db.executeUpdate(constants.query.UPDATE_USERS, user)
    return new Promise(function(resolve, reject) {
      result.then(function(result) {
        resolve(result)
      }).catch(function(err) {
        reject(false)
      })
    })
  }

  getUserById(UserId) {
    console.log(`UserId :- ${UserId}`)
    var result = this.options.db.query(constants.query.SELECT_USER_BY_USERID, UserId)
    console.log(result.sql)
    return new Promise(function(resolve, reject) {
      result.then(function(data) {
        resolve(data);
      }).catch(function(err) {
        reject(err);
      })
    })
  }

  getUserByEmail(Email) {
    var result = this.options.db.query(constants.query.SELECT_USER_BY_EMAIL, [Email])
    return new Promise(function(resolve, reject) {
      result.then(function(data) {
        resolve(data);
      }).catch(function(err) {
        console.log(err)
        reject(err);
      })
    })
  }

  getUserByEmailAndUserName(email, userName){
    var result = this.options.db.query(constants.query.SELECT_USER_BY_USERNAME_OR_EMAIL, [email, userName])
    return new Promise(function(resolve, reject) {
      result.then(function(data) {
        resolve(data);
      }).catch(function(err) {
        console.log(err)
        reject(err);
      })
    })
  }

  getUserIdByEmail(email) {
    var result = this.options.db.query(constants.query.SELECT_USERID_BY_USERNAME, [email, email])
    return new Promise(function(resolve, reject) {
      result.then(function(data) {
        resolve(data);
      }).catch(function(err) {
        console.error(err)
        reject(err);
      })
    })
    this.options.logger.log('debug', result.query)
  }

  getUserByPhoneNumber(phone){
    var result = this.options.db.query(constants.query.SELECT_USER_BY_PHONE, [phone])
    return new Promise(function(resolve, reject) {
      result.then(function(data) {
        resolve(data);
      }).catch(function(err) {
        console.error(err)
        reject(err);
      })
    })
    this.options.logger.log('debug', result.query)
  }

  getUserByEmailPassword(UserName, Password) {
    var result = this.options.db.query(constants.query.SELECT_USERS_BY_USERNAME_PASSWORD, [email, email, password])
    return new Promise(function(resolve, reject) {
      result.then(function(data) {
        resolve(data);
      }).catch(function(err) {
        console.error(err)
        reject(err);
      })
    })
    this.options.logger.log('debug', result.query)
  }

  getUserByUserName(userName) {
    var result = this.options.db.query(constants.query.SELECT_USER_BY_USERNAME, [userName])
    return new Promise(function(resolve, reject) {
      result.then(function(data) {
        resolve(data);
      }).catch(function(err) {
        console.error(err)
        reject(err);
      })
    })
    this.options.logger.log('debug', result.query)
  }
}

module.exports = exports = UserRepo;
