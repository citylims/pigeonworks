FlowRouter.route('/', {
  action: function(params, queryParams) {
    BlazeLayout.render('dashLayout', { scene: "creationMyth"});
  },
  triggersExit: function() {
    $('canvas').remove(); // this should be moved to router level.
  }
});

FlowRouter.route('/flight', {
  action: function(params, queryParams) {
    BlazeLayout.render('dashLayout', { scene: "flight"});
  },
  triggersExit: function() {
      $('canvas').remove(); // this should be moved to router level.
  }
});

FlowRouter.route('/pygmalion', {
  action: function(params, queryParams) {
    BlazeLayout.render('dashLayout', { scene: "pygmalion"});
  },
  triggersExit: function() {
      $('canvas').remove(); // this should be moved to router level.
  }
});