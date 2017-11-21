import Ember from 'ember';

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),
  actions: {
    create() {
      this.get('ajax').request(this.store.adapterFor('application').host+'/locations', {
        method: 'POST',
        data: JSON.stringify({
          name: this.get('newLocation'),
          code: this.get('newCode'),
          locked: this.get('locked')
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

//curl -H "Content-Type: application/json" -X POST -d '{"name" : "test", "code":"tst", "locked":"true"}' https://ipfms-server.herokuapp.com/locations
