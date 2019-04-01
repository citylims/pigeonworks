Template.overlayers.onCreated(function() {
  this.expandGutter = new ReactiveVar(true);
  this.autorun(() => {
    if (!this.expandGutter.get()) {
    	$('#gutter').animate({height: '20px'}, {duration: 250});
    } else {
      console.log('open');
      $('#gutter').animate({height: '70px'}, {duration: 250,});
    }
  });
});


Template.overlayers.helpers({
  gutterExpand() {
    return Template.instance().expandGutter.get();
  }
});

Template.overlayers.events({
  'click [data-action="expandGutter"]': function() {
    Template.instance().expandGutter.set(!Template.instance().expandGutter.get());
  },
  'change [data-action="points"]': function() {
    // console.log('')
    var opacity = $("#points").val();
    $(".top").css("opacity", opacity / 100);
  }
});


Template.overlayers.onRendered(function() {
  //https://github.com/citylims/overlayers/blob/master/overlayers.js 4 years old!

  // window.onload = function() {
    
  // }

  var overLayers = function(combos) {

    // var collection = new Generate(arr);

    init();

    function init() {
      refreshDisplay();
      $(document).keydown(function(e) {
        arrows(e);
      });
    }

    // function Generate(arr) {
    //   var result = [];
    //   for (var i = 0; i < arr.length; i = i + 2) {
    //     var item = {
    //       top: arr[i],
    //       bottom: arr[i+1]
    //     }
    //     result.push(item);
    //     console.log(JSON.stringify(result));
    //     this.combos = result;
    //   }
    // }

    function refreshDisplay() {
      $(".top").attr("src", combos[0].top);
      $(".bottom").attr("src", combos[0].bottom);
    }
    //I wrote this code in 2014 when i had no idea what i was doing so i will preserve it for science.
    function movement(direction) {
      var topImg = $('.top').attr('src');
      var bottomImg = $('.bottom').attr('src');
      if (direction === "flip") {
        $(".top").attr("src", bottomImg);
        $(".bottom").attr("src", topImg);
      } else {
        for (var i = 0; i < combos.length; i ++) {
          if (combos[i].top === topImg &&
            combos[i].bottom === bottomImg) {
            if (direction === "forward") {
              if (!combos[i + 1]) {
                $(".top").attr("src", combos[0].top);
                $(".bottom").attr("src", combos[0].bottom);
              } else {
                $(".top").attr("src", combos[i + 1].top);
                $(".bottom").attr("src", combos[i + 1].bottom);
              }
            }
            else if(direction === "backward") {
              if (!combos[i -1]) {
                $(".top").attr("src", combos[combos.length - 1].top);
                $(".bottom").attr("src", combos[combos.length - 1].bottom);
              } else {
                $(".top").attr("src", combos[i - 1].top);
                $(".bottom").attr("src", combos[i - 1].bottom);
              }
            }
          }
        }
      }
    }

    //events
    $("#generate").on('click', function() {
      movement("forward");
    });

    $("#flip").on('click', function() {
      movement("flip");
    })

    $("#hide").on('click', function() {
      $(".controls").toggle();
    });

    // $("#points").on("change", function(e) {
    //   e.preventDefault;
    //   var opacity = $("#points").val();
    //   $(".top").css("opacity", opacity / 100);
    // });

    //keybinding functions
    function arrows(e) {
      var topImg = $(".top").attr("src");
      switch(e.which) {
        case 37: {
          movement("backward");
        }
        break;
        case 38:
        case 40: {
          movement("flip")
        }
        break;
        case 39: {
            movement("forward");
        }
        break;
        default: return;
      }
      e.preventDefault();
    };
  }//overlayers
  //combo array 
  //need to data model
  var combos = [{"top":"http://i.imgur.com/Wgr7PDD.jpg","bottom":"http://i.imgur.com/kxM3Tri.jpg"},{"top":"http://i.imgur.com/gvtGp3r.jpg","bottom":"http://i.imgur.com/JHsYx38.jpg"},{"top":"http://i.imgur.com/APXnuX9.jpg","bottom":"http://i.imgur.com/tWggUi2.jpg"},{"top":"http://i.imgur.com/Sm7CLsX.jpg","bottom":"http://i.imgur.com/hwqjycB.jpg"},{"top":"http://i.imgur.com/uToSGD6.jpg","bottom":"http://i.imgur.com/MhdxcD1.jpg"},{"top":"http://i.imgur.com/O3cWx3f.jpg","bottom":"http://i.imgur.com/AFDWvN7.jpg"},{"top":"http://i.imgur.com/RRZK4jz.jpg","bottom":"http://i.imgur.com/hjqzNNh.jpg"},{"top":"http://i.imgur.com/udJX6v3.jpg","bottom":"http://i.imgur.com/3GnMhSx.png"},{"top":"http://i.imgur.com/JuDTTz0.jpg","bottom":"http://i.imgur.com/aa5L9Q3.jpg"},{"top":"http://i.imgur.com/Rq548Ux.jpg","bottom":"http://i.imgur.com/0iVpzaa.jpg"},{"top":"http://i.imgur.com/beqlTTZ.jpg","bottom":"http://i.imgur.com/n70PleR.jpg"},{"top":"http://i.imgur.com/A3TrfKk.jpg","bottom":"http://i.imgur.com/dlh5nY9.jpg"},{"top":"http://i.imgur.com/Dl7WGJJ.jpg","bottom":"http://i.imgur.com/FTzerop.jpg"},{"top":"http://i.imgur.com/2wW9D7b.jpg","bottom":"http://i.imgur.com/Q3bUiHJ.gif"},{"top":"http://i.imgur.com/oln2Bvb.jpg","bottom":"http://i.imgur.com/BPkUx8x.jpg"},{"top":"http://i.imgur.com/jxVXLjF.jpg","bottom":"http://i.imgur.com/1BhVE5f.jpg"}]
  overLayers(combos);
});