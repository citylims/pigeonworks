FlowRouter.route('/', {
  action: function(params, queryParams) {
    BlazeLayout.render('dashLayout', { scene: "creationMyth"});
  }
});