Template.headerDash.onCreated(function() {  
});

Template.headerDash.events({
  'click [data-action="home"]': function() {
    console.log('home')
    FlowRouter.go('/');
  },
  'click [data-action="flight"]': function() {
    FlowRouter.go('/flight');
  },
  'click [data-action="pygmalion"]': function() {
    FlowRouter.go('/pygmalion');
  }
});