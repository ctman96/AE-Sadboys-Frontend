import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return[
      {
        name: 'username1',
        role: 'admin',
        location: 'somewhere'
      },
      {
        name: 'username2',
        role: 'rmc',
        location: 'anywhere'
      },
      {
        name: 'username3',
        role: 'general user',
        location: 'somewhere'
      }];
  }
});
