Template.ransomWriter.onCreated(function() {
  this.matchChar = new ReactiveVar(this.data.character);
  this.ransomChar = new ReactiveVar('');
  this.ransomColor = new ReactiveVar('');
  this.needUpdate = new ReactiveVar(true);
  this.defaultColor = "white";
  this.colors = new ReactiveVar([
    '#f44336','#e91e63','#9c27b0',
    '#673ab7','#3f51b5','#2196f3',
    '#03a9f4','#00bcd4','#009688',
    '#4caf50','#8bc34a','#cddc39',
    '#ffeb3b','#ffc107','#ff9800',
    '#ff5722','#795548','#9e9e9e',
    '#607d8b'
  ]);
  this.alphaChars = new ReactiveVar([
    'x', 'y', "i"
  ]);
  this.specialChars = new ReactiveVar([
    '!','§','$','%',
    '&','/','(',')',
    '=','?','_','<',
    '>','^','°','*',
    '#','-',':',';','~','\\', '|', '"', "'"
  ]);
  this.fps = new ReactiveVar(20);
  this.timeOffset = new ReactiveVar(2)
});

Template.ransomWriter.helpers({
  displayCharacter: function() {
    return Template.instance().ransomChar.get();
  },
  validClass: function(char) {
    if (Template.instance().data.character === ' ') {
      return 'space-padding';
    }
  },
  color: function() {
    return `color:${Template.instance().ransomColor.get()};`
  }
});

Template.ransomWriter.onRendered(function() {
  var time = 0;
  this.now;
  this.then = Date.now();
  this.delta;
  this.currentTimeOffset = 0;
  this.interval = this.timeOffset.get()/this.fps.get();
  this.chars = this.alphaChars.get().concat(this.specialChars.get());

  this.getRandomColor = () => {
    var colors = this.colors.get();
    var randNum = Math.floor( Math.random() * colors.length );
    return colors[randNum];
  }
  
  this.getRandCharacter = (characterToReplace) =>{    
    var randNum = Math.floor(Math.random() * this.chars.length);
    var lowChoice =  -.5 + Math.random();
    var choice = this.chars[randNum];
    return choice.toLowerCase();
  }
  
  this.restart =  () => {
    this.needUpdate.set(true);
  }
  
  
  this.generateSingleCharacter = (color,character) => {
    this.ransomColor.set(color);
    this.ransomChar.set(character);
  }
    
  this.updateCharacter = (time) => {
    this.now = Date.now();
    this.delta = this.now - this.then;
    if (this.delta > this.interval) {
      this.currentTimeOffset++;
      var randomChar = this.getRandCharacter();
      if (randomChar) {
        var color = this.getRandomColor();
        if (randomChar === this.data.character) {
          this.needUpdate.set(false);
          this.ransomChar.set(this.data.character);
          this.ransomColor.set(this.defaultColor);
        } else {
          this.generateSingleCharacter(color, randomChar);
        }
      }
      this.then = this.now - (this.delta % this.interval);
    }
  }
  
  var update = (time) => {
    time++;
    if(this.needUpdate.get()){
      this.updateCharacter(time);
      requestAnimationFrame(update);
    }
  }
  if (this.data.character !== ' ') {
    update(time);
  } else {
    this.ransomChar.set(' ');
  }
});