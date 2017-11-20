import Ember from 'ember';

export default Ember.Route.extend({

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
