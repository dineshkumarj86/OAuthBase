function TokenController(grantTypesSupported, validationHandlers, handler, cryptoHelper) {

  this.getToken = function(req, res, next) {
    if (!req.user) {
      res.status(401).send({
        error: 'Authentication failed'
      });
      return next()
    }

    console.log(req.body)

    if (!req.body.hasOwnProperty('grant_type')) {
      res.status(400).send({
        error: 'Body should contain grant_type is Required'
      });
    }

    if (!req.body) {
      res.status(400).send({
        error: 'grant_type is Required'
      });
      return next();
    }

    //Check for Supported Grant Types
    console.log(`Incoming Grant Type : ${req.body.grant_type}`)
    if (!grantTypesSupported.includes(req.body.grant_type)) {
      res.status(400).send({
        error: 'grant_type is not supported'
      });
      return next();
    }

    //Check to see if there is no error in data that user has sent
    validationHandlers[req.body.grant_type].validateUIData(req.body)
      .then(function(data) {
        console.log('UI Data Validation Successful')
        //Check to see if user Exists by Given userName and Password
        validationHandlers[req.body.grant_type].isUserExistsByUsernameAndPassword(req.body, cryptoHelper)
          .then(function(result) {
            if (result) {
              console.log('isUserExistsByUsernameAndPassword validation success')
              //Check to see if the User is getting token for app that he is associated with
              var isAppUserExists = validationHandlers[req.body.grant_type].isAppUserExists(req.body, req.user)
              console.log(isAppUserExists)
              isAppUserExists.then(async function(result) {
                console.log('User App Validation Successful')
                //Handle the corresponding request and issue token
                let token = await handler.handle(req.user, req.body)
                console.log('Out of Handler')
                console.log(token)
                if (token === null || undefined === token) {
                  res.status(500).send({
                    error: "Unexpected Error"
                  })
                }
                var response = {
                  access_token: token.Access_Token,
                  token_type: 'JWT'
                }
                res.status(200).send(response)
              }).catch(function(err) {
                res.status(401).send({
                  error: "User Not Associated With Particular App"
                })
              });
            } else {
              res.status(400).send({
                error: 'User Doesn\'t Exist'
              })
            } //Catch block for User not associated with the particular app
          }).catch(function(err) {
            res.status(401).send({
              error: "UserName or Password Incorrect"
            })
          }); //End Catch Block for User Is Not Associated
      }).catch(function(err) {
        res.status(400).send(err)
      });
  }
}

module.exports = exports = TokenController
