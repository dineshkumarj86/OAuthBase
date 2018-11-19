const uuidv1 = require('uuid/v1'),
      uuidv3 = require('uuid/v3'), //Generates UUID with namespace (http urls)
      uuidv4 = require('uuid/v4'), //Generates UUID With Random strings
      uuidv5 = require('uuid/v5'); //Generates UUID with namespace (http urls)

class uuidHelper {
  constructor(version) {
    this.version = version
  }

  generateUUID() {
    let uuidGenerated = null
    switch (this.version) {
      case "v1":
        uuidGenerated = uuidv1()
        break;
      case "v3":
        uuidGenerated = uuidv3('users.germaneness.com', uuidv3.DNS);
        break;
      case "v4":
        uuidGenerated = uuidv4()
        break;
      case "v5":
        uuidGenerated = uuidv5('users.germaneness.com', uuidv3.DNS);
        break;
      default:
        break;
    }
		return uuidGenerated;
  }
}

module.exports = exports = uuidHelper