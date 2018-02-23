FlowRouter.route('/', {
  action: function(params, queryParams) {
    BlazeLayout.render('dashLayout', { scene: "creationMyth"});
  },
  triggersExit: function() {
    $('canvas').remove(); 
  }
});

FlowRouter.route('/flight', {
  action: function(params, queryParams) {
    BlazeLayout.render('dashLayout', { scene: "flight"});
  },
  triggersExit: function() {
    $('canvas').remove(); 
  }
});

FlowRouter.route('/pygmalion', {
  action: function(params, queryParams) {
    BlazeLayout.render('dashLayout', { scene: "pygmalion"});
  },
  triggersExit: function() {
    $('canvas').remove(); 
  }
});

FlowRouter.route('/ayylmao', {
  action: function(params, queryParams) {
    BlazeLayout.render('dashLayout', { scene: "ayylmao"});
  },
  triggersExit: function() {
    $('canvas').remove(); 
  }
});