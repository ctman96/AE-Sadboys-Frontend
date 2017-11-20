import Ember from 'ember';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  users: ['username1', 'username2', 'username3', 'person1', 'person2', 'person3'],
  edit: false,
  actions: {
    edit(){
      this.toggleProperty('edit');
    },
    removeItem(item){
      this.get('role.users').removeObject(item)
    },
    addItem(item){
      this.get('role.users').pushObject(item)
    }
  }
});
