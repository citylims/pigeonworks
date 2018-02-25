Session.setDefault('funFadersActive', 0); //count nodes;

Template.funFader.onCreated(function() {
  this.faderColor = new ReactiveVar(['magenta','orange','yellow','#21EB95','#00B1FC']);
  this.faderY = new ReactiveVar(5);
  this.faderDurationColor = new ReactiveVar(1500);
  this.faderDurationTransform = new ReactiveVar(500);
  this.faderDelayTransform = new ReactiveVar(250);
  
  Session.set('funFadersActive', Session.get('funFadersActive') + 1);
});

Template.funFader.helpers({
  faderColor: function() {
    return Template.instance().faderColor.get().join(';');
  },
  faderY: function() {
    return Template.instance().faderY.get();
  },
  faderDurationColor: function() {
    return Template.instance().faderDurationColor.get();
  },
  faderDurationTransform: function() {
    return Template.instance().faderDurationTransform.get();
  },
  faderDelayTransform: function() {
    return Template.instance().faderDelayTransform.get();
  },
  text: function() {
    return Template.instance().data.text;
  },
  className: function() {
    return Template.instance().data.className;
  }
});


Template.funFader.onRendered(function() {
    var inst = Template.instance();
    
    var styleTag = document.createElement('style');
    styleTag.type = 'text/css';
    document.body.appendChild(styleTag);
    var CLASS_NAME = 'fun-fader';
    var nodes = document.querySelectorAll('.fun-fader');
    // 
    console.log(nodes);
    // var fadersCreated = 0;

    for (var i = 0; i < nodes.length; i++) {

      var n = nodes.item(i);

      var className = CLASS_NAME+'-'+ (i + 1);

      var when = n.getAttribute(CLASS_NAME+'-on');
      var scope = n.getAttribute(CLASS_NAME+'-scope') || '';
      
      var durationColor = inst.faderDurationColor.get();
      var durationTransform = inst.faderDurationTransform.get();

      var delayColor = 100;//make reactive set?
      var delayTransform = inst.faderDelayTransform.get();

      var color = inst.faderColor.get();
      
      var x = 0;
      var y = inst.faderY.get();

      var delayAttr = n.getAttribute(CLASS_NAME + '-delay');
      delayAttr = parseFloat(delayAttr);
      if (delayAttr === delayAttr) { // assign condition
        delayColor = delayAttr;
        delayTransform = delayAttr;
      }

      var delayColorAttr = n.getAttribute(CLASS_NAME + '-delay-color');
      delayColorAttr = parseFloat(delayColorAttr);
      if (delayColorAttr === delayColorAttr) {
        delayColor = delayColorAttr;
      }

      var delayTransformAttr = n.getAttribute(CLASS_NAME + '-delay-transform');
      delayTransformAttr = parseFloat(delayTransformAttr);
      if (delayTransformAttr === delayTransformAttr) {
        delayTransform = delayTransformAttr;
      }

      var durationAttr = n.getAttribute(CLASS_NAME + '-duration');
      durationAttr = parseFloat(durationAttr);
      if (durationAttr === durationAttr) {
        durationColor = durationAttr;
        durationTransform = durationAttr;
      }

      var durationColorAttr = n.getAttribute(CLASS_NAME + '-duration-color');
      durationColorAttr = parseFloat(durationColorAttr);
      if (durationColorAttr === durationColorAttr) {
        durationColor = durationColorAttr;
      }

      var durationTransformAttr = n.getAttribute(CLASS_NAME + '-duration-transform');
      durationTransformAttr = parseFloat(durationTransformAttr);
      if (durationTransformAttr === durationTransformAttr) {
        durationTransform = durationTransformAttr;
      }

      var colorAttr = n.getAttribute(CLASS_NAME + '-color');
      if (colorAttr) {
        color = colorAttr.split(';');
      }

      var xAttr = n.getAttribute(CLASS_NAME + '-x');
      xAttr = parseFloat(xAttr);
      if (xAttr === xAttr) {
        x = xAttr;
      }

      var yAttr = n.getAttribute(CLASS_NAME + '-y');
      yAttr = parseFloat(yAttr);
      if (yAttr === yAttr) {
        y = yAttr;
      }
      // console.log(n);
      var t = n.textContent;
      var spans = [];
      for (var j = 0; j < t.length; j++) {
        var ch = t.charAt(j);
        var span = document.createElement('span');
        if (ch === ' ') {
          span.innerHTML = '&nbsp;';
        } else { 
          span.innerHTML = ch;
        }
        spans.push(span);
        span.setAttribute('style', 'animation-delay: '+-delayColor*(t.length-j)+'ms, '+-delayTransform*(t.length-j)+'ms; ' +
                                   '-webkit-animation-delay: '+-delayColor*(t.length-j)+'ms, '+-delayTransform*(t.length-j)+'ms;');
      }

      n.classList.add(CLASS_NAME);
      n.id = className;

      n.innerHTML = '';
      spans.forEach(function(s) {
        n.appendChild(s);
      });

      var style = '';

      var DEFAULT = scope+' #'+className+' span';
      var FADER_TRUE = '#'+className+'.fader-true span';
      var HOVER = scope+' #'+className+':hover span';

      var selectors = [DEFAULT, FADER_TRUE];

      if (when === 'off') selectors = [FADER_TRUE];
      if (when === 'hover') selectors = [HOVER, FADER_TRUE];

      function addStyle(prefix) { //generate style sheet
        style += '\n\n@'+prefix+'keyframes '+className+'-color {';
        color.forEach(function(c, i) {
          var percent = Math.round(i / (color.length-1) * 100) + '%';
          style += '\n\t'+percent+' { color: ' + c + '; }';
        });
        
        style += ' }';

        style += '\n\n@'+prefix+'keyframes '+className+'-transform {';
        style += '\n\t from { '+prefix+'transform: translate3d(-'+x+'px, -'+y+'px, 0); }';
        style += '\n\t to { '+prefix+'transform: translate3d('+x+'px, '+y+'px, 0); }';
        style += ' }';

        style += '\n\n#'+className+' {';
        style += '\n\tdisplay: inline-block;'
        style += ' }';

        style += '\n\n'+selectors.join(', ')+' {';
        style += '\n\tdisplay: inline-block;';
        style += '\n\t'+prefix+'animation-name: '+className+'-color, '+className+'-transform;';
        style += '\n\t'+prefix+'animation-duration: '+durationColor+'ms, '+durationTransform+'ms;';
        style += '\n\t'+prefix+'animation-timing-function: linear, ease-in-out;';
        style += '\n\t'+prefix+'animation-iteration-count: infinite;';
        style += '\n\t'+prefix+'animation-direction: alternate;';
        style += ' }';
        // console.log(style);
      }

      addStyle('');
      addStyle('-webkit-');

      styleTag.appendChild(document.createTextNode(style));
    }
});

Template.alien.onDestroyed(function() {
  Session.set('funFadersActive', Session.get('funFadersActive') - 1);
});

