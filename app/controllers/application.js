import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    toggle(propName) {
      this.toggleProperty(propName);
    }
  },
});
