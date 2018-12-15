const express = require('express'),
      bodyparser = require('body-parser'),
      settings = require('./settings'),
      db = require('./db/db'),
      mysqlconn = require('./db/mysql/connection'),
      mysql = require('mysql'),
      routes = require('./routes/routes'),
      passport = require('passport'),
      BasicStrategy = require('passport-http').BasicStrategy,
      passportHelper = require('./helpers/passporthelper'),
      applicationRepo = require('./repo/ApplicationRepo'),
      userRepo = require('./repo/UserRepo'),
      cryptoHelper = require('./helpers/cryptohelper')
      logger = require('winston'),
      uuidHelper = require('./helpers/uuidhelper'),
      cryptolib = require('bcrypt'),
      joi = require('joi'),
      userValidator = require('./validation/userValidation'),
      appUserRepo = require('./repo/userApplicationRepo'),
      appValidator = require('./validation/appValidator'),
      tokenRepository = require('./repo/TokenRepo'),
      resourceOwnerGrantsValidator = require('./validation/resourceOwnerGrantsValidator')
      clientCredentialsGrantsValidator = require('./validation/clientCredentialsValidator'),
      jsonWebtoken = require('jsonwebtoken'),
      tokenHelper = require('./helpers/tokenHelper')
      otphelper = require('./helpers/otphelper');

const app = new express()

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true,
}));

app.use(function(req, res, next) {
  console.log('Inside CORS Header')
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", req.header('Access-Control-Request-Headers'));
  next();
});

var connection = new mysqlconn({host: settings.HOST,
  user: settings.USER_NAME,
  password: settings.PASSWORD,
  database: settings.DB_NAME,
  }, mysql);

var mysqldb = new db({connection: connection})

const log = logger.createLogger(
  {
    level: 'debug',
    format: logger.format.json(),
    transports: [
      new logger.transports.File({ filename : 'debug.log', level: 'debug'})
    ]
  }
)

uuidGenerator = new uuidHelper('v1')

passport.initialize();
var appRepo = new applicationRepo({'db': mysqldb, 'logger': log})
authHelper = new passportHelper(appRepo, passport, 'Admin')
authHelper.setupBasicStrategy(BasicStrategy)

let crypt = new cryptoHelper(cryptolib, settings.ROUNDS)
var userRepository = new userRepo({'db': mysqldb, 'logger': log})
var appUserRepository = new appUserRepo({'db': mysqldb, 'logger': log})
var userValidatorObj = new userValidator(joi);
userValidatorObj.setupValidationSchema()
var tokenRepo = new tokenRepository({'db': mysqldb, 'logger': log})
// tokenRepo,
var resourceOwnerValidator = new resourceOwnerGrantsValidator(joi, userRepository, appUserRepository)
resourceOwnerValidator.setupValidationSchema()
// resourceOwnerGrantsValidator,
var clientCredentialsValidator = new clientCredentialsGrantsValidator(joi, userRepository, appUserRepository)
clientCredentialsValidator.setupValidationSchema()
// clientCredentialsValidator,
// supportedGrantTypes
var appValidationHandler = new appValidator(joi)
appValidationHandler.setupValidationSchema()

settings.ValidationHandlers = {
                                password: resourceOwnerValidator,
                                client_credentials: clientCredentialsValidator
                              };

var tokenHelperObj = new tokenHelper(tokenRepo, jsonWebtoken, settings.JWT_Secret, userRepository, settings.ISS
                                      , settings.AUD)

let otpHelperObj = new otphelper(6)

var route = new routes(app, appRepo, passport, uuidGenerator, userRepository,
                      crypt,userValidatorObj,appUserRepository,tokenRepo, resourceOwnerValidator,
                      clientCredentialsValidator, settings.SUPPORTED_GRANT_TYPES, appValidationHandler,
                    tokenHelperObj, settings.ValidationHandlers, otpHelperObj);
route.initroutes();

const server = app.listen(settings.port, (error) => {
  if (error) return console.log(`Error: ${error}`);

  console.log(`Server listening on port ${server.address().port}`);
});
