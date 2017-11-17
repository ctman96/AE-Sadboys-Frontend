import Ember from 'ember';

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),

  showAdvancedSearch: false,
  showResults: true,
  currentlyLoading: false,

  //Query Params
  query: null,
  page: 0,
  pageSize: 10,
  records: true,
  containers: true,
  created: null,
  updated: null,
  closed: null,
  location: null,
  schedule: null,
  state: null,
  type: null,

  limit: 10,
  limitOptions : [10, 20, 30],
  pages: [],
  searchResults: null,
  searchQuery: null,

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
      this.toggleProperty('showAdvancedSearch');
    },

    incrementPage: function(){
      this.set ('page', this.page+1);
    },

    decrementPage: function(){
      this.set ('page', this.page-1)
    },

    search: function(){
      this.set('currentlyLoading', true);
      window.location.reload(true);

    }
  }
});
