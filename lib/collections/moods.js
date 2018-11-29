Moods = new Mongo.Collection('moods');

Meteor.methods({
  moodsInsert: function(appt) {
    var mood = _.extend(appt, {
      createdAt: new Date()
    });
    Moods.insert(mood);
  }
});