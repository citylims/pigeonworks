import THREE from 'three';
import { Promise } from 'meteor/promise';
import {TweenMax} from "gsap";
var OrbitControls = require('three-orbit-controls')(THREE)

Template.flight.onRendered(function() {
  $('canvas').remove(); // this should be moved to router level.
  this.universe = new ReactiveVar(false);
  
  this.getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  var mainColor = "#333333";
  var canvasHeight = window.innerHeight;
  var canvasWidth = window.innerWidth;
  
  var loader = new THREE.TextureLoader();
  loader.setCrossOrigin("*");
  var baseUrl = window.location.href;
  var space = "#151718";
  var galaxies = 8;

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
  
  var getTexture = () => {
    return new Promise((resolve, reject) => {
      var path = `${baseUrl}gradient.png`
      loader.load(path, (texture) => {
        resolve(texture);
      }, function(a) {
        reject(a)
      })
    });
  };
  
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
    var sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
  });

  /* Render Canvas */
  var render = () => {
    requestAnimationFrame(render);
    animation();
    renderer.render(scene, camera);
  }
  
  /* Animations */
  var animation = () => {
    scene.rotation.y -= .0005;
    camera.fov = fov * zoom;
    camera.updateProjectionMatrix();
    var universe = this.universe.get();
    for (var i = 0; i < universe.length; i++) {
      var starSystem = universe[i];
      var starCount = starSystem.geometry.vertices.length;
      while (starCount--) {
        // var randX = this.getRandomInt(10);
        // var randY = this.getRandomInt(15);
        //hardcode some uglyness per playing with speed an direction.
        //speed = distance
        var randX = 1
        var randY = 1 
        var particle = starSystem.geometry.vertices[starCount]
        if (particle.y < 5) {
          // console.log(particle.y)
          particle.rebound = "up";
          particle.y = particle.y + randY; 
        } else if (particle.y > 295) {
          particle.rebound = "down";
          particle.y = (particle.y - randY);
        } else if (particle.rebound === "up") {
          particle.y = (particle.y + randY);
        } else if (particle.rebound === "down") {
          // console.log(particle.y);
          particle.y = (particle.y - randY);
        } else {
          particle.y = (particle.y - randY);
        }
        ///
        if (particle.x < -1000) {//limit --- need to pull these values dynamically.
          particle.reboundX = "right";
          particle.x = (particle.x + randX)
        } else if ( particle.x > 600) {
          particle.reboundX = "left";
          particle.x = (particle.x - randX)
        } else if (particle.reboundX === "right") {
          particle.x = (particle.x + randX)
        } else if (particle.reboundX === "left") {
          particle.x = (particle.x - randX)
        } else {
          particle.x = (particle.x - randX)
        }    
      }
      this.universe.set(universe); //reset the universe obj
      starSystem.geometry.verticesNeedUpdate = true;
    }
    //play with camera      
    // zoom += inc;
    // if (zoom <= 0.2 || zoom >= 1.0) {
    //   inc = +inc;
    // }
  }
  
  render();
});