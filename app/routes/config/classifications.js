import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return this.get('store').findAll('classification');
  }
  /*pageData(){
    return this.get('store').findAll('classification').get('page');
  }*/
});
