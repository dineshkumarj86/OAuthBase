const uuidParse = require('uuid-parse')

function PassportHelper(appRepo, passport, adminAppName) {
    this.setupBasicStrategy = function (BasicStrategy) {
        passport.use(new BasicStrategy(async function (username, password, done) {
            let usernameConverted = uuidParse.unparse(uuidParse.parse(username))
            let passwordConverted = uuidParse.unparse(uuidParse.parse(password))
            var result = await appRepo.getApplicationByAppIdAndSecret(usernameConverted, passwordConverted)
            if(result){
                return done(null, result)
            }
            else{
                return done(null, false)
            }
        }))
    }
}

module.exports = exports = PassportHelper
