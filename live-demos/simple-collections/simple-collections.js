Posts = new Meteor.Collection('posts');

if (Meteor.isClient) {
Meteor.subscribe('allPosts');

  Template.body.helpers({
    posts: function () {
      return Posts.find();
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // Seeding the database with initial posts.
    if(Posts.find().fetch().length === 0) {
      var seededPosts = [{
        title: 'First Post',
        content: 'This is the first post!'
      },
      {
        title: 'Meteor is amazing!',
        content: 'Woah'
      },
      {
        title: 'such wow. much win',
        content: 'to the moon'
      }];
      _.each(seededPosts, function(postToSeed) {
        Posts.insert(postToSeed);
      });
      console.log('SEEDED');
    }

    Meteor.publish('allPosts', function() {
      return Posts.find();
    });
  });
}

// meteor mongo: db.posts.insert({title: "Mongo Console", content: "Post inserted from the Mongo Console! - DBA"});
// browser console: Posts.insert({title: "Browser Developer Console", content: "Post inserted from the Browser Console! - 1337 Hax0r"});

// browser console danger: _.each(Posts.find().fetch(), function(doc) { Posts.remove(doc._id)});
// meteor remove insecure
// meteor remove autopublish
