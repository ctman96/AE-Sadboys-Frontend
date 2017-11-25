import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  queryParams:{
    page: {refreshModel:true},
    pageSize: {refreshModel:true},
  },
  model(params){
    try {
      let request = this.store.adapterFor('application').host + "/roles";
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
        roleModel: this.get('ajax').request(request),
        userModel: this.get('ajax').request(userRequest)
      })
    }
    catch(error){
      Ember.Logger.log(error);
    }
  },
  setupController(controller, model){
    try{
      controller.set('roleList', model.roleModel.content);
      controller.set('userList', model.userModel);
      //Pagination Data
      let totalPages = model.roleModel.page.totalPages;
      controller.set('pages', Array.apply(null, {length: totalPages}).map(Function.call, Number));

      let totalElements = model.roleModel.page.totalElements;
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
