Template.pygmalion.onRendered(function() {
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
  var ctx6 = layer6.getContext("2d")
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
  ctx4.beginPath();
    square(40, 100, 300, black);
    square(40, 100, 360, black);
    square(40, 170, 315, black);
    square(40, 170, 350, black);
  ctx4.closePath();
  ctx4.beginPath();
    ctx4.strokeStyle = black;
    ctx4.lineWidth = 12;
    ctx4.moveTo(140, 321);
    ctx4.lineTo(170, 321);
    ctx4.moveTo(140, 384);
    ctx4.lineTo(200, 384);
    ctx4.moveTo(210, 351);
    ctx4.lineTo(280, 351);
    ctx4.stroke();
  ctx4.closePath();

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
  //draw text
  ctx.font = "28px Arial";
  ctx.fillText("slowdive", 100, 480);
  //layer2 draw
  insideSquare(433, 141);
  insideSquare(433, 189);
  insideSquare(433, 236);
  Meteor.setTimeout(function() {
    $('#layer2').animate({'left': "150"}, 5000) 
  }, 500)
  Meteor.setTimeout(function() {
    $('#layer3').animate({'left': "150"}, 5000) 
  }, 5500)
  Meteor.setTimeout(function() {
    $('#layer4').animate({'left': "150"}, 5000)
  }, 10500)
  Meteor.setTimeout(function() {
    $('#layer5').animate({'left': "150"}, 5000)
  }, 15500)
  Meteor.setTimeout(function() {
    $('#layer6').animate({'left': "150"}, 5000)   
  }, 20500);
  Meteor.setTimeout(function() {
    $('.hymn').addClass('sing');
  }, 22500);
});