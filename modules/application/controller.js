function application(applicationRepo, appValidator) {

  this.getApplications = function(req, res, next) {
    if (!req.user || !req.user.IsAdminApp) {
      res.status(401).send({
        error: 'Authentication failed'
      })
      return next()
    }
    var result = applicationRepo.getAllApplications()
    result.then(function(data) {
      res.send(data)
    })
  }

  this.insertApplication = function(req, res, next) {
    console.log(req.user)
    if (!req.user || !req.user.IsAdminApp) {
      res.send(401).send({
        error: 'Authentication failed'
      })
      return next()
    }

    appValidator.validateUIData(req.body).then(async function(result) {
      let appName = req.body.appName
      let redirectUri = req.body.redirectUri

      let isExists = await appValidator.isExistsApp(applicationRepo, appName)
      console.log(`isExists: ${isExists}`)
      if (!isExists) {
        try {
          console.log('Inserting Application')
          let application = getApplication(req.AppId, req.AppSecret, appName, redirectUri)
          var result = await applicationRepo.insertApplication(application)
          if (!result) {
            res.status(500).send({error: 'UnExpected Error'})
            return next()
          }
          res.status(201).send(application)
        } catch (e) {
          next(e)
        }
      }
      res.status(409).send({error: "AppName Already Exists"})
    }).catch(function(err) {
      console.log('Validation Failure')
      console.log(err)
      res.status(400).send(err)
    });
  }
}

function getApplication(appId, appSecret, appName, redirectUri) {
  return {
    'AppId': appId,
    'AppSecret': appSecret,
    'AppName': appName,
    'IsAdminApp': 0,
    'RedirectUri': redirectUri
  }
}

module.exports = exports = application
