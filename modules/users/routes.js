const usersController = require('./controllers'),
      usersFilter = require('./userfilter');

class userRoute{
  constructor(app, userRepo, passport, uuidHelper, cryptoHelper, validator,
              appUserRepo){
    this.app = app
    this.userRepo = userRepo
    this.passport = passport
    this.userFilter = new usersFilter(cryptoHelper, uuidHelper)
    this.domain = new usersController(userRepo, validator, appUserRepo)
  }

  loadRoutes(basePath){
    let v1Path = basePath.concat('v1/users/');
    this.app.route(v1Path)
            .get(this.passport.authenticate('basic', { session: false }),
                  this.domain.getUserByUserId)
            .post(this.passport.authenticate('basic', { session: false }),
                  this.userFilter.initValues,
                  this.domain.insertUser);
  }
}

module.exports = exports = userRoute
