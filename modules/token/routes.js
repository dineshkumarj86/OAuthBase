var tokenController = require('./controller')

class TokenModule{
  constructor(app, grantTypesSupported, validationHandlers, handler, cryptoHelper, passport){
    this.app = app
    // console.log(grantTypesSupported)
    this.domain = new tokenController(grantTypesSupported, validationHandlers, handler, cryptoHelper)
    this.passport = passport
  }

  loadRoutes(basePath) {
    let v1Path = basePath.concat('v1/token/');

    this.app.route(v1Path)
            .post(this.passport.authenticate('basic', { session: false }),
                    this.domain.getToken);
  }
}


module.exports = exports = TokenModule
