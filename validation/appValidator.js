const validate = require('./validate')

class AppValidator extends validate{

  constructor(schemalib) {
    super(schemalib)
  }

  setupValidationSchema() {
    this.schema = this.schemalib.object().keys({
      // email is required
      // email must be a valid email string
      appName: this.schemalib.string().required(),
      //Password is required
      redirectUri: this.schemalib.string().uri({ scheme: ['http', 'https'] }).required()
    });
  }

  async isExistsApp(applicationRepo, appName) {
    var email = applicationRepo.getApplicationByAppName(appName)
    return new Promise(function(resolve, reject) {
      email.then(function(result) {
        if (result > 0 && result[0].AppName == appName) {
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
module.exports = exports = AppValidator
