import Ember from 'ember';

export default Ember.Component.extend({
  edit: false,
  actions: {
    edit(){
      this.toggleProperty('edit');
    }
  }
});
