function applicationFilter(uuidGenerator) {
  this.fillUUID = function(req, res, next) {
    req.AppId = uuidGenerator.generateUUID()
    req.AppSecret = uuidGenerator.generateUUID()
    next()
  }
}

module.exports = exports = applicationFilter;