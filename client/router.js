FlowRouter.route('/', {
  action: function(params, queryParams) {
    BlazeLayout.render('dashLayout', { scene: "creationMyth"});
  }
});

FlowRouter.route('/flight', {
  action: function(params, queryParams) {
    BlazeLayout.render('dashLayout', { scene: "flight"});
  }
});