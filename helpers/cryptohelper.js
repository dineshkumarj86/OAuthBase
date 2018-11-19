class cryptoHelper {
  constructor(cryptoLib, rounds) {
    this.cryptoLib = cryptoLib
    this.rounds = rounds
  }

  async hashPassword(passwordToHash) {
    let hashed = await this.cryptoLib.hash(passwordToHash, this.rounds)
    return hashed
  }

  async comparePassword(original, hashed) {
    console.log('Inside Compare Password')
    try {
      let isEqual = await this.cryptoLib.compareSync(original, hashed)
      console.log(`isEqual: ${isEqual}`)
      return isEqual;
    } catch (err) {
      return false
    }
  }
}


module.exports = exports = cryptoHelper
