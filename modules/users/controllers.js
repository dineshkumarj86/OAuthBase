function usersController(userRepo
                        ,   validator 
                        ,   emailHelper 
                        ,   emailTemplateRepo
                        ,   registeredUserMailTemplateName
                        ,   uuidGenerator) {
  this.getUserByUserId = function(req, res, next) {
    if (!req.user) {
      res.status(401).send({
        error: 'Authentication failed'
      });
      return next()
    }

    const userId = req.query.userId

    if (undefined === userId || userId === null) {
      res.status(400).send({
        error: 'UserId is undefined or null'
      })
      return next()
    }

    var result = userRepo.getUserById(userId)
    result.then(function(data) {
      res.status(200).send(data)
    })
  }


  /**
   * For Inserting Users
   * Checks to see, if the user is authenticated, persists userinfo to users table
   */
  this.insertUser = function(req, res, next) {
    if (!req.user) {
      res.status(401).send({
        error: 'Authentication failed'
      });
      return next()
    }

    const user = {
      UserName: req.body.UserName,
      Password: req.Password,
      UserId: req.UserId,
      Email: req.body.Email,
      PhoneNumber: req.body.Phone,
      isActive: 1,
      ActivationToken: uuidGenerator.generateUUID()
    }

    const appUser = {
      AppId: req.user.AppId,
      UserId: req.UserId
    }

    validator.validateUIData(user).then(async function(data) {
      // case when validation passes
      let isExists = await validator.isExistsUser(userRepo, user.UserName, user.Email)
      if (isExists) {
        res.status(409).send({
          error: "User Exists"
        })
        return next()
      }

      console.log('Checking for Phone Number exists or not')
      let isExistsPhone = await validator.isExistsUserPhoneNumber(userRepo, user.PhoneNumber)
      if(isExistsPhone){
        res.status(409).send({
          error: "Phone Number Already Associated With Other User"
        })
        return next()
      }

      console.log('Validation Success')
      var result = userRepo.insertUser(user, appUser)
      //check the result of the query
      result.then(async function(isSuccessful) {
        //if passed send 200 with data
        console.log('User Inserted')
        let userInfo = {UserId: user.UserId, Email: user.Email, AppId: appUser.AppId}
        // let userPublish = JSON.stringify(userInfo)
        let templateDetails = await emailTemplateRepo.getEmailTemplate(appUser.AppId, registeredUserMailTemplateName, user.ActivationToken)
        
        // console.log(emailHelper)
        // queueHelper.publishMessage(userPublish)
        // emailHelper
        console.log(`Email :- ${userInfo.Email}`)
        emailHelper.sendEmail(userInfo.Email, templateDetails[0].Subject, templateDetails[0].Body)
        res.status(201).send({
          message: 'Insert Succeded'
        })

      }).catch(function(err) {
        //if failed send 500 - UnExpected Error
        console.log(err)
        res.status(500).send({
          error: "Unexpected Error"
        })
      })
    }).catch(function(err) {
      //validation failed.. send the validation errors
      console.log(err)
      console.log('Validation Failure')
      res.status(400).send({
        error: err
      })
    })
  }

  this.getUserByEmail = function(req, res, next) {
    if (!req.user) {
      res.status(401).send({
        error: 'Authentication failed'
      });
      return next()
    }

    if (req.query.hasOwnProperty('email') && (undefined === req.query.email || req.query.email == null)) {
      res.status(400).send({
        error: 'Email Required'
      })
      return next()
    }

    const email = req.params.email
    console.log(`Email Received ${email}`)

    var result = userRepo.getUserByEmail(email)
    result.then(function(data) {
      console.log(data)
      if (data.length > 0) {
        res.status(200).send({
          "isExists": true
        });
      } else {
        res.status(200).send({
          "isExists": false
        });
      }
    })
  }

  this.getUserByUserName = function(req, res, next) {
    if (!req.user) {
      res.status(401).send({
        error: 'Authentication failed'
      });
      return next()
    }

    if (req.query.hasOwnProperty('username') && (undefined === req.query.email || req.query.email == null)) {
      res.status(400).send({
        error: 'Email Required'
      })
      return next()
    }

    const username = req.params.username
    console.log(`Email Received ${username}`)

    var result = userRepo.getUserByUserName(username)
    result.then(function(data) {
      console.log(data)
      if (data.length > 0) {
        res.status(200).send({
          "isExists": true
        });
      } else {
        res.status(200).send({
          "isExists": false
        });
      }
    })
  }
}


module.exports = exports = usersController;
