Meteor.startup(function() {
  Meteor.subscribe("userData");
  Meteor.subscribe("clicks");
  Meteor.subscribe("timer");
});
