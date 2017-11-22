import Ember from 'ember';

export default Ember.Controller.extend({
  query: '',
  actions: {
    search: function(){
      if(this.query) {
        this.set('currentlyLoading', true);
        this.transitionToRoute('/search?query='+this.query+'&doSearch=true&quickSearch=true');
      }
      else{
        this.transitionToRoute('/search');
      }
    }
  }
});
