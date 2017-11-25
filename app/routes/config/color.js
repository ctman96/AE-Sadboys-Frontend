import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  queryParams:{
    page: {refreshModel:true},
    pageSize: {refreshModel:true},
  },
  model(params){
    try {
      let request = this.store.adapterFor('application').host + "/labelcolours";
      if (params.page > 0) {
        request += ("?page=" + params.page);
        if (params.pageSize > 0) {
          request += ("&pageSize=" + params.pageSize);
        }
      }
      else{
        if (params.pageSize > 0) {
          request += ("?pageSize=" + params.pageSize);
        }
      }

      return this.get('ajax').request(request);
    }
    catch(error){
      Ember.Logger.log(error);
    }
    return null;
  },
  setupController(controller, model){

    controller.set('model', model.content);
    //Pagination Data
    let totalPages = model.page.totalPages;
    controller.set('pages', Array.apply(null, {length: totalPages}).map(Function.call, Number));

    let totalElements = model.page.totalElements;
    controller.set('totalElements', totalElements);
  },
  actions: {
    refreshModel: function(){
      this.refresh();
    }
  }
});
