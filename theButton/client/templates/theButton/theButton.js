Template.theButton.helpers({
  timeRemainingWhenClicked: function() {
    var click = Clicks.findOne({userId: Meteor.userId()});
    if (click) {
      var rem = Math.round(click.timeRemaining / 1000);
      if (rem < 10) {
        rem = "0" + rem;
      }
      return rem;
    }
  },
  clicked: function() {
    if (!Meteor.userId()) {
      return;
    }
    return moment(Meteor.user().date).format("MMM DD \\a\\t HH:mm:ss");
  },
  timeRemaining: function() {
    if (!Timer.findOne()) {
      return;
    }
    return Timer.findOne().value > 0;
  },
  countdown: function() {
    if (!Timer.findOne()) {
      return;
    }
    return Timer.findOne().value;
  }
});

Template.theButton.events({
  'click button': function(evt) {
    if (!Meteor.user()) {
      return;
    }
    var change = { timeRemaining: Timer.findOne().value, date: new Date(), email: Meteor.user().emails[0].address };
    var userId = { userId: Meteor.userId() };

    var click = Clicks.findOne(userId);
    if (!click) {
      Clicks.insert(_.extend(change, userId));
      Meteor.users.update(Meteor.userId(), {$set: change});
    }
  }
});
