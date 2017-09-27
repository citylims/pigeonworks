import THREE from 'three';
import { Promise } from 'meteor/promise';
var OrbitControls = require('three-orbit-controls')(THREE)


Template.creationMyth.onRendered(function() {
  $(document).ready(function($) {
    var mainColor = "#333333";
    var canvasHeight = window.innerHeight;
    var canvasWidth = window.innerWidth;
    
    var loader = new THREE.TextureLoader();
    loader.setCrossOrigin("*");
    var baseUrl = window.location.href;
    var space = "#151718";
    var galaxies = 25;

    var scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2("#BABABA", 0.0002);

    var camera = new THREE.PerspectiveCamera(75, canvasWidth/canvasHeight, 0.1, 1000);
    camera.lookAt(new THREE.Vector3(0,50,0));
    camera.position.set(0,50,400);

    var fov = camera.fov, zoom = 1.0, inc = -1.001;

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
    
      //particle objects
      // THREE.ImageUtils.crossOrigin = true;

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
        var y = (Math.random() - 0.5) * 1100;
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

    function createUniverse(universe) {
      var galaxies = universe.galaxies;
      for (var i = 0; i < galaxies.length; i++) {
        var galaxy = new THREE.Points(galaxies[i].system, galaxies[i].material);
        scene.add(galaxy);
      }
    };

    var particles = new Particles(galaxies);
    ParticleUniverse(particles).then((res,err) => {
      for (var i = 0; i < res.length; i++) {
        var galaxy = new THREE.Points(res[i].system, res[i].material);
        scene.add(galaxy);
      }
    });
      
    //* Terrain *//
      
    function genesisDevice() {

      this.geometry =  new THREE.PlaneGeometry(canvasWidth * 2, canvasHeight * 2, 128,128);

      this.material = new THREE.MeshLambertMaterial({
        color: mainColor
      });

      this.wireMaterial = new THREE.MeshLambertMaterial({
        color: "#FFFFFF",
        wireframe: true,
        transparent: true
      })

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

        this.wire = new THREE.Mesh(this.geometry, this.wireMaterial);
        this.wire.rotation.x = -Math.PI/2;
        this.wire.position.y = -19.8;

        scene.add(this.terrain, this.wire);
        return this;
      }

      this.inception();
    }
    
    var terrain = genesisDevice();
    
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
      scene.add(skyBox);
    });
    
    /* Sphere */
    var spherePath = `${baseUrl}plutomap1k.jpg`;
    loader.load(spherePath, (texture) => {
      var geometry = new THREE.SphereGeometry(150, 150, 150);
      var material = new THREE.MeshBasicMaterial({
        map: texture,
        overdraw: 0.5
      });
      var sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);
    });

  
  /* Render Canvas */
    var render = function() {
      requestAnimationFrame(render);
      animation();
      renderer.render(scene, camera);
    }
    //animations
    function animation() {
      scene.rotation.y -= .0005;
      camera.fov = fov * zoom;
      camera.updateProjectionMatrix();
      // zoom += inc;
      // if (zoom <= 0.2 || zoom >= 1.0) {
      //   inc = +inc;
      // }
    }

    render();
  });

});