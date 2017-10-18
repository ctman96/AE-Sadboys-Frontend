import Ember from 'ember';

export default Ember.Component.extend({
  router: Ember.inject.service('-routing'),

  actions: {
    noop() {
    }
  }
});
