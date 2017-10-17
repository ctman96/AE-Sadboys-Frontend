import Ember from 'ember';

export default Ember.Component.extend({
  users: ['username1', 'username2', 'username3', 'person1', 'person2', 'person3'],
  tempUser: '',
  showUser: false,
  showRenameLocation: false,
  confirmDelete: false,
  actions: {
    showUsers(){
      this.toggleProperty('showUser');
    },
    showRenameLocation(){
      this.toggleProperty('showRenameLocation');
    },
    confirmDelete(){
      this.toggleProperty('confirmDelete');
    }
  }
});
