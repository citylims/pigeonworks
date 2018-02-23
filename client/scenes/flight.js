import THREE from 'three';
import { Promise } from 'meteor/promise';
import {TweenMax} from "gsap";
var OrbitControls = require('three-orbit-controls')(THREE)

Template.flight.onRendered(function() {
  $('canvas').remove(); // this should be moved to router level.
  this.planet = new ReactiveVar(false);
  this.time = new ReactiveVar(0.01);
  this.update = new ReactiveVar(false);
  this.mouseDown = new ReactiveVar(false);
  this.activeFont = new ReactiveVar(false);
  this.textObj = new ReactiveVar(false);
  
  this.autorun(() => {
    if (this.update.get()) {
      Meteor.setTimeout(() => {
        this.update.set(false);
      }, 300);
    }
  });

  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
  
  var canvasHeight = window.innerHeight;
  var canvasWidth = window.innerWidth;
  
  var loader = new THREE.TextureLoader();
  loader.setCrossOrigin("*");
  var baseUrl = window.location.href;

  var scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2("#BABABA", 0.0002);

  var camera = new THREE.PerspectiveCamera(75, canvasWidth/canvasHeight, 0.1, 1000);
  camera.lookAt(new THREE.Vector3(0,50,0));
  camera.position.set(0,50,400);

  var fov = camera.fov 
  var zoom = 1.0
  var inc = -1.001;

  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(600, 300, 300);
  spotLight.intensity = .5;
  spotLight.castShadow = true;
  scene.add(spotLight);

  var controls = new OrbitControls(camera);
  controls.damping = 0.2;
  controls.enabled = true;
  controls.maxPolarAngle = Math.PI/2;
  controls.minPolarAngle = 1;
  controls.minDistance = 300;
  controls.maxDistance = 500;
  
  var renderer = new THREE.WebGLRenderer({ alpha: true});
  renderer.setSize(canvasWidth, canvasHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor("black", 1);
  $('body').append(renderer.domElement);

  window.onresize = function() {
    var canvasHeight = window.innerHeight;
    var canvasWidth = window.innerWidth;
    camera.aspect = canvasWidth / canvasHeight;
  }
  
  /* Sky */
  var skyPath = `${baseUrl}DeepSpace.png`;
  loader.load(skyPath, (texture) => {
    var skyGeometry = new THREE.CubeGeometry(800, 800, 1200);
    var skyArray = [];
    for (var i = 0; i < 6; i++) {
      skyArray.push(new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.BackSide
      }));
    }
    var skyMaterial = new THREE.MeshFaceMaterial(skyArray);
    var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
    // scene.add(skyBox); //hiding the skyBox ?
  });
  
  /* Sphere */
  var spherePath = `${baseUrl}plutomap1k.jpg`;
  loader.load(spherePath, (texture) => {
    console.log(texture);
    var geometry = new THREE.SphereGeometry(150, 150, 150);
    var material = new THREE.MeshBasicMaterial({
      map: texture,
      overdraw: 0.5
    });
    var size = 2;
    var sphere = new THREE.Mesh(geometry, material);
    this.planet.set(sphere);
    scene.add(sphere);
  });
  
  //globalize for better init
  var fontLoader = new THREE.FontLoader();
  fontLoader.load( `${baseUrl}/fonts/Bellefair_Regular.typeface.json`,  ( font ) => {
    // console.log(font)
    this.activeFont.set(font);
  });
  
  this.whatYouSay = (face, font, child) => {
    // http://jsfiddle.net/9XGuK/4/
    if (face.a < 10000) {
      var sayin = "top";
    } else if (face.a >= 10000 && face.a < 12000) {
      sayin = "north";
    } else if (face.a >= 12000 && face.a < 14000) {
      sayin = "south";
    } else {
      sayin = "bottom";
    }
  
    if (child) {
      if (child.geometry.parameters.text === sayin) {
        console.log('same sayin');
        return;
      }
    }
    
    var textGeo = new THREE.TextGeometry( sayin, {
      font: font,
      size: 50,
      height: 5,
      curveSegments: 2,
      bevelEnabled: true,
      bevelThickness: 3,
      bevelSize: 2,
      bevelSegments: 2
    });

    var materials = [
      new THREE.MeshPhongMaterial( { color: 'rgb(255, 179, 61)', flatShading: false } ), // front
      new THREE.MeshPhongMaterial( { color: 'rgb(255, 179, 61)' } ) // side
    ];
    var textMesh = new THREE.Mesh( textGeo, materials );
    textMesh.position.set(100, 100, 100);
    this.textObj.set(textMesh);
    return textMesh;
  }

  /* Render Canvas */
  var render = () => {
    animation();
    intersection();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
  
  var onMouseMove = (event) => {
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  }
  
  /* Animations */
  
  var animation = () => {
    scene.rotation.y -= .0005;
    camera.fov = fov * zoom;
    camera.updateProjectionMatrix();
    var sphere = this.planet.get();
    if (sphere) {
      var time = this.time.get();
      time += 0.01;
      //small orbit
      sphere.position.x = 20*Math.cos(time) + 0;
      sphere.position.z = 20*Math.sin(time) + 0;
      this.time.set(time);
    }
  }
  
  
  var intersection = () => {
    if (this.update.get()) return;
    if (this.mouseDown.get()) return;
    // 
    raycaster.setFromCamera( mouse, camera );
    var font = this.activeFont.get();
    var text = this.textObj.get();
    var intersects = raycaster.intersectObjects( scene.children );
    
    if (intersects.length && font) {
      console.log(intersects[0].face.a);
      if (text) {
        _.each(scene.children, (child) => {
          if (child.uuid === text.uuid) {
            
            var textMesh = this.whatYouSay(intersects[0].face, font, child);
            if (textMesh) {
              scene.remove(child);
              this.update.set(true);
              scene.add(textMesh);
            } else {
              console.log('abort');
            }
          }
        });
          
      } else { // create first intance of text -- move this to default visible false and load globally on app load.
        // intersects[0].object.scale.set(0.7,0.7,0.7,0.7);
        this.planet.set(intersects[0].object);
        this.update.set(true);
        var textMesh = this.whatYouSay(intersects[0].face, font);
        scene.add(textMesh);
      }
    } else { // not hovering
      if (this.planet.get()) { // need to remove trailtarget unless i can prove that trails exist?
        // console.log('out');
        var text = this.textObj.get();
        // console.log(text);
        if (text) {
          _.each(scene.children, (child) => { //find the correct obj
            // console.log(child.uuid);
            if (child.uuid === text.uuid) {
              child.visible = false; // set invis
              this.textObj.set(child); // update in template
              var sphere = this.planet.get();
              this.planet.set(sphere);
              // this.textObj.set(false);
              this.update.set(true)
            }
          });
        } 
        //reset sphere to normal scale.
        var sphere = this.planet.get();
        this.planet.set(sphere);
        this.update.set(true)
      }
    }
  }
  
 document.addEventListener( 'mousemove', onMouseMove, false );

  document.body.onmousedown = () => { 
    this.mouseDown.set(true);
  }
  document.body.onmouseup = () => {
    this.mouseDown.set(false)
  }
  render();
});