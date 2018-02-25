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
  
  var i = 0
  this.addFood = (key) => {
    //ugly hardcode to avoid limit bug
    if (i === 31) {
      console.log("NOPE");
      console.log($('.grav'))
      return
    } 
    i++
    
    var el = document.createElement('span');
    var item = this.foodTypes[Math.floor(Math.random() * this.foodTypes.length)];
    // console.log(item.name);
    $(el).addClass(`food grav ${item.name}`);
    $(el).css('position', "absolute");
    
    var width = window.innerWidth;
    var rando = Math.floor(Math.random() * width) + 1;
    $(el).css('left', `${rando}px`);
    $('body').prepend(el) //dont matter cuz plugin moves to body level no matter what
    
    var gr_x = 0;
  	var gr_y = 0; //zero grav
    
    $(el).throwable({
      containment:[0,0,window.innerWidth,(window.innerHeight - 30)],
      drag: true,
      gravity: {x: gr_x, y: gr_y},
      impulse: {
        f: 300,
        p: {x: 0, y: 2}
      },
      shape: "circle",
      autostart: true,
      bounce: 0.2,
      damping: 0
    });
  }
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
});