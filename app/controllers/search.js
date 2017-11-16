import Ember from 'ember';

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),
  showAdvancedSearch: false,

  query: null,
  page: 0,
  pageSize: 10,

  limit: 10,
  limitOptions : [10, 20, 30],

  searchResults: null,
  searchQuery: null,


  showResults: true,


  submit(query){
    return this.get('ajax').request(this.store.adapterFor('application').host+'/search?query='+query, {
      method: 'GET'
    })
      .then(function(data) {
        return data;
      });
  },

  actions: {
    toggleAdvancedSearch: function() {
      const newState = !this.showAdvancedSearch;
      this.set('showAdvancedSearch', newState);
    },

    incrementPage: function(){
      this.set ('page', this.page+1);
    },

    decrementPage: function(){
      this.set ('page', this.page-1)
    },

    search: function(){
      window.location.reload(true);
      /*
      //todo save last search for pagination
      this.submit(this.query).then((data)=>{
        this.set('searchResults', data).bind(this);
        this.set('showResults', false);
        Ember.run.next(this, function() {
          this.set('showResults', true);
        });
      });
      */
    }
  }
});
