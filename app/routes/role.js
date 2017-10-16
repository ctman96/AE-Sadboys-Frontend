import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return[
      {
        name:"admin",
        adminPermission: true,
        printPermission: false
      },
      {
        name:"rmc",
        adminPermission: false,
        printPermission: true
      },
      {
        name:"general user",
        adminPermission: false,
        printPermission: false
      }
    ]
  }
});
