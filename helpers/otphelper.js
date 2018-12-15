class OtpHelper{
  constructor(nDigits){
    this.values = [0,1,2,3,4,5,6,7,8,9];
    this.nDigits = nDigits
  }

  generateOTP(){
    for(let i = (this.nDigits+1); i>0; i--){
      let random_index = Math.random() * i
      let shuffled_digits=shuffled_digits.concat(this.values[random_index].toString())
      return shuffled_digits
    }
  }
}
module.exports = exports = OtpHelper
