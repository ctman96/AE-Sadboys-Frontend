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

    try {
      let scheduleRequest = this.store.adapterFor('application').host + "/retentionschedules";
      let typeRequest = this.store.adapterFor('application').host + "/recordtypes";
      let stateRequest = this.store.adapterFor('application').host + "/recordstates";
      let locationRequest = this.store.adapterFor('application').host + "/locations/all";

      if (params.query) {
        let request = this.store.adapterFor('application').host + '/search?query=' + encodeURIComponent(params.query);
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
          request += ("&created=" + encodeURIComponent(params.created));
        }
        if (params.updated) {
          request += ("&updated=" + encodeURIComponent(params.updated));
        }
        if (params.closed) {
          request += ("&closed=" + encodeURIComponent(params.closed));
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

        return Ember.RSVP.hash({
          resultModel: this.get('ajax').request(request),
          scheduleModel: this.get('ajax').request(scheduleRequest),
          typeModel: this.get('ajax').request(typeRequest),
          stateModel: this.get('ajax').request(stateRequest),
          locationModel: this.get('ajax').request(locationRequest)
        });
      }
      return Ember.RSVP.hash({
        resultModel: null,
        scheduleModel: this.get('ajax').request(scheduleRequest),
        typeModel: this.get('ajax').request(typeRequest),
        stateModel: this.get('ajax').request(stateRequest),
        locationModel: this.get('ajax').request(locationRequest)
      });
    }
    catch(error){
      Ember.Logger.log(error);
    }
  },

  setupController(controller, models){
    try {
      controller.set('resultModel', models.resultModel);
      controller.set('schedules', models.scheduleModel.content);
      controller.set('types', models.typeModel.content);
      controller.set('states', models.stateModel.content);
      controller.set('locations', models.locationModel.content);

      //Pagination Data
      let totalPages = models.resultModel.page.totalPages;
      controller.set('pages', Array.apply(null, {length: totalPages}).map(Function.call, Number));

      let totalElements = models.resultModel.page.totalElements;
      controller.set('totalElements', totalElements);
    }
    catch(error){
      Ember.Logger.log(error);
    }
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
