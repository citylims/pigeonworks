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
  },
  'click [data-action="gridWriter"]': function() {
    FlowRouter.go('/gridWriter');
  },
  'click [data-action="audioFreeze"]': function() {
    FlowRouter.go('/audioFreeze');
  },
  'click [data-action="outerverse"]': function() {
    FlowRouter.go('/outerverse');
  },
  'click [data-action="overlayers"]': function() {
    FlowRouter.go('/overlayers');
  },
  'click [data-action="silence"]': function() {
    FlowRouter.go('/silence');
  }
});