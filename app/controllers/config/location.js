import Ember from 'ember';

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),
  actions: {
    create() {
      this.get('ajax').request(this.store.adapterFor('application').host+'/locations', {
        method: 'POST',
        data: JSON.stringify({
          name: this.get('newLocation')
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
