import Ember from 'ember';

export default Ember.Component.extend({
  locations: ['somewhere', 'anywhere'],
  roles: ['admin', 'rmc', 'general user'],
  edit: false,
  actions: {
    edit(){
      this.toggleProperty('edit');
    },
    removeItem(item){
      this.get('user.location').removeObject(item)
    },
    addItem(item){
      this.get('user.location').pushObject(item)
    }
  }
});
