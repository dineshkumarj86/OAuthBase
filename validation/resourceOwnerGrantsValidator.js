const tokenValidator = require('./tokenValidator')

class ResourceOwnerGrantsValidator extends tokenValidator{
  constructor(schemalib, userRepo, userAppRepo) {
    super(schemalib, userRepo, userAppRepo)
  }

  setupValidationSchema() {
    this.schema = this.schemalib.object().keys({
      // grant_type is Required
      grant_type: this.schemalib.string().required(),
      //username is required
      username: this.schemalib.string().required(),
      //password is required
      password: this.schemalib.string().min(8).required(),
      //scope is required
      scope: this.schemalib.string()
    });
  }
}

module.exports = ResourceOwnerGrantsValidator
