import Ember from 'ember';

export default Ember.Component.extend({
  locations: ['somewhere', 'anywhere'],
  roles: ['admin', 'rmc'],
  edit: false,
  actions: {
    edit(){
      this.toggleProperty('edit');
    },
    removeItem(item){
      this.get('user.locations').removeObject(item)
    },
    addItem(item){
      this.get('user.locations').pushObject(item)
    }
  }
});
