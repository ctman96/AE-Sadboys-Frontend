import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  queryParams:{
    query: {refreshModel:false},
    page: {refreshModel:true},
    pageSize: {refreshModel:true},
  },
  model(params){
    if(params.query != null) {
      var request = this.store.adapterFor('application').host + '/search?query=' + params.query;
      if (params.page != null) {
        request += ("&page="+params.page);
      }
      if (params.pageSize != null) {
        request += ("&pageSize="+params.pageSize);
      }

      return this.get('ajax').request(request);
    }
  }
});
