import THREE from 'three';
import p5 from 'p5';
import "p5/lib/addons/p5.sound";

Template.audioFreeze.onCreated(function() {
  this.audioSketch = new ReactiveVar(false);  
  this.randColor = new ReactiveVar(255);

  Meteor.setInterval(() => {
    var color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    this.randColor.set(color)
  }, 1000);
});

Template.audioFreeze.helpers({});

Template.audioFreeze.events({});

Template.audioFreeze.onRendered(function() {
  var inst = Template.instance();
  
  var s = function(p) {
    var song, cnv, amp; 
    var history = [];
    
    p.preload = function() {
      song = p.loadSound('/audio/Poisonous-Gas.mp3')
    }  
    p.setup = function() {
      cnv = p.createCanvas(window.innerWidth, window.innerHeight);
      amp = new p5.Amplitude;
      if (!song.isPlaying()) {
        song.play();
      }
      cnv.mouseClicked(function() {
        song.isPlaying() ? song.stop() : song.play();
      });
    }
    p.draw = function() {
      var randColor = inst.randColor.get();
      p.background(0);
      p.fill(randColor);
      var level = amp.getLevel();
      var size = p.map(level, 0, 1, 0, 200);
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
  }
  
  var sketch = new p5(s, 'audioFreeze');
  inst.audioSketch.set(sketch);
});