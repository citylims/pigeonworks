import THREE from 'three';
import p5 from 'p5';
import "p5/lib/addons/p5.sound";
/*
TODO
Add WASD controls for circleboi
Add Circle dance beat.
Add flying toaster boxes?
Make things get progressively loco crazy.
Pre-analyze audio for bpm/peak.
Endless sidescroll background.
Set loop/delay.
Waveform navigation.
Smoke rise out of frame instead of lifespan, lifespan can control alpha?
gutter options
*/

Template.audioFreeze.onCreated(function() {
  this.audioSketch = new ReactiveVar(false);  
  this.randColor = new ReactiveVar(255);
  this.drawSize = new ReactiveVar(20);
  this.manipulateRate = new ReactiveVar(false);
  this.saveRate = new ReactiveVar(false);
  this.savePos = new ReactiveVar(false);
  this.startingRate = new ReactiveVar(false);
  this.pInst =new ReactiveVar(false);
  this.isDancing = new ReactiveVar(false);
  this.danceStep = new ReactiveVar(false);
  this.enableDance = new ReactiveVar(false);
  this.expandGutter = new ReactiveVar(false);
  this.enableFollow = new ReactiveVar(false);
  this.enableDelay = new ReactiveVar(false);
  this.playlist = new ReactiveVar(['/audio/Li-Lo.mp3', '/audio/Poisonous-Gas.mp3'])
  this.song = new ReactiveVar(false);

  Meteor.setInterval(() => {
    var color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    this.randColor.set(color)
  }, 1000);
  
  this.autorun(() => {
    if (!this.expandGutter.get()) {
      console.log('close');
      // $('#gutter').removeClass('expand');
      // $('#gutter').velocity('transition.bounceDownOut', {duration: 500});
    	$('#gutter').animate({height: '20px'}, {duration: 250});
          // transform: rotate(180deg) scale(0.4);
    } else {
      console.log('open');
      $('#gutter').animate({height: '70px'}, {duration: 250,});
    }
  });
  
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
  
  this.checkSpeed = (song, p) => {
    if (!this.startingRate.get()) {
      
      var speed = p.map(p.width /2 , 0.1, p.width, 0, 2);
      console.log('set');
    } else {
      speed = p.map(p.mouseX, 0.1, p.width, 0, 2);
    }
    return p.constrain(speed, 0.6, 1.3);
  }
  
  this.applyPlaybackRate = (song, p) => {
    // console.log($(":hover"));
    if (this.manipulateRate.get() && !this.saveRate.get()) {
      if ($(':hover').attr('id') === 'gutter') {
        console.log('hovering');
      }
      var speed = this.checkSpeed(song, p)
      this.manipulateRate.set(speed);
      // song.rate(speed);
      
    } else if (this.manipulateRate.get() && this.saveRate.get()) {
      song.rate(this.saveRate.get());
    }  
    else if (!this.manipulateRate.get() && this.startingRate.get()) {
      // console.log('ay');
      song.rate(this.startingRate.get())
    }
  }
  
  this.applyDelay = (song, delay, p ) => {
    delay.process(song, .12, .2, 400);
  }
  this.stopDelay = (song, delay, p ) => {
    delay.process(song, 0, 0, 0);
  }
  
  this.randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
});

Template.audioFreeze.helpers({
  manipulateRate() {
    return Template.instance().manipulateRate.get();
  },
  gutterExpand() {
    return Template.instance().expandGutter.get();
  },
  saveRate() {
    return Template.instance().saveRate.get();
  },
  enableDance() {
    return Template.instance().enableDance.get();
  },
  enableFollow() {
    return Template.instance().enableFollow.get();
  },
  enableDelay() {
    return Template.instance().enableDelay.get();
  }
});

Template.audioFreeze.events({
  'click [data-action="manipulateRate"]': function() {
    Template.instance().saveRate.set(false);
    Template.instance().manipulateRate.set(!Template.instance().manipulateRate.get());
  },
  'click [data-action="expandGutter"]': function() {
    Template.instance().expandGutter.set(!Template.instance().expandGutter.get());
  },
  'click [data-action="dance"]': function() {
    Template.instance().enableDance.set(!Template.instance().enableDance.get());
  },
  'click [data-action="follow"]': function() {
    Template.instance().enableFollow.set(!Template.instance().enableFollow.get());
  },
  'click [data-action="delay"]': function() {
    Template.instance().enableDelay.set(!Template.instance().enableDelay.get());
  },
  
  'click [data-action="saveRate"]': function(e,t) {
    if (t.saveRate.get()) {
      t.saveRate.set(false);
    } else {
      var p = t.pInst.get();
      var song = t.song.get()
      var speed = t.checkSpeed(song, p);
      t.saveRate.set(speed);
    }
  }
});

Template.audioFreeze.onRendered(function() {
  var inst = Template.instance();
  var s = function(p) {
    inst.pInst.set(p);
    var song, cnv, amp, smokeTexture, y, ps; 
    var history = [];
    y = 100;
    delay = new p5.Delay();
    
    p.preload = function() {
      var songFile = inst.playlist.get()[Math.floor(Math.random()*inst.playlist.get().length)];
      // song = p.loadSound('/audio/Poisonous-Gas.mp3')
      song = p.loadSound(songFile)
      smokeTexture = p.loadImage("/Smoke.png");
    }
    
    p.setup = function() {  
      inst.song.set(song);
      cnv = p.createCanvas(window.innerWidth, window.innerHeight);
      smokeTexture.resize(inst.drawSize.get(), inst.drawSize.get());
      // p.resize(smokeTexture)
      ps = new SmokeSystem(0,p.createVector(p.width / 2, p.height / 2), smokeTexture);
      amp = new p5.Amplitude;
      if (!song.isPlaying()) {
        song.play();
        var speed = inst.checkSpeed(song, p);
        inst.startingRate.set(speed);
      }
      cnv.mouseClicked(function(e) {
        if (inst.saveRate.get()) {
          inst.saveRate.set(false);
        } else {
          var speed = inst.checkSpeed(song, p);
          inst.saveRate.set(speed);
        }
      });
    }
    p.draw = function() {
      p.background(0);
      inst.applyPlaybackRate(song, p);
      if (inst.enableDelay.get()) {
        inst.applyDelay(song, delay, p);      
      } else {
        inst.stopDelay(song, delay);
      }
      // if delayrate
      //smoke  
      var dx
      if (inst.manipulateRate.get()) {
        // var dx = p.map(p.mouseX,0,p.width,-0.2,0.2);
      } else {
        dx = p.map(p.width/2,0,p.width,-0.2,0.2);
      }      
      var wind = p.createVector(dx,0);
      ps.applyForce(wind);
      ps.run();
      for (var i = 0; i < 2; i++) {
        ps.addParticle();
      }
      // Draw an arrow representing the wind force
      if (!inst.saveRate.get()) {
        inst.drawArrowVector(wind, p.createVector(p.width/2,50,0),window.innerWidth, p);
      }
      
      //pulse
      var randColor = inst.randColor.get();      
      p.fill(randColor);
      var level = amp.getLevel();
      var size = p.map(level, 0, 1, 0, 200);
      inst.drawSize.set(size);
      //dance
      var compX = p.width;
      var compY = p.height;
      var dance = {
        x: inst.randomInt(10, compX),
        y: inst.randomInt(10, compY)
      }
      if (inst.enableDance.get()) {
        if (!inst.isDancing.get()) {
          inst.isDancing.set(true);
          inst.danceStep.set(dance);
          Meteor.setTimeout(() => {
            p.ellipse(dance.x, dance.y, size, size);
            inst.isDancing.set(false);
          }, 1000);
        } else {
          // console.log('static step')
          p.ellipse(inst.danceStep.get().x, inst.danceStep.get().y, size, size);
        }
      }
      
      if (inst.enableFollow.get()) {
        p.ellipse(p.mouseX, p.mouseY, size, size); //follow
      } else {
        p.ellipse(p.width/2, p.height/2, size, size);//center
      }
      
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
      this.origin = v.copy();
      this.img = img_
      for(var i = 0; i < num; ++i){
        var creatP = new Particle(this.origin,this.img);
        this.particles.push(new Particle(this.origin,this.img));
      }
    };

    SmokeSystem.prototype.run = function() {
      var len = this.particles.length;
      for (var i = len - 1; i >= 0; i--) {
        var particle = this.particles[i];
        particle.run();
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
      // static initial pos 
      // this.loc = pos.copy();
      //follow mouse
      if (inst.isDancing.get()) {
        if (inst.danceStep.get()) {
          this.loc = p.createVector(inst.danceStep.get().x, inst.danceStep.get().y)
        } else {
          this.loc = p.createVector(p.mouseX, p.mouseY)
        }
      } else {
        this.loc = p.createVector(p.mouseX, p.mouseY)
      }
      
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
      //Epilepsy
      // var randy = p.color(p.random(255), p.random(255), p.random(255)); = Epilepsy
      var randy = p.color(inst.randColor.get()); //match with template level random color
      p.imageMode(p.CENTER);
      p.tint(randy,this.lifespan);
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
      this.acc.mult(0);
    }  
  }
  var sketch = new p5(s, 'audioFreeze');
  inst.audioSketch.set(sketch);
});

Template.audioFreeze.onDestroyed(function() {
  //bye now
  if (this.audioSketch.get() && this.pInst.get()) {
    var pInst = this.pInst.get();
    pInst.remove();
  }
});