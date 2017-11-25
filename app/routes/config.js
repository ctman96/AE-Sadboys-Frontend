import Ember from 'ember';


export default Ember.Route.extend({
  beforeModel: function() {
    if (this.get('session.data.authenticated') && this.get('session.data.authenticated.admin'))
    {
      return;
    }
    else{
      this.transitionTo('home');
    }
  },
  model: function(){

  },

  actions: {
    loading(transition, originRoute) {
      let controller = this.controllerFor('config');
      controller.set('currentlyLoading', true);
      transition.promise.finally(function() {
        controller.set('currentlyLoading', false);
      });
    }
  }
});
