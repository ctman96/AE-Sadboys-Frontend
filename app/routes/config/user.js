import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  queryParams:{
    page: {refreshModel:true},
    pageSize: {refreshModel:true},
  },
  model(params){
    try {
      let request = this.store.adapterFor('application').host + "/users";
      let locationRequest = this.store.adapterFor('application').host + "/locations/all";
      let roleRequest = this.store.adapterFor('application').host + "/roles";
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
        userModel: this.get('ajax').request(request),
        locationModel: this.get('ajax').request(locationRequest),
        roleModel: this.get('ajax').request(roleRequest)
      })
    }
    catch(error){
      Ember.Logger.log(error);
    }
  },
  setupController(controller, model){
    try{
      controller.set('userList', model.userModel.content);
      controller.set('locationList', model.locationModel.content);
      controller.set('roleList', model.roleModel.content);
      //Pagination Data
      let totalPages = model.userModel.page.totalPages;
      controller.set('pages', Array.apply(null, {length: totalPages}).map(Function.call, Number));

      let totalElements = model.userModel.page.totalElements;
      controller.set('totalElements', totalElements);
    }
    catch(error){
      Ember.Logger.log(error);
    }
  },
  actions: {
    refreshModel: function(){
      this.refresh();
    }
  }
});
