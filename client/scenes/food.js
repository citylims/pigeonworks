Template.food.onCreated(function() {
  this.foodCount = new ReactiveVar(0);
  this.foodMax = new ReactiveVar(31);
  this.gravX = new ReactiveVar(0);
  this.gravY = new ReactiveVar(0);
  this.impulseForce = new ReactiveVar(180);
  this.impulseX = new ReactiveVar(0);
  this.impulseY = new ReactiveVar(2);
  this.damping = new ReactiveVar(0);
  this.bounce = new ReactiveVar(0.4);
  
  this.foodTypes = [
    {
      name: "donut",
      palette: false
    },
    {
      name: "cupcake",
      palette: false
    },
    {
      name: "hotdog",
      palette: false
    },
    {
      name: "pancake",
      palette: false
    },
    {
      name: "pizza",
      palette: false
    },
    {
      name: "sushi",
      palette: false
    },
    {
      name: "taco",
      palette: false
    },
  ];
  

  this.addFood = (key) => {
    if (this.foodCount.get() === this.foodMax.get()) {
      console.log("NOPE");
      console.log($('.grav'));
      return;
    }
     
    this.foodCount.set(this.foodCount.get() + 1);
    
    var el = document.createElement('span');
    var item = this.foodTypes[Math.floor(Math.random() * this.foodTypes.length)];
    // console.log(item.name);
    $(el).addClass(`food grav ${item.name}`);
    $(el).css('position', "absolute");
    
    var width = window.innerWidth;
    var posX = Math.floor(Math.random() * width) + 1;
    $(el).css('left', `${posX}px`);
    $('body').prepend(el) //dont matter cuz plugin moves to body level no matter what 
    var rangeImpulseX = Math.floor(Math.random() * 4) + 1;
    var check = Math.floor(Math.random() * 2);
    if (!check) {
      rangeImpulseX = -Math.abs(Math.floor(Math.random() * 4) + 1);
    }
    var rangeImpulseY = Math.floor(Math.random() * 3) + 1;
    
    $(el).throwable({
      containment:[0,0,window.innerWidth,(window.innerHeight - 30)],
      drag: true,
      gravity: {x: this.gravX.get(), y: this.gravY.get()},
      impulse: {
        f: this.impulseForce.get(),
        p: {x: rangeImpulseX, y: rangeImpulseY}
      },
      shape: "circle",
      autostart: true,
      bounce: this.bounce.get(),
      damping: this.damping.get()
    });
  };
  
  this.autoAdd = () => {
    var adding = Meteor.setInterval(() => {
      this.addFood();
    }, 5000);
  };
  
});

Template.food.helpers({
  height: function() {
    return `${window.innerHeight}`;
  }
});

Template.food.events({
  'click .fun-fader': function() {
    Template.instance().addFood();
  },
});

Template.food.onRendered(function() {
  var inst = Template.instance();
  inst.autoAdd();
});