import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return[
        {
          name: "somewhere",
          users: ['username1','username2','username3']
        },
        {
          name: "anywhere",
          users: ['person1','person2','person3']
        }
      ]
  }
});
