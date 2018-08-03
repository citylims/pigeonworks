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

FlowRouter.route('/glitchy', {
  action: function(params, queryParams) {
    BlazeLayout.render('dashLayout', { scene: "glitchy"});
  },
  triggersExit: function() {
    exitRefresh();
  }
});

FlowRouter.route('/gridWriter', {
  action: function(params, queryParams) {
    BlazeLayout.render('dashLayout', { scene: "gridWriter"});
  },
  triggersExit: function() {
    exitRefresh();
  }
});

FlowRouter.route('/spider', {
  action: function(params, queryParams) {
    BlazeLayout.render('dashLayout', { scene: "spider"});
  },
  triggersExit: function() {
    exitRefresh();
  }
});

FlowRouter.route('/audioFreeze', {
  action: function(params, queryParams) {
    BlazeLayout.render('dashLayout', { scene: "audioFreeze"});
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