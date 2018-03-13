import glslify from 'glslify';
import fs from 'fs';
import { Promise } from 'meteor/promise';
var Future = Npm.require('fibers/future');

Meteor.methods({
  fetchGlsl(fileName) {
    var future = new Future();
    fs.readFile(process.env.PWD + '/packages/glitchy/private/glsl/' + fileName, 'utf8', function (err, data) {
      if (err) {
        future.return(error)
      } else{
        var shader = glslify(`${data}`);
        future.return(shader);
      }
    });
    return future.wait();
  },
});

