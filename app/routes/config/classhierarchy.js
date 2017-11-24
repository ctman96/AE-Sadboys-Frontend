import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  queryParams:{
    page: {refreshModel:true},
    pageSize: {refreshModel:true},
  },
  model(params){
    try {
      let request = this.store.adapterFor('application').host + "/classhierarchies";
      let classrequest = this.store.adapterFor('application').host + "/classifications/all";
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

      return Ember.RSVP.hash({
        hierarchyModel: this.get('ajax').request(request),
        classModel: this.get('ajax').request(classrequest)
      })
    }
    catch(error){
      Ember.Logger.log(error);
    }
  },
  setupController(controller, model){
    try{
      controller.set('hierarchyList', model.hierarchyModel.content);
      controller.set('classList', model.classModel);
      //Pagination Data
      let totalPages = model.hierarchyModel.page.totalPages;
      controller.set('pages', Array.apply(null, {length: totalPages}).map(Function.call, Number));

      let totalElements = model.hierarchyModel.page.totalElements;
      controller.set('totalElements', totalElements);
    }
    catch(error){
      Ember.Logger.log(error);
    }
  }
});
