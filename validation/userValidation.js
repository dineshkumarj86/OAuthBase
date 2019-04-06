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
      UserId: this.schemalib.string().required(),
      Email: this.schemalib.string().required(),
      PhoneNumber: this.schemalib.string().required(),
      isActive: this.schemalib.number().min(0).max(1),
      ActivationToken: this.schemalib.string().required()
    });
  }

  async isExistsUser(userRepo, userName, email) {
    var email = userRepo.getUserByEmailAndUserName(email, userName)
    return new Promise(function(resolve, reject) {
      email.then(function(result) {
        console.log(result.length)
        if (result.length > 0) {
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

  async isExistsUserPhoneNumber(userRepo, phone) {
    console.log('Inside isExistsUserPhoneNumber')
    console.log(`Phone ${phone}`)
    var email = userRepo.getUserByPhoneNumber(phone)
    return new Promise(function(resolve, reject) {
      email.then(function(result) {
        console.log(result.length)
        if (result.length > 0) {
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
