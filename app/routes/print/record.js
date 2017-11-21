import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller, models){
    const recordsString = localStorage.getItem("recordsToPrint");
    let records = JSON.parse(recordsString);
    records = records ? records : [];

    controller.set('records', records);
  }
});
