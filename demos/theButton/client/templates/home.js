Template.home.helpers({
  numParticipants: function() {
    return Clicks.find().count();
  }
});
