import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  // only admins can write a post
  canWrite: Ember.computed('user.isAdmin', function() {
    return this.get('user.isAdmin');
  })
});
