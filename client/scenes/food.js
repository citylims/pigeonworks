Template.food.onCreated(function() {
  //defaults
  this.foodCount = new ReactiveVar(0);
  this.foodMax = new ReactiveVar(21); 
  this.gravX = new ReactiveVar(0); 
  this.gravY = new ReactiveVar(0);
  this.impulseForce = new ReactiveVar(180); 
  this.impulseX = new ReactiveVar(0);
  this.impulseY = new ReactiveVar(2);
  this.damping = new ReactiveVar(0.2);
  this.bounce = new ReactiveVar(0.4);
  
  this.messenger = new ReactiveVar(false);
  this.foodFeeder = new ReactiveVar(false)
  
  this.foodMessages = ["IT'S OK", "TO PLAY", "WITH YOUR"];
  this.msgCount = new ReactiveVar(0);
  this.finishedScene = new ReactiveVar(false);

  this.foodTypes = [
    {
      name: "donut",
      palette: false // pass pallet to fun-filter
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
  
  this.autorun(() => {
    if (this.msgCount.get() === this.foodMessages.length) {
      var messenger = this.messenger.get();
      Meteor.clearInterval(messenger);
      this.scaleTitle();
    }
  });
  
  this.scaleTitle = () => {
    var heightOffset = $('.food-title').height() / 2;
    var windowHeight = window.innerHeight;
    var draw = ((windowHeight / 2) + heightOffset) / 2 - 100;
    $('.food-title').animate({
      "font-size": "400px",
      "margin-top": `${draw}px`,
      "margin-left": '-450px'
    }, 15000, () => {
      this.finishedScene.set(true);
    });
  }
   

  this.addFood = (key) => {
    if (this.foodCount.get() === this.foodMax.get()) {
      console.log("NOPE");
      console.log($('.grav'));
      return;
    };
     
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
    this.foodFeeder.set(adding);
  };
  
});

Template.food.helpers({
  height: function() {
    return `${window.innerHeight}`;
  },
  foodMessage: function() {
    return Template.instance().foodMessages[Template.instance().msgCount.get()];
  },
  finishedScene: function() {
    return Template.instance().finishedScene.get();
  }
});

Template.food.events({
  'click .fun-fader': function() {
    Template.instance().addFood();
  },
  'click [data-action="restart"]': function(e,t) {
    $('.food').remove();
    Template.instance().foodCount.set(0);
    Meteor.clearInterval(Template.instance().foodFeeder.get());
    Template.instance().autoAdd();
    s
    
  }
});

Template.food.onRendered(function() {
  var inst = Template.instance();
  
  var messenger = Meteor.setInterval(() => {
    $('.food-message').animate({"opacity": "1"}, 8000, () => {
      $('.food-message').animate({"opacity": "0"}, 8000, () => {
        this.msgCount.set(this.msgCount.get() + 1);
      });
    });
  }, 16000);
  
  inst.messenger.set(messenger);
  
  inst.autoAdd();

});

Template.food.onDestroyed(function() {
  Meteor.clearInterval(this.foodFeeder.get());
}); 