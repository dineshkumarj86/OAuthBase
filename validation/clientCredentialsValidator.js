const tokenValidator = require('./tokenValidator')

class ClientCredentialsValidator extends tokenValidator{
  constructor(schemalib, userRepo, userAppRepo) {
    super(schemalib, userRepo, userAppRepo)
  }

  setupValidationSchema() {
    this.schema = this.schemalib.object().keys({
      // grant_type is Required
      grant_type: this.schemalib.string().required(),
      //scope
      scope: this.schemalib.string().required()
    });
  }
}

module.exports = exports = ClientCredentialsValidator
