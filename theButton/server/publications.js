Meteor.startup(function() {
  serverTimer = TIMER_INIT; // Server timer is global with respect to the server side.

  var timer = Timer.findOne();
  var timerId = null;
  if (!timer) {
    Timer.insert({value: TIMER_INIT});
    timer = Timer.findOne();
  }

  Meteor.setInterval(function() {
    Timer.update(timer._id, {$set: {value: serverTimer}});
    serverTimer -= 1000;
    if (Timer.findOne().value < 0) {
      Timer.update(timer._id, {$set: {value: TIMER_INIT}});
      serverTimer = TIMER_INIT;
    }
  }, 1000);

});

Meteor.publish("timer", function() {
  return Timer.find();
});

Meteor.publish("userData", function() {
  return Meteor.users.find({}, {fields: {date: 1}});
});

Meteor.publish("clicks", function() {
  return Clicks.find();
});
