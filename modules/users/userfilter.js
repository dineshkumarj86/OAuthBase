function userFilter(cryptoHelper, uuidGenerator) {
  this.initValues = async function(req, res, next) {
    if (!req.body.hasOwnProperty('Password')) {
      next(new Error('Password is required'))
    }
    if (req.body.Password === null || undefined === req.body.Password) {
      next(new Error('Password cannot be blank'))
    }
    try {
      req.Password = await cryptoHelper.hashPassword(req.body.Password)
			console.log(`Generated Password : ${req.Password}`)
    } catch (err) {
      next(err)
    }
    req.UserId = uuidGenerator.generateUUID()
    next()
  }
}


module.exports = exports = userFilter
