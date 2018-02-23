import THREE from 'three';
import { Promise } from 'meteor/promise';
import {TweenMax} from "gsap";
var OrbitControls = require('three-orbit-controls')(THREE)

Template.creationMyth.onRendered(function() {
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
  // var space = "#151718";
  var galaxies = 2;

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

  function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  function Particles(num) {
    this.particleArray = []    
    for (var i = 0; i < num; i++) {
      var c = getRandomColor();
      var o = Math.floor(Math.random() * (100 - 0 + 1)) / 100;
      var s = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
      var particleCount = Math.floor(Math.random() * (1000 - 250 + 1)) + 250;
      var particle = {
        color: c,
        opacity: o,
        size: s,
        number: particleCount
      }
      this.particleArray.push(particle);
    }
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

  function ParticleMaterial(c, s, o, t) {
    this.material = new THREE.PointsMaterial({
      color: c,
      size: s,
      transparent: true,
      opacity: o,
      map: t
    });
  }

  function ParticleSystem(number) {
    this.particles = new THREE.Geometry();
    for (var i = 0; i < number; i++) {
      var x = (Math.random() - 0.5) * 2000;
      var y = (Math.random() - 0.5) * 2000;
      var z = (Math.random() - 0.5) * 2000;
      this.particles.vertices.push(new THREE.Vector3(x, y, z));
    }
  };

  function ParticleUniverse(particles) {
    return new Promise((resolve, reject) => {
      var galaxies = [];
      var pArr = particles.particleArray;
      var texture = getTexture();
      texture.then((res,err) => {
        if (res) {
          var texture = res
          for (var i = 0; i < pArr.length; i++) {
            var customParticle = new ParticleMaterial(pArr[i].color, pArr[i].size, pArr[i].opacity, texture);
            var pMaterial = customParticle.material;
            var customSystem = new ParticleSystem(pArr[i].number);
            var pSystem = customSystem.particles;
            var pObject = {
              material: pMaterial,
              system: pSystem
            };
            galaxies.push(pObject);
          }
          if (galaxies.length) {
            resolve(galaxies);
          } else {
            reject('whoops');
          }
        }
      });
    });
  }

  var particles = new Particles(galaxies);
  // console.log(particles);
  ParticleUniverse(particles).then((res,err) => {
    var universe = [];
    for (var i = 0; i < res.length; i++) {
      var galaxy = new THREE.Points(res[i].system, res[i].material);
      universe.push(galaxy);
      scene.add(galaxy);
    }
    this.universe.set(universe);
  });

  //* Terrain *//  
  function genesisDevice() {
    this.geometry =  new THREE.PlaneGeometry(canvasWidth * 2, canvasHeight * 2, 128,128);
    this.material = new THREE.MeshLambertMaterial({
      color: mainColor
      // color: "#01B9D1" 
    });
    this.wireMaterial = new THREE.MeshLambertMaterial({
      color: "#FFFFFF",
      wireframe: true,
      transparent: true
    });
    this.inception = function() {
      //plot terrain vertices
      for (var i = 0; i < this.geometry.vertices.length; i++) {
        if (i % 2 === 0 || i % 3 === 0 || i % 7 === 0) {
          var num = Math.floor(Math.random() * (30 - 20 + 1)) + 20;
          this.geometry.vertices[i].z = Math.random() * num;
        }
      }
      //define terrain model
      this.terrain = new THREE.Mesh(this.geometry, this.material);
      this.terrain.rotation.x = -Math.PI/2;
      this.terrain.position.y = -20;
      this.terrain.recieveShadow = true;
      this.terrain.castShadow = true;
      //define wireframe model
      this.wire = new THREE.Mesh(this.geometry, this.wireMaterial);
      this.wire.rotation.x = -Math.PI/2;
      this.wire.position.y = -19.8;
      scene.add(this.terrain, this.wire);
      // console.log(this.terrain);
      return this;
    }
    this.inception();
  }
  //generate the terrain obj
  var terrain = genesisDevice(); //adds to scene - weird pattern. 
  
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