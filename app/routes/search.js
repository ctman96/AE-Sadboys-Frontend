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

    classification: {refreshModel: false},
    location: {refreshModel:false},
    schedule: {refreshModel:false},
    rectype: {refreshModel:false},
    state: {refreshModel:false},


    test: {refreshModel: false}
  },
  model(params){
    if(params.query) {
      let request = this.store.adapterFor('application').host + '/search?query=' + encodeURIComponent(params.query);
      if (params.page > 0) {request += ("&page="+params.page);}
      if (params.pageSize > 0) {request += ("&pageSize="+params.pageSize);}

      if (!params.records) {request += ("&records="+params.records);}
      if (!params.containers) {request += ("&containers="+params.containers);}

      if (params.created) {request += ("&created="+encodeURIComponent(params.created));}
      if (params.updated) {request += ("&updated="+encodeURIComponent(params.updated));}
      if (params.closed) {request += ("&closed="+encodeURIComponent(params.closed));}

      if (params.classification) {request += ("&classification="+encodeURIComponent(params.classification));}
      if (params.location) {request += ("&location="+encodeURIComponent(params.location));}
      if (params.schedule) {request += ("&schedule="+encodeURIComponent(params.schedule));}
      if (params.state) {request += ("&state="+encodeURIComponent(params.state));}
      if (params.rectype) {request += ("&type="+encodeURIComponent(params.rectype));}
      Ember.Logger.log(request);

      return this.get('ajax').request(request);
    }
    return {};
  },
  afterModel(model, transition) {
    let N = Ember.get(model, 'page.totalPages');
    let controller = this.controllerFor('search')
    controller.set('pages', Array.apply(null, {length: N}).map(Function.call, Number));
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
