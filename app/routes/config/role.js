import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  model(){
    return this.get('store').findAll('role');
  },
  actions: {
    create() {
      return this.get('ajax').request(this.store.adapterFor('application').host+'/roles', {
        method: 'POST',
        data: {
          name: this.get('newRole')
        }
      });
    }
  }
});
