import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return [
      {
        name: "somewhere",
        users: [
          {name: 'username1'},
          {name: 'username2'},
          {name: 'username3'},
        ]
      },
      {
        name: "anywhere",
        users: [
          {name: 'person1'},
          {name: 'person2'},
          {name: 'person3'},
        ]
      }
    ]
  }
});
