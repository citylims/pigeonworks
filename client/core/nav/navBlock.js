Template.navBlock.onCreated(function(){
  this.showCaption = new ReactiveVar(false);
});

Template.navBlock.helpers({
  feat: function() {
    return Template.instance().data.feat;
  }
});

Template.navBlock.events({
  'click [data-action="goNavBlock"]': function(e,t) {
    FlowRouter.go(t.data.feat.path);
  },
  'mouseenter .card': function(e,t) { 
    var block = $(e.currentTarget).attr('nav-block');
    if (block === t.data.feat.title) {
      if (t.showCaption.get() || $(e.currentTarget).hasClass('velocity-animating')) {
        console.log("cant run again already")
      }  else {
        var caption = $(e.currentTarget).children('.caption-block');
        t.showCaption.set(true);
        $(caption).velocity('transition.bounceUpIn', { 
          duration: 300, 
          complete: () => {
           $(caption).children('.block-title').velocity('transition.fadeIn', {duration: 250});
          }
        });
      }     
    }
  },
  'mouseleave .card': function(e,t) {
    var block = $(e.currentTarget).attr('nav-block');
    if (block === t.data.feat.title) {
      if (!t.showCaption.get() || $(e.currentTarget).hasClass('velocity-animating')) {
        console.log("cant run again already")
      }  else {
        var caption = $(e.currentTarget).children('.caption-block');
        t.showCaption.set(false);
        $(caption).children('.block-title').velocity('transition.fadeOut', { 
          duration: 250, 
          complete: () => {
           $(caption).velocity('transition.bounceDownOut', {duration: 300});
          }
        });
      }     
    }
  }
});

Template.navBlock.onRendered(function(){
  $(this.firstNode).velocity("transition.slideUpIn", { duration: 300 })
});