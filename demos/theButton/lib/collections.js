Clicks = new Mongo.Collection("clicks");
Timer = new Mongo.Collection("timer");

TIMER_INIT = 1000 * 60;


Meteor.methods({
  reset: function() {
    var timer = Timer.findOne();
    if (timer) {
      Timer.update(timer._id, {$set: {value: TIMER_INIT}});
      serverTimer = TIMER_INIT;
    }
  }
});

Meteor.users.allow({
  update: function(userId, doc) {
    return Timer.findOne().value > 0 && userId === doc._id;
  }
});

Clicks.allow({
  insert: function(userId, doc) {
    if (serverTimer > 0 && userId === doc.userId) {
      var timer = Timer.findOne();
      Timer.update(timer._id, {$set: {value: TIMER_INIT}});
      serverTimer = TIMER_INIT;
      return true;
    }
    return false;
  }
});
