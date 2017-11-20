import Ember from 'ember';

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),
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
