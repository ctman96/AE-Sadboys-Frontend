import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return[
      {
        userId : "a1",
        firstName: "a",
        lastName: "1",
        role: 'admin',
        location: ['somewhere']
      },
      {
        userId : "b2",
        firstName: "b",
        lastName: "2",
        role: 'rmc',
        location: ['somewhere']
      },
      {
        userId : "c3",
        firstName: "c",
        lastName: "3",
        role: 'general user',
        location: ['somewhere']
      },
      {
        userId : "d4",
        firstName: "d",
        lastName: "4",
        role: 'admin',
        location: ['anywhere']
      },
      {
        userId : "e5",
        firstName: "e",
        lastName: "5",
        role: 'rmc',
        location: ['anywhere']
      },
      {
        userId : "f6",
        firstName: "f",
        lastName: "6",
        role: 'general user',
        location: ['anywhere']
      }];
  }
});
