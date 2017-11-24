import Ember from 'ember';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  store: Ember.inject.service(),
  userList: null,
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
    },
    delete(){
      var store = this.get('store');
      this.get('ajax').request(store.adapterFor('application').host+'/roles/'+this.get('role.id'), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(jsonapirequest =>{
        window.location.reload(true);
      })
    },
    update(){
      var store = this.get('store');
      this.get('ajax').request(store.adapterFor('application').host+'/roles', {
        method: 'POST',
        data: JSON.stringify({
          id: this.get('role.id'),
          name: this.get('role.name'),
          users: this.get('role.users')
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(jsonapirequest =>{
        window.location.reload(true);
      })
    }
  }
});
