import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),

  model() {
    let recordCountRequest=this.store.adapterFor('application').host + "/records/count";
    let containerCountRequest=this.store.adapterFor('application').host + "/containers/count";

    return Ember.RSVP.hash({
      recordCount: this.get('ajax').request(recordCountRequest),
      containerCount: this.get('ajax').request(containerCountRequest),
    });

  },

  setupController(controller, models){
    controller.set("recordCount", models.recordCount.content);
    controller.set("containerCount", models.containerCount.content);
  },

  actions: {
    loading(transition, originRoute) {
      let controller = this.controllerFor('home');
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
