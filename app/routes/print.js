import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  beforeModel: function() {

    if (this.get('session.data.authenticated') &&  (this.get('session.data.authenticated.admin') || this.get('session.data.authenticated.rmc')))
    {
      return;
    }
    else{
      this.transitionTo('home');
    }
  },
});
