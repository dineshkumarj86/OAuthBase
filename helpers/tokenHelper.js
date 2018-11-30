class TokenHelper {
  constructor(tokenRepo, jwtlib, JWT_Secret, userRepo, subjectIssuer, audience) {
    this.tokenRepo = tokenRepo
    this.jwtlib = jwtlib
    this.JWT_Secret = JWT_Secret
    this.userRepo = userRepo
    this.subjectIssuer = subjectIssuer
    this.audience = audience
  }

  async handle(app, user = null) {
    console.log('Inside Handle Method')
    //It is Client Credentials
    if (!user.hasOwnProperty('username')) {
      console.log('Client Credentials Authorization')
      try {
        let token = await this.tokenRepo.getAppAccessToken(app.AppId)
        if (token.length <= 0) {
          console.log('Token Is Not there. So Generate, a new token')
          return generateAppToken(app.AppId, this.subjectIssuer, this.audience, this.jwtlib, this.JWT_Secret, this.tokenRepo)
        }
        var decoded = this.jwtlib.verify(token[0].Access_Token, this.JWT_Secret);
        if (decoded.exp <= decoded.iat) {
          return generateAppToken(app.AppId, this.subjectIssuer, this.audience, this.jwtlib, this.JWT_Secret, this.tokenRepo)
        }
        return token[0]
      } catch (err) {
        console.log(err)
        return null;
      }
    }

    //Resource Owner Credentials
    else {
      console.log('Resource Owner Authorization')
      try {
        let userId = await this.userRepo.getUserIdByEmail(user.username)
        if (userId.length > 0) {
          // console.log(this.jwtlib)
          var userIdentity = userId[0].UserId
          let token = await this.tokenRepo.getUserAccessToken(userIdentity, app.AppId)
          console.log(token)
          if (token.length <= 0) {
            console.log('Token Is Not there. So Generate, a new User token')
            return generateUserToken(app.AppId, userIdentity, this.subjectIssuer, this.audience, this.jwtlib,
              this.JWT_Secret, this.tokenRepo)
          }
          console.log('Token Got Sucessfully, Going to verify Token')
          try{
              var isVerified = this.jwtlib.verify(token[0].Access_Token, this.JWT_Secret)
          }
          catch(error){
            return generateUserToken(app.AppId, userIdentity, this.subjectIssuer, this.audience, this.jwtlib,
                this.JWT_Secret, this.tokenRepo);
          }
          return token[0];
        }
        return null;
      } catch (err) {
        console.log(err)
        return null;
      }

    }
  }
}

async function generateUserToken(appId, userId, iss, aud, jwtlib, JWT_Secret, tokenRepo) {
  let iat = Math.floor(Date.now() / 1000)
  console.log(`Iat ${iat}`)
  let exp = Math.floor((Date.now() + 3600000)/1000)
  console.log(`Expiry ${exp}`)
  let new_token = {
    "sub": userId,
    "iss": iss,
    "isAppToken": false,
    "iat": iat,
    "aud": aud,
    "exp": exp // calculated for 1 hour in ms
  }
  console.log(`New Token: ${new_token}`)
  console.log(jwtlib)
  const token = jwtlib.sign(new_token, JWT_Secret)
  console.log(token)
  let oAuth_Token = {
    isAppToken: 0,
    Access_Token: token,
    AppId: appId,
    UserId: userId
  }
  console.log(oAuth_Token)
  try {
    var result = await tokenRepo.insertAppToken(oAuth_Token)
    return oAuth_Token
  } catch (err) {
    console.log(err)
    return null;
  }
}

async function generateAppToken(appId, iss, aud, jwtlib, JWT_Secret, tokenRepo) {
  console.log('Entered AppToken Generation')

  let iat = Math.floor(Date.now() / 1000)
  let exp = Math.floor((iat + 3600000)/1000)
  console.log(`Expiry ${exp}`)
  let new_token = {
    "sub": appId,
    "iss": iss,
    "isAppToken": true,
    "iat": iat,
    "aud": aud,
    "exp": exp // calculated for 1 hour in ms
  }
  console.log(new_token)
  console.log(JWT_Secret)
  const token = jwtlib.sign(new_token, JWT_Secret)
  console.log(token)
  let oAuth_Token = {
    isAppToken: 1,
    Access_Token: token,
    AppId: appId,
    UserId: null
  }
  console.log(oAuth_Token)
  try {
    var result = await tokenRepo.insertAppToken(oAuth_Token)
    return oAuth_Token
  } catch (err) {
    console.log(err)
    return null;
  }
}


module.exports = exports = TokenHelper
