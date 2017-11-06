import Ember from 'ember';

export default Ember.Controller.extend({
  roles:
    [{
        name:"admin",
        adminPermission: true,
        printPermission: false,
        users: ['username1','person1']
      },
      {
        name:"rmc",
        adminPermission: false,
        printPermission: true,
        users: ['username2','person2']
      },
      {
        name:"general user",
        adminPermission: false,
        printPermission: false,
        users: ['username3','person3']
      }]
});
