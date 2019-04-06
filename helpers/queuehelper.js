var AWS = require('aws-sdk')


class AmazonSQSHelper {
  constructor(log, accessKey, arn, region) {
    this.log = log
    AWS.config.update({
      region: region, //'us-west-2'
      accessKeyId: accessKey.accessKeyId,
      secretAccessKey: accessKey.secretAccessKey
    });
    this.arn = arn
  }

  publishMessage(msg) {
    var params = {
      Message: msg,
      TopicArn: this.arn
    }

    var publishTextPromise = new AWS.SNS({
      apiVersion: '2010-03-31'
    }).publish(params).promise();

    publishTextPromise.then(
      function(data) {
        // this.log.debug(`Message ${params.Message} send sent to the topic ${params.TopicArn}`);
        // this.log.debug("MessageID is " + data.MessageId);
        console.log(`Message ${params.Message} send sent to the topic ${params.TopicArn}`);
        console.log("MessageID is " + data.MessageId);
      }).catch(
      function(err) {
        console.error(err, err.stack);
      });
  }
}

module.exports = exports = AmazonSQSHelper;
