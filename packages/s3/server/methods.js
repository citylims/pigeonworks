import s3ls from 's3-ls';
import AWS from 'aws-sdk';
var Future = Npm.require('fibers/future');

AWS.config.update({
   accessKeyId: Meteor.settings.awsConfig.AWSAccessKeyId,
   secretAccessKey: Meteor.settings.awsConfig.AWSSecretAccessKey
});

const s3Route = 'https://s3.amazonaws.com/pigeon-works/'

Meteor.methods({
  listS3Images() {
    var fut = new Future();
    var list = s3ls({bucket: 'pigeon-works'});
    list.ls('/glitchy').then((data) => {
      var links = _.map(data.files, (f) => {
        return `${s3Route}${f}`;
      });
      fut.return(links);
    });
    return fut.wait();
  },
});