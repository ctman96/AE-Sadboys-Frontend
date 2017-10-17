import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return[
      {
        name:"admin",
        adminPermission: true,
        printPermission: false,
        users: [
          {name: 'username1'},
          {name: 'person1'}
        ]
      },
      {
        name:"rmc",
        adminPermission: false,
        printPermission: true,
        users: [
          {name: 'username2'},
          {name: 'person2'}
        ]
      },
      {
        name:"general user",
        adminPermission: false,
        printPermission: false,
        users: [
          {name: 'username3'},
          {name: 'person3'}
        ]
      }
    ]
  }
});
