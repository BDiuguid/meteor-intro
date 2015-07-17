Template.clickLog.helpers({
  clickRecords: function() {
    return Clicks.find();
  },
  timeRemainingParsed: function() {
    var rem = Math.round(this.timeRemaining / 1000);
    if (rem < 10) {
      rem = "0" + rem;
    }
    return rem;
  }
});
