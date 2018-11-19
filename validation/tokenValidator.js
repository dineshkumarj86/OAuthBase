const validate = require('./validate')

class TokenValidator extends validate {
  constructor(schemalib, userRepo, userAppRepo) {
    super(schemalib)
    this.userRepo = userRepo
    this.userAppRepo = userAppRepo
  }

  isUserExistsByUsernameAndPassword(data, cryptLib) {
    console.log('Inside isUserExistsByUsernameAndPassword')
    // var email = userRepo.getUserByEmail(userName)
    if (!data.hasOwnProperty('username') && !data.hasOwnProperty('password')) {
      console.log('Doesn\'t have property username Inside client Credentials')
      return new Promise(function(resolve, reject) {
        try {
          resolve(true)
        } catch (err) {
          reject(false)
        }
      })
    }

    console.log('If Skipped i.e, data.hasOwnProperty(\'username\')')
    console.log(`data.userName ${data.username}`)
    var userInfo = this.userRepo.getUserByEmail(data.username)
    return new Promise(function(resolve, reject) {
      userInfo.then(async function(result) {
        let isPasswordCheckSuccessful = result.length > 0 ?
          await cryptLib.comparePassword(data.password, result[0].Password) :
          false
        console.log(isPasswordCheckSuccessful)
        if (result.length > 0 && isPasswordCheckSuccessful) {
          console.log('Successful')
          resolve(true)
        } else {
          console.log('Inside Else Part')
          resolve(false)
        }
      }).catch(function(err) {
        reject(false)
      })
    })
  }

  async isAppUserExists(userInfo, appInfo) {
    if (!userInfo.hasOwnProperty('username') && !userInfo.hasOwnProperty('password')) {
      return true;
    }
    try {
      let user = await this.userAppRepo.getAppUserInfoByAppIdUserName(appInfo.AppId, userInfo.username)
      return user
    } catch (err) {
      console.log(err)
      return null
    }
  }
}

module.exports = exports = TokenValidator
