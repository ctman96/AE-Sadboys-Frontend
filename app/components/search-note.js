import Ember from 'ember';

const { $ } = Ember;

export default Ember.Component.extend({
  actions: {
    openDialog(event) {
      this.set('dialogOrigin', $(event.currentTarget));
      this.set('showNotesDialog', true);
    },

    closeDialog(result) {
      this.set('result', result);
      this.set('showNotesDialog', false);
    },
  }
});
