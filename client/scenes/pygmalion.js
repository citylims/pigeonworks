Template.pygmalion.onCreated(function() {
  this.lyricCount = new ReactiveVar(0);
  this.windowHeight = new ReactiveVar(window.innerHeight);
  this.lyrics = [
    "Sits down by the fire", 
    "Ease his worried mind",
    "If only I could try",
    "Reach the light inside",
    "Feels so hard to say",
    "Chase his fears away",
    "Know that I won't try",
    "Catch his dreams today"  
  ];
});

Template.pygmalion.helpers({
  'lyrics': function() {
    return Template.instance().lyrics;
  },
  height: function() {
    return Template.instance().windowHeight.get();
  }
  // isShown: function(lyric) {
  //   _e
  // }
});

Template.pygmalion.onRendered(function() {
  var inst = Template.instance();
  window.onresize = function() {
    inst.windowHeight.set(window.innerHeight);
    // var canvasHeight = window.innerHeight;
    // var canvasWidth = window.innerWidth;
    // camera.aspect = canvasWidth / canvasHeight;
  }
  
  
  var inst = Template.instance();
  var canvas = $('#album').get(0);
  var ctx = canvas.getContext("2d");
  var layer2 = $('#layer2').get(0);
  var ctx2 = layer2.getContext("2d")
  var layer3 = $('#layer3').get(0);
  var ctx3 = layer3.getContext("2d")
  var layer4 = $('#layer4').get(0);
  var ctx4 = layer4.getContext("2d")
  var layer5 = $('#layer5').get(0);
  var ctx5 = layer5.getContext("2d")
  var layer6 = $('#layer6').get(0);
  var ctx6 = layer6.getContext("2d");
  var layer7 = $('#layer7').get(0);
  var ctx7 = layer7.getContext("2d");
  //blur fix
  ctx3.translate(0.5, 0.5);
  var green = "#548779";
  var black = "#1D1F21";

  function threeGreen(x,y) {
    var pad = 25;
    for (i = 0; i < 3; i++) {
      ctx3.beginPath();
      ctx3.rect(x, y, 16, 16);
      ctx3.fillStyle = green;
      ctx3.fill();
      ctx3.lineWidth = .4;
      ctx3.strokeStyle = 'black';
      ctx3.stroke();
      y += pad
    }
  }

  function threeBlack(x, y) {
    for (i = 0; i < 3; i++) {
      if (i === 0) {
        square(40, x, y, black);
      }
      else if ( i === 1) {
        square(22, (x + 46), (y + 9) , black);
      }
      else {
        square(16, (x + 74), (y + 12), black);
      };
    }
  }

  function insideSquare(x, y) {
    for (i = 0; i < 2; i++) {
      if (i === 0) {
        square(40, x, y, black);
      }
      else {
        x += 46
        ctx2.rect(x, y, 20, 42);
        ctx2.fillStyle = black
        ctx2.fill();
      }
    }
  }

  function square(size, x, y, color) {
    ctx4.beginPath();
    ctx4.rect(x, y, size, size);
    ctx4.fillStyle = color;
    ctx4.fill();
    ctx4.lineWidth = .4;
    ctx4.strokeStyle = 'black';
    ctx4.stroke();
  }
  
  function square7(size, x, y, color) {
    ctx7.beginPath();
    ctx7.rect(x, y, size, size);
    ctx7.fillStyle = color;
    ctx7.fill();
    ctx7.lineWidth = .4;
    ctx7.strokeStyle = 'black';
    ctx7.stroke();
  }

  //greenSquares
  threeGreen(80, 110);
  threeGreen(103, 160);
  threeGreen(126, 160);
  threeGreen(149, 194);
  threeGreen(172, 160);
  threeGreen(195, 160);
  threeGreen(245, 194);

  //blackSquares
  threeBlack(295, 140);
  threeBlack(295, 186);
  threeBlack(295, 232);
  threeBlack(295, 278);

  //circle
  ctx5.beginPath();
    ctx5.fillStyle = "#EFF0EB"
    ctx5.arc(480, 207, 90, 0, Math.PI*2, false);
  ctx5.closePath();
  ctx5.fill();

  //doublesquare
  ctx7.beginPath();
    square7(40, 100, 300, black);
    square7(40, 100, 360, black);
    square7(40, 170, 315, black);
    square7(40, 170, 350, black);
  ctx7.closePath();
  ctx7.beginPath();
    ctx7.strokeStyle = black;
    ctx7.lineWidth = 12;
    ctx7.moveTo(140, 321);
    ctx7.lineTo(170, 321);
    ctx7.moveTo(140, 384);
    ctx7.lineTo(200, 384);
    ctx7.moveTo(210, 351);
    ctx7.lineTo(280, 351);
    ctx7.stroke();
  ctx7.closePath();

  //offset strokes bottom right
  //box
  ctx6.beginPath();
    ctx6.rect(530, 315, 40, 162);
    ctx6.fillStyle = black
    ctx6.fill();
  ctx6.closePath
  //line init
  function liner(x, y) {
    ctx6.beginPath();
      ctx6.lineWidth = 12;
      ctx6.moveTo(531, y);
      ctx6.lineTo(x, y);
      ctx6.stroke();
    ctx6.closePath();
  }
  liner();
  //draw lines to box
  function offsetLines() {
    //top line values
    var x = 480
    var y = 321
    for (var i = 0; i < 6; i++, y += 30) {
      if (i === 0) {
        liner(x,y);
      }
      else if ( i === 1 ) {
        liner((x - 20), y);
      }
      else if ( i === 2 ) {
        liner((x - 30), y);
      }
      else {
        liner((x - 45), y);
      }
    }
  }
  offsetLines();
  
  //layer2 draw
  insideSquare(433, 141);
  insideSquare(433, 189);
  insideSquare(433, 236);
  Meteor.setTimeout(function() {
    $('#layer2').animate({'left': "150"}, 5000) 
    $('.hymn').addClass('sing');
  }, 500)
  Meteor.setTimeout(function() {
    $('#layer3').animate({'top': "50"}, 5000) 
  }, 5500)
  Meteor.setTimeout(function() {
    $('#layer4').animate({'top': "50"}, 5000)
  }, 10500)
  Meteor.setTimeout(function() {
    $('#layer7').animate({'top': "50"}, 5000) 
    // $('.hymn').addClass('sing');
  }, 12500)
  Meteor.setTimeout(function() {
    $('#layer5').animate({'left': "150"}, 5000)
  }, 15500)
  Meteor.setTimeout(function() {
    $('#layer6').animate({'top': "50"}, 5000, function() {
      $('.title').addClass('sing');
      //draw text
      ctx.font = "28px Arial";
      ctx.fillText("slowdive", 100, 480);
    });
  }, 16500);
  Meteor.setTimeout(function() {
    choir();
  }, 17500);
  
  var choir = () => {
    var count = this.lyricCount.get();
    if (count === this.lyrics.length) return;
    if (count === 4) {
      console.log('4 wait')
      pause(count);
    } else {
      updateLyrics(count);
    };
  };
  
  var pause = (count) => {
    Meteor.setTimeout(() => {
      $('.lyric').eq(count).addClass('sing');
      this.lyricCount.set(count + 1);
      choir();
    }, 28500);
  }
  
  var updateLyrics = (count) => {
    Meteor.setTimeout(() => {
      $('.lyric').eq(count).addClass('sing');
      $('.lyric').eq(count).addClass('jittery')
      Meteor.setTimeout(() => {
        $('.lyric').eq(count).removeClass('jittery');
      }, 3000);
      this.lyricCount.set(count + 1);
      choir();
    }, 5500);
  }

});