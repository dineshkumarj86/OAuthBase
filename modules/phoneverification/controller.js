function PhoneVerificationController(otpHelper){
  this.AuthenticateUsingSMS = function(req, res, next){
    //check for PhoneNumber in query string
    if(!req.query.hasOwnProperty(phoneNumber)){
      res.status(401).send({
        error: 'Authentication failed'
      });
      return next();
    }

    //send SMS to the phone Number
    
  }
}
