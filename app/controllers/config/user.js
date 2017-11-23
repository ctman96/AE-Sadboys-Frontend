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

  locationList: null,
  roleList: null,
  
  actions: {
    removeItem(item){
      this.get('user.locations').removeObject(item)
    },
    addItem(item){
      this.get('user.locations').pushObject(item)
    },
    update(){
      var store = this.get('store');
      this.get('ajax').request(store.adapterFor('application').host+'/users', {
        method: 'POST',
        data: JSON.stringify({
          id : this.get('user.id'),
          userId : this.get('user.userId'),
          firstName : this.get('user.firstName'),
          lastName : this.get('user.lastName'),
          role : this.get('user.roles'),
          locations : this.get('user.locations')
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
