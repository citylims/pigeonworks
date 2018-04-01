import THREE from 'three';
import { Promise } from 'meteor/promise';
import GlitchImage from './glitchImage.js';
import GlitchEffect from './glitchEffect.js';


Template.glitchy.onCreated(function() {
  this.loadedImage = new ReactiveVar(false)
  this.loadedEffect = new ReactiveVar(false)
  this.activeScene = new ReactiveVar(false);
});

Template.glitchy.events({
  'click [data-action="restart"]': function(e,t) {
    console.log(e);
    t.loadedImage.set(false);
    t.loadedEffect.set(false);
    if (t.activeScene.get()) {
      let scene = t.activeScene.get();
      while(scene.children.length > 0){ 
        scene.remove(scene.children[0]); 
      }
    }
    t.createGlitch();
  }
});

Template.glitchy.onRendered(function() {
  var inst = Template.instance();
  
  this.createGlitch = () => {
    GlitchImage.createImage().then(function(res) {
      inst.loadedImage.set(res);
    });

    GlitchEffect.createEffect(renderBack1.texture).then(function(res) {
      inst.loadedEffect.set(res);
    });
  }

  const canvas = document.getElementById('glitchyCanvas');
  const renderer = new THREE.WebGLRenderer({
    antialias: false,
    canvas: canvas,
  });
  const renderBack1 = new THREE.WebGLRenderTarget(document.body.clientWidth, window.innerHeight);
  const scene = new THREE.Scene();
  const sceneBack = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const cameraBack = new THREE.PerspectiveCamera(45, document.body.clientWidth / window.innerHeight, 1, 10000);
  const clock = new THREE.Clock();
  const resizeWindow = () => {
    canvas.width = document.body.clientWidth;
    canvas.height = window.innerHeight;
    cameraBack.aspect = document.body.clientWidth / window.innerHeight;
    cameraBack.updateProjectionMatrix();
    // img.resize();
    // effect.resize();
    renderBack1.setSize(document.body.clientWidth, window.innerHeight);
    renderer.setSize(document.body.clientWidth, window.innerHeight);
  }
  const render = () => {
    const time = clock.getDelta();
    renderer.render(sceneBack, cameraBack, renderBack1);
    var effect = inst.loadedEffect.get();
    if (effect) {
      effect.render(time);
    }
    renderer.render(scene, camera);
  }
  const renderLoop = () => {
    render();
    requestAnimationFrame(renderLoop);
  }
  // 
  // const vectorTouchStart = new THREE.Vector2();
  // const vectorTouchMove = new THREE.Vector2();
  // const vectorTouchEnd = new THREE.Vector2();
  // let isDrag = false;
  
  inst.autorun(() => {
    if (inst.loadedImage.get() && inst.loadedEffect.get()) {
      renderer.setSize(document.body.clientWidth, window.innerHeight);
      renderer.setClearColor(0x555555, 1.0);
      cameraBack.position.set(1000, 1000, 1000);
      cameraBack.lookAt(new THREE.Vector3());
      var img = this.loadedImage.get()
      var effect = this.loadedEffect.get()
      sceneBack.add(img.mesh);
      scene.add(effect.mesh);
      inst.activeScene.set(scene);
      // on();
      renderLoop();
    }
  });
  //call inital glitch
  this.createGlitch();
});


