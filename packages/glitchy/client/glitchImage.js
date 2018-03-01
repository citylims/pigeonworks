import THREE from 'three';
// import glslify from 'glslify';
import { Promise } from 'meteor/promise';

export default class BackgroundImage {
  exp() {
    return new Promise((resolve, reject) => {
      var obj = this.createObj();
      obj.then((res) => {
        if (!res) reject(res);
        console.log(res);
        resolve(res);
      });
    });
  }
  constructor() {
    return new Promise((resolve, reject) => {
      var foo = this.exp();
      foo.then((res) => {
        console.log(res);
        this.uniforms = {
          resolution: {
            type: 'v2',
            value: new THREE.Vector2(document.body.clientWidth, window.innerHeight),
          },
          imageResolution: {
            type: 'v2',
            value: new THREE.Vector2(2048, 1356),
          },
          texture: {
            type: 't',
            value: null,
          },
        };
        this.obj = res;
        if(!res) reject(res);
        this.resize = () => {
          if (this.uniforms) {
            this.uniforms.resolution.value.set(document.body.clientWidth, window.innerHeight);
          }
        }
        this.init = (callback) => {
          const loader = new THREE.TextureLoader();
          loader.load(
            '../img/DeepSpace.png',
            (tex) => {
            this.uniforms.texture.value = tex;
            // this.obj = this.createObj();
            // var obj = this.createObj();
            // console.log(obj)
            // obj.then((mesh) => {
            //   this.obj = mesh;
            //   callback();
            // });
          })
        }
        
        resolve(this);
        
        // console.log(res);
      });
    });
    
    // this.obj = null;
  }
  init(callback) {
    const loader = new THREE.TextureLoader();
    loader.load(
      '../img/DeepSpace.png',
      (tex) => {
      this.uniforms.texture.value = tex;
      // this.obj = this.createObj();
      // var obj = this.createObj();
      // console.log(obj)
      // obj.then((mesh) => {
      //   this.obj = mesh;
      //   callback();
      // });
    })
  }
  createObj() {
    return new Promise((resolve, reject) => { 
      Meteor.call('readGlsl', 'glitchImage.vs', (err, imageShader) => {
        if (err) reject(err);
        // console.log(imageShader);
        Meteor.call('readGlsl', 'glitchImage.fs', (err, imageFrag) => {
          if (err) reject(err);
          var mesh = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(2, 2),
            new THREE.RawShaderMaterial({
              uniforms: this.uniforms,
              // vertexShader: glslify('../glsl/glitchImage.vs'),
              vertexShader: imageShader,
              // fragmentShader: glslify('..//glsl/glitchImage.fs'),
              fragmentShader: imageFrag,
            })
          );
          resolve(mesh);
        });
      });    
    });
  }
  resize() {
    if (this.uniforms) {
      this.uniforms.resolution.value.set(document.body.clientWidth, window.innerHeight);
    }
  }
}