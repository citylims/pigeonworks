import glslify from 'glslify';
import fs from 'fs';
import { Promise } from 'meteor/promise';
var Future = Npm.require('fibers/future');

Meteor.methods({
  fetchGlsl(fileName) {
    var future = new Future();
    console.log(future);
    fs.readFile(process.env.PWD + '/packages/glitchy/private/glsl/' + fileName, 'utf8', function (err, data) {
      if (err) {
        future.return(error)
      } else{
        console.log('Parsing Data Started');
        var shader = glslify(`${data}`);
        future.return(shader);
      }
    });
    return future.wait();
  },
});

