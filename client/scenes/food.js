Template.food.onCreated(function() {
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
    var el = document.createElement('span');
    var item = this.foodTypes[Math.floor(Math.random() * this.foodTypes.length)];
    console.log(item.name);
    $(el).addClass(`food grav ${item.name}`);
    $(el).css('position', "absolute");
    
    var width = window.innerWidth;
    var rando = Math.floor(Math.random() * width) + 1;
    $(el).css('left', `${rando}px`);
    
    $('#food').append(el);
    
    var gr_x = 0;
  	var gr_y = 1;
    
    $(el).throwable({
      drag: true,
      gravity: {x: gr_x, y: gr_y},
      impulse: {
        f: 100,
        p: {x: 0, y: 1.5}
      },
      shape: "box",
      autostart: true,
      bounce: 0.8,
      damping: 9
    });
  }
});

Template.food.helpers({
  height: function() {
    return `${window.innerHeight}` ;
  }
});

Template.food.events({
  'click .fun-fader': function() {
    Template.instance().addFood();
  }
});

Template.food.onRendered(function() {
  var gr_x = 0;
	var gr_y = 1;
  $(".food").addClass("grav");
  $(".grav").throwable({
    drag: true,
    gravity: {x: gr_x, y: gr_y},
    impulse: {
      f: 152,
      p: {x: 0, y: 1.5}
    },
    shape: "box",
    autostart: true,
    bounce: 0.8,
    damping: 9
  });
});