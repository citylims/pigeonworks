import THREE from 'three';
import { Promise } from 'meteor/promise';
import {TweenMax} from "gsap";
var OrbitControls = require('three-orbit-controls')(THREE)

Template.outerverse.onRendered(function() {
  class Stars {
    constructor(props) {
      this.geometry = new THREE.Geometry();
      this.material = new THREE.PointsMaterial({
        color: 0xbbbbbb,
        opacity: 0,
        size: props.size,
        sizeAttenuation: false
      });

      for (let i = 0; i < props.count; i++) {
        var vertex = new THREE.Vector3();
        vertex.x = Math.random() * 2 - 1;
        vertex.y = Math.random() * 2 - 1;
        vertex.z = Math.random() * 2 - 1;
        vertex.multiplyScalar(6000);
        this.geometry.vertices.push(vertex);
      }

      this.mesh = new THREE.Points(this.geometry, this.material);
      this.mesh.scale.set(props.scale.x, props.scale.y, props.scale.z);
    }

    update() {
      this.meshObj.position.y += 20;
    }

    get meshObj() {
      return this.mesh;
    }
  }

  class Planet {
    constructor(props) {
      this.speed = props.speed;
      this.distance = props.distance;
      this.t = 0;

      this.geometry = new THREE.SphereGeometry(props.size, 40, 40);
      this.texture = new THREE.Texture();
      this.loader = new THREE.ImageLoader();

      if (props.texture) {
        thisloader.load(props.texture,
          function (image) {
            this.texture.image = image;
            this.texture.needsUpdate = true;
          },
          function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
          },
          function (xhr) {
            console.log('An error happened');
          }
        );

        this.material = new THREE.MeshPhongMaterial({map: this.texture});

        // if (props.name === 'sun') {
        //     this.material = new THREE.MeshBasicMaterial({map: this.texture});
        // }

      } else {
        this.material = new THREE.MeshNormalMaterial();
      }

      this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.mesh.castShadow = true;
    }

    update() {
      this.meshObj.rotation.y += 0.003;
      this.meshObj.position.y += 20;
      if (this.speed) {
        this.meshObj.position.x = Math.sin(Date.now() * this.speed) * this.distance;
        this.meshObj.position.z = Math.cos(Date.now() * this.speed) * this.distance;
        this.t += Math.PI / 180 * 2;
      }
    }

    get meshObj() {
      return this.mesh;
    }
  }

  class ParticlesSystem {
    constructor(props) {
      this.particleSystem = new THREE.GPUParticleSystem({maxParticles: props.maxParticles});
      this.clock = new THREE.Clock(true);
      this.tick = 0;

      this.settings = {
        position: new THREE.Vector3(),
        positionRandomness: .3,
        velocity: new THREE.Vector3(),
        velocityRandomness: .3,
        color: props.color,
        colorRandomness: 2,
        turbulence: 0,
        lifetime: props.lifetime,
        size: props.size,
        sizeRandomness: 1,
        spawnRate: props.spawnRate,
        horizontalSpeed: props.horizontalSpeed,
        verticalSpeed: props.verticalSpeed,
        distance: props.distance,
        timeScale: 1
      };
    }

    update() {
      let delta = this.clock.getDelta() * this.settings.timeScale;
      this.tick += delta;
      if (delta > 0) {
        this.settings.position.x = Math.sin(Date.now() * this.settings.horizontalSpeed) * this.settings.distance;
        this.settings.position.z = Math.cos(Date.now() * this.settings.verticalSpeed) * this.settings.distance;
        this.settings.position.y += 20;
        for (let i = 0; i < this.settings.spawnRate * delta; i++) {
          this.meshObj.spawnParticle(this.settings);
        }
      }
      this.meshObj.update(this.tick);
    }

    get meshObj() {
      return this.particleSystem;
    }
  }

  class SolarSystem {
    constructor() {
      this.objects = [];
      this.createScene();
    }

    createScene() {
      let width = window.innerWidth;
      let height = window.innerHeight;
      this.move = 0;
      this.radius = 4000;

      this.canvas = document.getElementById('canvas');
      this.canvas.setAttribute('width', width);
      this.canvas.setAttribute('height', height);

      this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000000);

      this.renderer.setClearColor(0x000000);
      this.camera.position.set(0, 0, 1300);
      this.camera.rotation.z = -Math.PI / 20;
      this.scene.add(this.camera);
      this.render();
    }

    render() {
      requestAnimationFrame(()=> {
          this.render();
      });

      this.objects.map((object)=> {
          object.update();
      });

      this.move += 20;
      this.camera.position.x = this.radius * Math.sin(THREE.Math.degToRad(-Date.now() / 60));
      this.camera.position.y = this.radius * Math.sin(THREE.Math.degToRad(Date.now() / 60)) + this.move;
      this.camera.position.z = this.radius * Math.cos(THREE.Math.degToRad(Date.now() / 60));
      this.camera.updateMatrixWorld();
      this.scene.position.y = this.move;
      this.camera.lookAt(this.scene.position);

      this.renderer.render(this.scene, this.camera);
    }

    appendMesh(mesh = []) {
      mesh.map((mesh)=> {
          this.objects.push(mesh);
          this.scene.add(mesh.meshObj);
      });
    }
  }

// document.addEventListener('DOMContentLoaded', function () {
  var app = new SolarSystem();
  app.appendMesh(
    [
      new Stars({
        size: 1,
        count: 1500,
        scale: {
          x: 50,
          y: 50,
          z: 50
        }
      }),
      new Stars({
        size: 2,
        count: 3000,
        scale: {
          x: 10,
          y: 10,
          z: 10
        }
      }),
      new Planet({
        texture: '',
        size: 200,
      }),
      new Planet({
        texture: '',
        size: 30,
        speed: .003,
        distance: -800
      }),
      new ParticlesSystem({
        maxParticles: 5000,
        color: '0xff0000',
        size: 3,
        horizontalSpeed: .003,
        verticalSpeed: .003,
        distance: -800,
        lifetime: 5,
        spawnRate: 100
      }),
      new Planet({
        texture: '',
        size: 30,
        speed: .003,
        distance: 1600
      }),
      new ParticlesSystem({
        maxParticles: 5000,
        color: '0xFF00EC',
        size: 3,
        horizontalSpeed: .003,
        verticalSpeed: .003,
        distance: 1600,
        lifetime: 5,
        spawnRate: 1600
      }),
      new Planet({
        texture: '',
        size: 40,
        speed: .001,
        distance: 2400
      }),
      new ParticlesSystem({
        maxParticles: 10000,
        color: '0x00D1FF',
        size: 3,
        horizontalSpeed: .001,
        verticalSpeed: .001,
        distance: 2400,
        lifetime: 5,
        spawnRate: 2400
      }),
      new Planet({
        texture: '',
        size: 50,
        speed: .001,
        distance: -3200
      }),
      new ParticlesSystem({
        maxParticles: 10000,
        color: '0x001FFF',
        size: 3,
        horizontalSpeed: .001,
        verticalSpeed: .001,
        distance: -3200,
        lifetime: 5,
        spawnRate: 3200
      })
    ]
  )
});