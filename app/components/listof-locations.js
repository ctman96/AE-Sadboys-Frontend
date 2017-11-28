import Ember from 'ember';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  store: Ember.inject.service(),
  userList: null,
  edit: false,
  showusers: false,
  actions: {
    edit(){
      this.toggleProperty('edit');
    },
    showusers(){
      this.toggleProperty('showusers');
    },
    removeItem(item){
      this.get('location.users').removeObject(item)
    },
    addItem(item){
      this.get('location.users').pushObject(item)
    },
    delete(){
      var store = this.get('store');
      this.get('ajax').request(store.adapterFor('application').host+'/locations/'+this.get('location.id'), {
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
      this.get('ajax').request(store.adapterFor('application').host+'/locations', {
        method: 'POST',
        data: JSON.stringify({
          id: this.get('location.id'),
          name: this.get('location.name'),
          code: this.get('location.code'),
          locked: this.get('location.locked'),
          users: this.get('location.users')
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
