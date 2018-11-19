function usersController(userRepo, validator, appUserRepo){
    this.getUserByUserId = function(req, res, next){
        if(!req.user){
            res.status(401).send({
                error: 'Authentication failed'
            });
            return next()
        }

        const userId = req.query.userId

        if(undefined === userId || userId === null){
            res.status(400).send({
                error: 'UserId is undefined or null'
            })
            return next()
        }

        var result = userRepo.getUserById(userId)
        result.then(function (data) {
            res.status(200).send(data)
        })
    }


    /**
    * For Inserting Users
    * Checks to see, if the user is authenticated, persists userinfo to users table
    */
    this.insertUser = function(req, res, next){
        if(!req.user){
            res.status(401).send({
                error: 'Authentication failed'
            });
            return next()
        }

        const user = {
            UserName: req.body.UserName,
            Password: req.Password,
            UserId: req.UserId
        }

        const appUser = {
          AppId: req.user.AppId,
          UserId: req.UserId
        }

        validator.validateUIData(user).then(async function(data){
          // case when validation passes
          let isExists = await validator.isExistsUser(userRepo, user.UserName)
          if(isExists){
            res.status(409).send({error : "User Exists"})
            return next()
          }
          console.log('Validation Success')
          var result = userRepo.insertUser(user, appUser)
          //check the result of the query
          result.then(function (isSuccessful) {
              //if passed send 200 with data
              console.log('User Inserted')
              res.status(201).send({message: 'Insert Succeded'})

          }).catch(function(err){
            //if failed send 500 - UnExpected Error
            console.log(err)
            res.status(500).send({error: "Unexpected Error"})
          })
        }).catch(function(err){
          //validation failed.. send the validation errors
          console.log(err)
          console.log('Validation Failure')
          res.status(400).send({error : err})
        })
    }
}


module.exports = exports = usersController;
