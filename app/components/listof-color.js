import Ember from 'ember';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  store: Ember.inject.service(),
  edit: false,
  actions: {
    edit(){
      this.toggleProperty('edit');
    },
    delete(){
      var store = this.get('store');
      this.get('ajax').request(store.adapterFor('application').host+'/labelcolours/'+this.get('role.id'), {
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
      this.get('ajax').request(store.adapterFor('application').host+'/labelcolours', {
        method: 'POST',
        data: JSON.stringify({
          key: this.get('colour.key'),
          colours: this.get('colour.colour'),
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
