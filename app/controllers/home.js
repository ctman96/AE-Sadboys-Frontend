import Ember from 'ember';

export default Ember.Controller.extend({
  query: '',
  actions: {
    search: function(){
      if(this.query != null) {
        this.transitionToRoute('/search?query='+this.query);
      }
      else{
        this.transitionToRoute('/search');
      }
    }
  }
});
