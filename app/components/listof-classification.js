import Ember from 'ember';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  store: Ember.inject.service(),
  edit: false,
  keyword: Ember.computed('classification.keyword', function(){
    return (this.get('classification.keyword') === "T");
  }),
  actions: {
    updateKeyword(selection){
      if(selection){
        this.set('classification.keyword', "T");
      }else{
        this.set('classification.keyword', "F");
      }
    },
    edit(){
      this.toggleProperty('edit');
    },
    delete(){
      var store = this.get('store');
      this.get('ajax').request(store.adapterFor('application').host+'/classifications/'+this.get('classification.id'), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(jsonapirequest =>{
        this.attrs.refreshRoute()
      })
    },
    update(){
      var store = this.get('store');
      this.get('ajax').request(store.adapterFor('application').host+'/classifications', {
        method: 'POST',
        data: JSON.stringify({
          id: this.get('classification.id'),
          name: this.get('classification.name'),
          keyword: this.get('classification.keyword')
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(jsonapirequest =>{
        this.attrs.refreshRoute()
      })
    }
  }
});
