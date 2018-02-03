Template.headerDash.onCreated(function() {  
});

Template.headerDash.events({
  'click [data-action="debug"]': function() {
    FlowRouter.go('/flight');
  }
});