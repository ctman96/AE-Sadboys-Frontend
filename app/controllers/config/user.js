import Ember from 'ember';

export default Ember.Controller.extend({
  //Query Params
  query: null,
  page: 0,
  pageSize: 10,

  //Pagination data
  limit: 10,
  limitOptions : [10, 20, 30],
  pages: [],
  totalElements: null,
  searchResults: null,
  searchQuery: null,

  userList: null,
  locationList: null,
  roleList: null,

  actions: {
    incrementPage: function(){
      if (this.page < this.totalPages){
        this.set ('page', this.page+1);
      }
    },

    decrementPage: function(){
      if (this.page > 0) {
        this.set('page', this.page - 1)
      }
    },
    refreshRoute: function(){
      this.send('refreshModel');
    }
  }
});
