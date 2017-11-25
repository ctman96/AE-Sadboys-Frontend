import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    if (this.get('session.data.authenticated'))
    {
      if (this.get('session.data.authenticated.admin') || this.get('session.data.authenticated.rmc'))
      {
        this.transitionTo('config');
      }
      else
      {
        this.transitionTo('home');
      }
    }
  },
});
