Template.navBlock.onCreated(function(){
  // console.log(this.data.feat);
});

Template.navBlock.helpers({
  feat: function() {
    return Template.instance().data.feat;
  }
});

Template.navBlock.events({
  'click [data-action="goNavBlock"]': function(e,t) {
    console.log(t.data.feat.path)
    FlowRouter.go(t.data.feat.path);
  }
});

Template.navBlock.onRendered(function(){
  $(this.firstNode).velocity("transition.slideUpIn", { duration: 600 })
});