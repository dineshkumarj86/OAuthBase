const appModule = require('../modules/application/routes'),
      userModule = require('../modules/users/routes'),
      tokenModule = require('../modules/token/routes');

function router(app, //1
  applicationRepo, //2
  passport, //3
  uuidGenerator, //4
  userRepo, //5
  cryptoHelper, //6
  userValidator, //7
  appUserRepo, //8
  tokenRepo, //9
  resourceOwnerGrantsValidator, //10
  clientCredentialsValidator, //11
  supportedGrantTypes, //12
  appValidator,
  tokenHelper,
  validationHandlers) {
  this.app = app
  this.applicationRepo = applicationRepo
  this.passport = passport
  this.uuidGenerator = uuidGenerator
  this.cryptoHelper = cryptoHelper
  this.userRepo = userRepo
  this.userValidator = userValidator
  this.appUserRepo = appUserRepo
  this.tokenRepo = tokenRepo
  this.resourceOwnerGrantsValidator = resourceOwnerGrantsValidator
  this.clientCredentialsValidator = clientCredentialsValidator
  this.supportedGrantTypes = supportedGrantTypes
  this.appValidator = appValidator
  this.tokenHelper = tokenHelper
  this.validationHandlers = validationHandlers
}

router.prototype.initroutes = function() {
  const apiRoute = '/api/'
  let appMod = new appModule(this.app, this.applicationRepo, this.passport,
    this.uuidGenerator, this.appValidator);
  appMod.loadRoutes(apiRoute);

  let userMod = new userModule(this.app, this.userRepo, this.passport,
    this.uuidGenerator, this.cryptoHelper,
    this.userValidator, this.appUserRepo);
  userMod.loadRoutes(apiRoute);

  let tokenMod = new tokenModule(this.app,
                                  this.supportedGrantTypes,
                                  this.validationHandlers,
                                  this.tokenHelper,
                                  this.cryptoHelper,
                                  this.passport);
  tokenMod.loadRoutes(apiRoute)
}

module.exports = exports = router;
