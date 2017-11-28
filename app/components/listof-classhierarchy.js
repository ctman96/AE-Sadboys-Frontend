import Ember from 'ember';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  store: Ember.inject.service(),
  classList: null,
  edit: false,
  actions: {
    edit(){
      this.toggleProperty('edit');
    },
    updateParent: function(selection){
      try {
        this.set('classhierarchy.parent', selection);
      }
      catch(error) {
        Ember.Logger.log(error);
        this.set('classhierarchy.parent', null);
      }
    },
    updateChild: function(selection){
      try {
        this.set('classhierarchy.child', selection);
      }
      catch(error) {
        Ember.Logger.log(error);
        this.set('classhierarchy.child', null);
      }
    },
    delete(){
      var store = this.get('store');
      this.get('ajax').request(store.adapterFor('application').host+'/classhierarchies/'+this.get('classhierarchy.id'), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(jsonapirequest =>{
        this.attrs.refreshRoute()
      })
    },
    update(){
      var store = this.get('store');
      this.get('ajax').request(store.adapterFor('application').host+'/classhierarchies', {
        method: 'POST',
        data: JSON.stringify({
          id: this.get('classhierarchy.id'),
          parent: this.get('classhierarchy.parent'),
          rel: this.get('classhierarchy.rel'),
          child: this.get('classhierarchy.child')
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(jsonapirequest =>{
        this.attrs.refreshRoute()
      })
    }
  }
});
