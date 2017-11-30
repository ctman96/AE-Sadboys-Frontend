import Ember from 'ember';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  store: Ember.inject.service(),
  edit: false,
  locationList: null,
  roleList: null,
  actions: {
    edit(){
      this.toggleProperty('edit');
    },
    removeItem(item){
      this.get('user.locations').removeObject(item)
    },
    addItem(item){
      this.get('user.locations').pushObject(item);
    },
    change_role(selection){
      this.get('user.roles').length = 0;
      this.get('user.roles').pushObject(selection);
    },
    remove_role(selection){
      this.get('user.roles').length = 0;
    },
    update(){
      var store = this.get('store');
      this.get('ajax').request(store.adapterFor('application').host+'/users', {
        method: 'POST',
        data: JSON.stringify({
          id : this.get('user.id'),
          userId : this.get('user.userId'),
          firstName : this.get('user.firstName'),
          lastName : this.get('user.lastName'),
          roles : this.get('user.roles'),
          locations : this.get('user.locations')
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
