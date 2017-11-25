import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  //URL RequestParameters
  queryParams:{
    doSearch: {refreshModel:false},
    query: {refreshModel:false},
    quickSearch: {refreshModel:false},

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

    try {
      //Generate Request URLS
      let scheduleRequest = this.store.adapterFor('application').host + "/retentionschedules";
      let typeRequest = this.store.adapterFor('application').host + "/recordtypes"; //todo change to /all in backend?
      let stateRequest = this.store.adapterFor('application').host + "/recordstates";
      let locationRequest = this.store.adapterFor('application').host + "/locations/all";
      let classificationRequest = this.store.adapterFor('application').host + "/classifications/all";

      if(params.doSearch){
        let request = this.store.adapterFor('application').host + '/search?query=' + encodeURIComponent(params.query);
        if (params.quickSearch){
          request+=("&qs=" + params.quickSearch)
        }
        if (params.page > 0) {
          request += ("&page=" + params.page);
        }
        if (params.pageSize > 0) {
          request += ("&pageSize=" + params.pageSize);
        }
        if (!params.records) {
          request += ("&records=" + params.records);
        }
        if (!params.containers) {
          request += ("&containers=" + params.containers);
        }

        if (params.created) {
          request += ("&created=" + params.created);
        }
        if (params.updated) {
          request += ("&updated=" + params.updated);
        }
        if (params.closed) {
          request += ("&closed=" + params.closed);
        }

        if (params.classification) {
          request += ("&classification=" + encodeURIComponent(params.classification));
        }
        if (params.location) {
          request += ("&location=" + encodeURIComponent(params.location));
        }
        if (params.schedule) {
          request += ("&schedule=" + encodeURIComponent(params.schedule));
        }
        if (params.state) {
          request += ("&state=" + encodeURIComponent(params.state));
        }
        if (params.rectype) {
          request += ("&type=" + encodeURIComponent(params.rectype));
        }
        Ember.Logger.log(request);

        //Return on completion of all promises
        return Ember.RSVP.hash({
          //Ajax calls using generated request urls
          resultModel: this.get('ajax').request(request),
          scheduleModel: this.get('ajax').request(scheduleRequest),
          typeModel: this.get('ajax').request(typeRequest),
          stateModel: this.get('ajax').request(stateRequest),
          locationModel: this.get('ajax').request(locationRequest),
          classificationModel: this.get('ajax').request(classificationRequest),
          quickSearch: '{"quickSearch'+ params.quickSearch +'}'
        });
      }
      else{
        return Ember.RSVP.hash({
          //Ajax calls using generated request urls
          resultModel: null,
          scheduleModel: this.get('ajax').request(scheduleRequest),
          typeModel: this.get('ajax').request(typeRequest),
          stateModel: this.get('ajax').request(stateRequest),
          locationModel: this.get('ajax').request(locationRequest),
          classificationModel: this.get('ajax').request(classificationRequest),
          quickSearch: '{"quickSearch":'+ params.quickSearch +'}'
        });
      }
    }
    catch(error){

    }
  },

  setupController(controller, models){
    try {
      controller.set('resultModel', models.resultModel);
      controller.set('schedules', models.scheduleModel.content);
      controller.set('types', models.typeModel.content);
      controller.set('states', models.stateModel.content);
      controller.set('locations', models.locationModel.content);
      controller.set('classifications', models.classificationModel);

      //Pagination Data
      let totalPages = models.resultModel.page.totalPages;
      controller.set('totalPages', totalPages);
      controller.set('pages', Array.apply(null, {length: totalPages}).map(Function.call, Number));

      let totalElements = models.resultModel.page.totalElements;
      controller.set('totalElements', totalElements);
    }
    catch(error){

    }
    if(models.quickSearch){
      controller.set('showAdvancedSearch', !models.quickSearch.quickSearch);
    }
    else{
      controller.set('showAdvancedSearch', true);
    }

    controller.set('currentlyLoading', false);
  },

  actions: {
    loading(transition, originRoute) {
      let controller = this.controllerFor('search');
      controller.set('currentlyLoading', true);
      transition.promise.finally(function() {
        controller.set('currentlyLoading', false);
      });
    },
    refreshModel: function(){
      this.refresh();
    }
  }
});
