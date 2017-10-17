import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return[
      {
        name: 'username1',
        role: 'admin',
        location: ['somewhere']
      },
      {
        name: 'username2',
        role: 'rmc',
        location: ['somewhere']
      },
      {
        name: 'username3',
        role: 'general user',
        location: ['somewhere']
      },
      {
        name: 'person1',
        role: 'admin',
        location: ['anywhere']
      },
      {
        name: 'person2',
        role: 'rmc',
        location: ['anywhere']
      },
      {
        name: 'person3',
        role: 'general user',
        location: ['anywhere']
      }];
  }
});
