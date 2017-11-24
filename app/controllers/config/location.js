import Ember from 'ember';

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),

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

  locationList: null,
  userList: null,

  actions: {
    create() {
      this.get('ajax').request(this.store.adapterFor('application').host+'/locations', {
        method: 'POST',
        data: JSON.stringify({
          name: this.get('newLocation'),
          code: this.get('newCode'),
          locked: this.get('locked')
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(jsonapirequest =>{
        window.location.reload(true);
      })
    },
    incrementPage: function(){
      this.set ('page', this.page+1);
    },

    decrementPage: function(){
      this.set ('page', this.page-1)
    }
  }
});

/*
TODO:
-need user-role integration
-user-location
-classhierarchy data structure wtf?? btw the url is classhierarchies
-classhierarchy all

DONE: users, colours, classification
*/
