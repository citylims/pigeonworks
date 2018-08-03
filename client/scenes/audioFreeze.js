import THREE from 'three';
import p5 from 'p5';
import "p5/lib/addons/p5.sound";

Template.audioFreeze.onCreated(function() {
  this.audioSketch = new ReactiveVar(false);  
  this.randColor = new ReactiveVar(255);
  this.drawSize = new ReactiveVar(20);

  Meteor.setInterval(() => {
    var color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    this.randColor.set(color)
  }, 1000);
  
  this.drawArrowVector = (v, loc, scale, p) => {
    p.push();
    var arrowsize = 4;
    p.translate(loc.x,loc.y);
    p.stroke(255);
    p.rotate(v.heading());

    var len = v.mag() * scale;
    p.line(0,0,len,0);
    p.line(len,0,len-arrowsize,+arrowsize/2);
    p.line(len,0,len-arrowsize,-arrowsize/2);
    p.pop();
  }
});

Template.audioFreeze.helpers({});

Template.audioFreeze.events({});

Template.audioFreeze.onRendered(function() {
  var inst = Template.instance();
  
  var s = function(p) {

    var song, cnv, amp, smokeTexture,  ps; 
    var history = [];
    
    p.preload = function() {
      song = p.loadSound('/audio/Poisonous-Gas.mp3')
      smokeTexture = p.loadImage("/Smoke.png");
    }
    
    p.setup = function() {  
      cnv = p.createCanvas(window.innerWidth, window.innerHeight);
      smokeTexture.resize(inst.drawSize.get(), inst.drawSize.get());
      // p.resize(smokeTexture)
      ps = new SmokeSystem(0,p.createVector(p.width / 2, p.height / 2), smokeTexture);
      amp = new p5.Amplitude;
      if (!song.isPlaying()) {
        song.play();
      }
      cnv.mouseClicked(function() {
        song.isPlaying() ? song.stop() : song.play();
      });
    }
    p.draw = function() {
      p.background(0);
      // if (!ps) {
      //   ps = new SmokeSystem(0,p.createVector(p.width / 2, p.height / 2), smokeTexture);
      //   console.log("rtes")
      // }
      // if (inst.drawSize.get() !== smokeTexture.height) {
      //   console.log("no mathc")
      // }
      //smoke
      var dx = p.map(p.mouseX,0,p.width,-0.2,0.2);
      var wind = p.createVector(dx,0);
      ps.applyForce(wind);
      ps.run();
      for (var i = 0; i < 2; i++) {
        ps.addParticle();
      }
      // Draw an arrow representing the wind force
      inst.drawArrowVector(wind, p.createVector(p.width/2,50,0),window.innerWidth, p);

      var randColor = inst.randColor.get();      
      p.fill(randColor);
      var level = amp.getLevel();
      //pulse
      var size = p.map(level, 0, 1, 0, 200);
      // console.log(size);
      inst.drawSize.set(size);
      p.ellipse(p.width/2, p.height/2, size, size);
      //graph
      history.push(level);
      p.stroke(randColor);
      p.noFill();
      p.beginShape();
      for (var i = 0; i < history.length; i++) {
        var y = p.map(history[i], 0, 1, p.height, 0)
        p.vertex(i, y);
      }
      p.endShape();
      if (history.length > p.width) {
        history.splice(0, 1);
      }
    }
    //========= PARTICLE SYSTEM ===========
    var SmokeSystem = function(num,v,img_) {
        this.particles = [];
        this.origin = v.copy(); // we make sure to copy the vector value in case we accidentally mutate the original by accident
        this.img = img_
        for(var i = 0; i < num; ++i){
          this.particles.push(new Particle(this.origin,this.img));
        }
    };

    SmokeSystem.prototype.run = function() {
        var len = this.particles.length;
        //loop through and run particles
        for (var i = len - 1; i >= 0; i--) {
            var particle = this.particles[i];
            particle.run();
            // if the particle is dead, we remove it.
            if (particle.isDead()) {
                this.particles.splice(i,1);
            }
        }
    }

    SmokeSystem.prototype.applyForce = function(dir) {
      var len = this.particles.length;
      for(var i = 0; i < len; ++i){
        this.particles[i].applyForce(dir);
      }
    }

    
      // Adds a new particle to the system at the origin of the system and with
      // the originally set texture.
    SmokeSystem.prototype.addParticle = function() {
      this.particles.push(new Particle(this.origin,this.img));
    }

    var Particle = function (pos, img_) {
      this.loc = pos.copy();

      var vx = p.randomGaussian() * 0.3;
      var vy = p.randomGaussian() * 0.3 - 1.0;

      this.vel = p.createVector(vx,vy);
      this.acc = p.createVector();
      this.lifespan = 100.0;
      this.texture = img_;
    }

    Particle.prototype.run = function() {
      this.update();
      this.render();
    }
    
    Particle.prototype.render = function() {
      p.imageMode(p.CENTER);
      p.tint(255,this.lifespan);
      p.image(this.texture,this.loc.x,this.loc.y);
    }

    Particle.prototype.applyForce = function(f) {
      this.acc.add(f);
    }
    
    Particle.prototype.isDead = function () {
      if (this.lifespan <= 0.0) {
        return true;
      } else {
        return false;
      }
    }

    Particle.prototype.update = function() {
      this.vel.add(this.acc);
      this.loc.add(this.vel);
      this.lifespan -= 2.5;
        // this.acc.mult(0);
    }  
  }
  var sketch = new p5(s, 'audioFreeze');
  inst.audioSketch.set(sketch);
});