import fs from 'fs';
var Future = Npm.require('fibers/future');


Meteor.methods({
  listImages() {
    var future = new Future();
    fs.readdir(process.env.PWD + "/public/glitchy", (err, files) => {
      if (err) {
        future.return(erro);
      } else {
        future.return(files);
      }
    });
    return future.wait()
  },
});