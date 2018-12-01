Glitches = new Mongo.Collection('glitches');

Meteor.methods({
  glitchesInsert: function(appt) {
    var glitch = _.extend(appt, {
      createdAt: new Date()
    });
    Glitches.insert(glitch);
  }
});