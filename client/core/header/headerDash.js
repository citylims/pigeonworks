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
  },
  'click [data-action="alien"]': function() {
    FlowRouter.go('/alien');
  },
  'click [data-action="food"]': function() {
    FlowRouter.go('/food');
  },
  'click [data-action="glitchy"]': function() {
    FlowRouter.go('/glitchy');
  }
});