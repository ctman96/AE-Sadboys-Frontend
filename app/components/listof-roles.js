import Ember from 'ember';

export default Ember.Component.extend({
  users: ['username1', 'username2', 'username3', 'person1', 'person2', 'person3'],
  tempUser: '',
  showUser: false,
  showRenameRole: false,
  confirmDelete: false,
  change: false,
  actions: {
    showUsers(){
      this.toggleProperty('showUser');
    },
    showRenameRole(){
      this.toggleProperty('showRenameRole');
    },
    confirmDelete(){
      this.toggleProperty('confirmDelete');
    },
    change(){
      this.toggleProperty('change');
    }
  }
});
