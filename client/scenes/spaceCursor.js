import {TweenMax} from "gsap";

Template.spaceCursor.onRendered(function() {
  /* Space Cursor */
  var p1 = document.getElementById("path")
  var p2 = document.getElementById("path2")
  var pointStream = [];
  var i = 0 
  var np = 75; // nodeppoint

  function pUpdate(){
  	p2.setAttribute("stroke-width",i/np*4.5);
  	// var pathD = M+pointStream.join(" ");
  	var pathD = romTheVacuousSpider(pointStream, 0.9);
  	p1.setAttribute("d", pathD);
    p2.setAttribute("d", pathD);
  }
  
  //meh 
  function removeD(){ 
    if (i > 18) { 
      pointStream.splice(0, 2); 
      i-- ; 
      pUpdate(); 
    } else if (i >= 3)  {        
      var rand = Math.floor(Math.random() * 6) + 1  
      if (rand >= 2) {
        pointStream.splice(0, 2); 
        i--
        pUpdate();
      }
    }
  };
  
  function move(e){ 
  	i++;
  	// pointStream.push([e.pageX,e.pageY]);
  	pointStream.push(e.pageX,e.pageY);
  	if (i > np) { 
      removeD()
    };
  	pUpdate();
  };

  document.addEventListener('mousemove', function() { move(event) });
  document.addEventListener('touchmove', function() { 
    event.preventDefault(); 
    move(event.targetTouches[0]);
  });
  
  TweenMax.ticker.addEventListener("tick", removeD, 45);

  //Catmull Rom Curve
  function romTheVacuousSpider(data, k) {

    if (k == null) k = 1;
    
    var size = data.length;
    var last = size - 4;    

    var path = "M" + [data[0], data[1]];

    for (var i = 0; i < size - 2; i +=2) {

      var x0 = i ? data[i - 2] : data[0];
      var y0 = i ? data[i - 1] : data[1];

      var x1 = data[i + 0];
      var y1 = data[i + 1];

      var x2 = data[i + 2];
      var y2 = data[i + 3];

      var x3 = i !== last ? data[i + 4] : x2;
      var y3 = i !== last ? data[i + 5] : y2;
      
      var cp1x = x1 + (x2 - x0) / 6 * k;
      var cp1y = y1 + (y2 - y0) / 6 * k;

      var cp2x = x2 - (x3 - x1) / 6 * k;
      var cp2y = y2 - (y3 - y1) / 6 * k;
     
      path += "C" + [cp1x, cp1y, cp2x, cp2y, x2, y2];
    } 

    return path;
  }
})