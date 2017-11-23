import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller, models){
    const containersString = localStorage.getItem("containersToPrint");
    let containers = JSON.parse(containersString);
    containers = containers ? containers : [];

    controller.set('containers', containers);
  }
});
