import glslify from 'glslify';
import fs from 'fs';
import { Promise } from 'meteor/promise';


// afunction reading() {
//   fs.readFile(process.env.PWD + '/packages/glitchy/private/glsl/' + fileName, 'utf8', function (err, data) {
//     if (err) {
//       console.log('Error: ' + err);
//       reject(err);
//       return;
//     } else{
//       console.log('Parsing Data Started');
//       resolver(data);
//       return data;
//     }
//   });
// }

// async function readFile() {
//    const res0 = await somePromisedAsyncFunction();
//    const res1 = await anotherPromisedAsyncFunction(res0);
//    return res1;
// }

Meteor.methods({
  async readGlsl(fileName) {
    await fs.readFile(process.env.PWD + '/packages/glitchy/private/glsl/' + fileName, 'utf8', function (err, data) {
      if (err) {
        console.log('Error: ' + err);
        return;
      } else{
        console.log('Parsing Data Started');
        var foo = glslify(`${data}`);
        // resolver(data);
        return data;
      }
    });
  }
});

// Shaders = {};

// Meteor.call
// Assets.getText('glitchEffect.vs', function(res) {
//   console.log(res);
//   Shaders.effectShader = glslify(res);
// });
// Assets.getText('glitchEffect.fs', function(res) {
//   console.log(res);
//   Shaders.effectFragShader = glslify(res);
// });
// Assets.getText('glitchImage.vs', function(res) {
//   console.log(res);
//   Shaders.imageShader = glslify(res);
// });
// Assets.getText('glitchImage.fs', function(res) {
//   console.log(res);
//   Shaders.imageFragShader = glslify(res);
// });


// var effectShader = glslify('../glsl/glitchEffect.vs');
// var effectFragShader = glslify('../glsl/glitchEffect.fs');
// var imageShader = glslify('../glsl/glitchImage.vs');
// var imageFragShader = glslify('../glsl/glitchImage.fs');

