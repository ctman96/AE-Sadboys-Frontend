import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  queryParams:{
    query: {refreshModel:false},

    page: {refreshModel:true},
    pageSize: {refreshModel:true},

    records: {refreshModel:false},
    containers: {refreshModel:false},

    created: {refreshModel:false},
    updated: {refreshModel:false},
    closed: {refreshModel:false},

    location: {refreshModel:false},
    schedule: {refreshModel:false},
    state: {refreshModel:false},
    type: {refreshModel:false},
  },
  model(params){
    if(params.query != null) {
      let request = this.store.adapterFor('application').host + '/search?query=' + params.query;
      if (params.page != null) {request += ("&page="+params.page);}
      if (params.pageSize != null) {request += ("&pageSize="+params.pageSize);}

      if (params.records != null) {request += ("&records="+params.records);}
      if (params.containers != null) {request += ("&containers="+params.containers);}

      if (params.created != null) {request += ("&created="+params.created);}
      if (params.updated != null) {request += ("&updated="+params.updated);}
      if (params.closed != null) {request += ("&closed="+params.closed);}

      if (params.location != null) {request += ("&location="+params.location);}
      if (params.schedule != null) {request += ("&schedule="+params.schedule);}
      if (params.state != null) {request += ("&state="+params.state);}
      if (params.type != null) {request += ("&type="+params.type);}
      Ember.Logger.log(request);

      return this.get('ajax').request(request);
    }
    return {};
  },

  actions: {
    loading(transition, originRoute) {
      let controller = this.controllerFor('search');
      controller.set('currentlyLoading', true);
      transition.promise.finally(function() {
        controller.set('currentlyLoading', false);
      });
    }
  }
});
