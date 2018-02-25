FlowRouter.route('/', {
  action: function(params, queryParams) {
    BlazeLayout.render('dashLayout', { scene: "creationMyth"});
  },
  triggersExit: function() {
    exitRefresh(); 
  }
});

FlowRouter.route('/flight', {
  action: function(params, queryParams) {
    BlazeLayout.render('dashLayout', { scene: "flight"});
  },
  triggersExit: function() {
    exitRefresh();
  }
});

FlowRouter.route('/pygmalion', {
  action: function(params, queryParams) {
    BlazeLayout.render('dashLayout', { scene: "pygmalion"});
  },
  triggersExit: function() {
    exitRefresh();
  }
});

FlowRouter.route('/alien', {
  action: function(params, queryParams) {
    BlazeLayout.render('dashLayout', { scene: "alien"});
  },
  triggersExit: function() {
    exitRefresh();
  }
});

FlowRouter.route('/food', {
  action: function(params, queryParams) {
    BlazeLayout.render('dashLayout', { scene: "food"});
  },
  triggersExit: function() {
    exitRefresh();
  }
});

function exitRefresh() {
  $('style').remove();
  $('canvas').remove();
  $('.food').remove();
}