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
            .post(this.passport.authenticate('basic', { session: false }),
                  this.userFilter.initValues,
                  this.domain.insertUser);

    this.app.get(v1Path.concat('email/:email'), this.passport.authenticate('basic', { session: false }),
                                          this.domain.getUserByEmail)

    this.app.get(v1Path.concat('username/:username'), this.passport.authenticate('basic', { session: false }),
                                                this.domain.getUserByUserName)

    this.app.get(v1Path.concat(':userId'), this.passport.authenticate('basic', { session: false }),
          this.domain.getUserByUserId)
  }
}

module.exports = exports = userRoute
