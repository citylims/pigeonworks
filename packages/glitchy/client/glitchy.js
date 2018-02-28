const debounce = function(callback, duration) {
  var timer;
  return function(event) {
    clearTimeout(timer);
    timer = setTimeout(function(){
      callback(event);
    }, duration);
  };
}


Template.glitchy.onCreated(function() {
  
});

Template.glitchy.onRendered(function() {
  var baseUrl = window.location.href;
});
