Session.setDefault('funFadersActive', 0);
Session.setDefault('overflow', false);
Template.dashLayout.onCreated(function() {
  this.autorun(() => {
    if (Session.get('overflow')) {
      $('body').removeClass('no-flow');
    } else {
      $('body').addClass('no-flow');
    }
  });
});