import Ember from 'ember';

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),
  actions: {
    create() {
      this.get('ajax').request(this.store.adapterFor('application').host+'/labelcolours', {
        method: 'POST',
        data: JSON.stringify({
          key: this.get('key'),
          colour: this.get('newColour')
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
