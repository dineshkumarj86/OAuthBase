var AWS = require('aws-sdk');

class EmailHelper{
  constructor(log, accessKey, region, fromEmail){
    this.log = log
    AWS.config.update({
      region: region, //'us-west-2'
      accessKeyId: accessKey.accessKeyId,
      secretAccessKey: accessKey.secretAccessKey
    });
    this.fromEmail = fromEmail
  }

  sendEmail(toEmail, subject, body){
    console.log('fromEmail :' + this.fromEmail);
    console.log('Body :' + body)
    console.log('subject :' + subject)
    console.log(`To Email ${toEmail}`)

    var params = {
      Destination: {
        ToAddresses: [toEmail]
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: body
           },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject
         }
      },
      Source: this.fromEmail,
      ReplyToAddresses:[this.fromEmail],
      
    };
    new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise().then(function(data){
      console.log('Email Sent')
    }).catch(function(err){
      console.log(err);
    });
  }
}

module.exports = exports = EmailHelper;