const validate = require('./validate')

class userValidation extends validate {
  constructor(schemalib) {
    super(schemalib)
  }

  setupValidationSchema() {
    this.schema = this.schemalib.object().keys({
      // email is required
      // email must be a valid email string
      UserName: this.schemalib.string().email().required(),
      //Password is required
      Password: this.schemalib.string().min(8).required(),
      //UserId
      UserId: this.schemalib.string().required()
    });
  }

  async isExistsUser(userRepo, userName) {
    var email = userRepo.getUserByEmail(userName)
    return new Promise(function(resolve, reject) {
      email.then(function(result) {
        if (result > 0 && result[0].UserName == userName) {
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
}

module.exports = exports = userValidation;
