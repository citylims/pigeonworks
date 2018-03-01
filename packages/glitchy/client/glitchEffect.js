import THREE from 'three';
import { Promise } from 'meteor/promise';
// import glslify from 'glslify';

export default class PostEffect {
  exp(uniforms) {
    return new Promise((resolve, reject) => {
      var obj = this.createObj(uniforms);
      obj.then((res) => {
        if (!res) reject(res);
        console.log(res);
        resolve(res);
      });
    });
  }
  constructor(texture) {
    return new Promise((resolve, reject) => {
      this.uniforms = {
        time: {
          type: 'f',
          value: 0
        },
        resolution: {
          type: 'v2',
          value: new THREE.Vector2(document.body.clientWidth, window.innerHeight)
        },
        texture: {
          type: 't',
          value: texture,
        },
      };
      var foo = this.exp(this.uniforms);
      foo.then((res) => {
        if (!res) reject(res);
        this.obj = res;
        
        // console.log(res);
        this.render = (time) => {
          if (this.uniforms) {
            this.uniforms.time.value += time;
          }
        }
        this.resize = () => {
          if (this.uniforms) {
            this.uniforms.resolution.value.set(document.body.clientWidth, window.innerHeight);
          }
        }
        resolve(this);
      });
    });
  }
  createObj(uniforms) {
    return new Promise((resolve, reject) => { 
      
      var foo = Meteor.call('readGlsl', 'glitchEffect.vs');
      console.log(foo);
      
      Meteor.call('readGlsl', 'glitchEffect.vs', (effectShader, err) => {
        console.log(effectShader)
        console.log(err)
        if (err) reject(err);
        // console.log(res);
        Meteor.call('readGlsl', 'glitchEffect.fs', (effectFrag, err) => {
          console.log(err);
          if (err) reject(err);
          console.log('runnin')
          console.log(effectFrag);
          var mesh = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(2, 2),
            new THREE.RawShaderMaterial({
              uniforms: uniforms,
              // vertexShader: glslify('../glsl/glitchEffect.vs'),
              vertexShader: effectShader,
              // fragmentShader: glslify('../glsl/glitchEffect.fs'),
              fragmentShader: effectFrag,
            })
          );
          resolve(mesh);
        });
      });
    })
    
    // return new THREE.Mesh(
    //   new THREE.PlaneBufferGeometry(2, 2),
    //   new THREE.RawShaderMaterial({
    //     uniforms: this.uniforms,
    //     // vertexShader: glslify('../glsl/glitchEffect.vs'),
    //     vertexShader: Shaders.effectShader,
    //     // fragmentShader: glslify('../glsl/glitchEffect.fs'),
    //     fragmentShader: Shaders.effectFragShader,
    //   })
    // );
  }
  render(time) {
    if (this.uniforms) {
      this.uniforms.time.value += time;
    }
  }
  resize() {
    if (this.uniforms) {
      this.uniforms.resolution.value.set(document.body.clientWidth, window.innerHeight);
    }
  }
}