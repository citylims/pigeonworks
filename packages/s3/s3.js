export const name = 's3';
import moment from 'moment';

if (Meteor.isServer) {
  Slingshot.fileRestrictions("myFileUploads", {
    allowedFileTypes: ["image/png", "image/jpeg", "image/gif", "application/pdf"],
    maxSize: null
  });

  Slingshot.createDirective("pigeonUpload", Slingshot.S3Storage, {
    bucket: 'pigeon-works',
    // bucket: Meteor.settings.awsConfig.S3Bucket,
    allowedFileTypes: ["image/png", "image/jpeg", "image/gif", "application/pdf"],
    maxSize: null,
    acl: "public-read",
    AWSAccessKeyId: Meteor.settings.awsConfig.AWSAccessKeyId,
    AWSSecretAccessKey: Meteor.settings.awsConfig.AWSSecretAccessKey,
    authorize: function (file, metaContext) {
      // console.log(metaContext);
      // if (!this.userId) {
      //   throw new Meteor.Error("No User");
      // }
      return true;
    },
    key: function (file, metaContext) {
      // var stampName = new moment().format('HH-MM-SS-MM-DD-YY'); //create filename for ipad camera photo.
      if (!file.name) { //device 
        var stampName = new moment().format('HH-MM-SS-MM-DD-YY'); //create filename for ipad camera photo.
        console.log(stampName);
        file.name = `${stampName}.jpg`;
      }
      var date = new moment().format('MM-DD-YY');
      var path = 'webUploads/' + date+ '/' + file.name;
      return path;
    }
  });
}