import Ember from 'ember';
import { CanMixin } from 'ember-can';


export default Ember.Route.extend(CanMixin, {
  beforeModel() {
    let result = this._super(...arguments);

    if (!this.can('write post')) {
      return this.transitionTo('index');
    }

    return result;
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
