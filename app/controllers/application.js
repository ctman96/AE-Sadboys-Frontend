import Ember from 'ember';

export default Ember.Controller.extend({
  needs: 'application',
  session: Ember.inject.service('session'),
  currentUser: Ember.inject.service('current-user'),

  isHomeActive: function() {
    if (this.get('controllers.application.currentPath') === 'home'){
      return 'active';
    }
  }.property('controllers.application.currentPath'),

  isProjectsActive: function() {
    if (this.get('controllers.application.currentPath') === 'config'){
      return 'active';
    }
  }.property('controllers.application.currentPath'),

  isSignUpActive: function() {
    if (this.get('controllers.application.currentPath') === 'sign-up'){
      return 'active';
    }
  }.property('controllers.application.currentPath')
});
