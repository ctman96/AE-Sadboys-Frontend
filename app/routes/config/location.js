import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  queryParams:{
    page: {refreshModel:true},
    pageSize: {refreshModel:true},
  },
  model(params){
    try {
      let request = this.store.adapterFor('application').host + "/locations";
      let userRequest = this.store.adapterFor('application').host + "/users/all";
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
        locationModel: this.get('ajax').request(request),
        userModel: this.get('ajax').request(userRequest)
      })
    }
    catch(error){
      Ember.Logger.log(error);
    }
    return null;
  },
  setupController(controller, model){
    try{
      controller.set('locationList', model.locationModel.content);
      controller.set('userList', model.userModel);
      //Pagination Data
      let totalPages = model.locationModel.page.totalPages;
      controller.set('pages', Array.apply(null, {length: totalPages}).map(Function.call, Number));

      let totalElements = model.locationModel.page.totalElements;
      controller.set('totalElements', totalElements);
    }
    catch(error){
      Ember.Logger.log(error);
    }
  }
});
