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
      this.get('ajax').request(store.adapterFor('application').host+'/classhierarchies/'+this.get('classhierarchy.id'), {
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
      this.get('ajax').request(store.adapterFor('application').host+'/classhierarchies', {
        method: 'POST',
        data: JSON.stringify({
          id: this.get('classhierarchy.id'),
          parent: this.get('classhierarchy.parent.id'),
          rel: this.get('classhierarchy.rel'),
          child: this.get('classhierarchy.child.id')
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
