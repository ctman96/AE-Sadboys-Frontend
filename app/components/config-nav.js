import Ember from 'ember';
const { Controller, computed, A, inject } = Ember;

export default Ember.Component.extend({
  router: inject.service(),

  currentRouteName: computed.readOnly('router.currentRouteName'),

  show: true,
  actions: {
    show() {
      this.toggleProperty(hidden);
    },
    noop() {
    }
  }
});
