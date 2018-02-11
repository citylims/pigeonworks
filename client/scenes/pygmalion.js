Template.pygmalion.onRendered(function() {
   var canvas = document.getElementById("album");
  var ctx = canvas.getContext("2d");
  var layer2 = document.getElementById("topLayer");
  var ctx2 = layer2.getContext("2d")
  //blur fix
  ctx.translate(0.5, 0.5);
  var green = "#548779";
  var black = "#1D1F21";

  function threeGreen(x,y) {
    var pad = 25;
    for (i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.rect(x, y, 16, 16);
      ctx.fillStyle = green;
      ctx.fill();
      ctx.lineWidth = .4;
      ctx.strokeStyle = 'black';
      ctx.stroke();
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
    ctx.beginPath();
    ctx.rect(x, y, size, size);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = .4;
    ctx.strokeStyle = 'black';
    ctx.stroke();
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
  ctx.beginPath();
    ctx.fillStyle = "#EFF0EB"
    ctx.arc(480, 207, 90, 0, Math.PI*2, false);
  ctx.closePath();
  ctx.fill();

  //doublesquare
  ctx.beginPath();
    square(40, 100, 300, black);
    square(40, 100, 360, black);
    square(40, 170, 315, black);
    square(40, 170, 350, black);
  ctx.closePath();
  ctx.beginPath();
    ctx.strokeStyle = black;
    ctx.lineWidth = 12;
    ctx.moveTo(140, 321);
    ctx.lineTo(170, 321);
    ctx.moveTo(140, 384);
    ctx.lineTo(200, 384);
    ctx.moveTo(210, 351);
    ctx.lineTo(280, 351);
    ctx.stroke();
  ctx.closePath();

  //offset strokes bottom right
  //box
  ctx.beginPath();
    ctx.rect(530, 315, 40, 162);
    ctx.fillStyle = black
    ctx.fill();
  ctx.closePath
  //line init
  function liner(x, y) {
    ctx.beginPath();
      ctx.lineWidth = 12;
      ctx.moveTo(531, y);
      ctx.lineTo(x, y);
      ctx.stroke();
    ctx.closePath();
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
  var scene = Meteor.setTimeout(function() {
    $('#topLayer').animate({'left': "150"}, 5000, function() {
      $('.hymn').addClass('sing');
    });    
  }, 500);
  
});