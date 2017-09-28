Session.setDefault('currentHeader', 'headerDash');

Template.headerBase.onCreated(function() {
  console.log(Session.get('currentHeader'));
});

Template.headerBase.helpers({
  currentHeader: function() {
    return Session.get('currentHeader');
  },
});