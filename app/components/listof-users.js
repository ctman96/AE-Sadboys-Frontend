import Ember from 'ember';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  store: Ember.inject.service(),
  locations: ['somewhere', 'anywhere'],
  roles: ['admin', 'rmc'],
  edit: false,
  actions: {
    edit(){
      this.toggleProperty('edit');
    },
    removeItem(item){
      this.get('user.locations').removeObject(item)
    },
    addItem(item){
      this.get('user.locations').pushObject(item)
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
          role : this.get('user.roles'),
          locations : this.get('user.locations')
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
