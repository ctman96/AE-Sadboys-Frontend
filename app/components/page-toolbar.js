import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  ajax: Ember.inject.service(),
  router: Ember.inject.service('-routing'),

  actions: {
    authenticate: function(){
      let curUser =  this.get('ajax').request(this.store.adapterFor('application').host+'/users/currentuser');
      this.get('session').authenticate('authenticator:custom', curUser);
      this.get('session').set('data.user', curUser);
      this.get('router').transitionTo('home');
    },
    invalidate: function(){
      this.get('session').invalidate();
      this.get('router').transitionTo('home');
    }
  }
});
