import Ember from 'ember';

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),
  actions: {
    create() {
      this.get('ajax').request(this.store.adapterFor('application').host+'/classhierarchy', {
        method: 'POST',
        data: JSON.stringify({
          parent: this.get('pname'),
          rel: this.get('rel'),
          child: this.get('cname')
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
