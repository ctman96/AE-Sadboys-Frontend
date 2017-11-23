import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: Ember.inject.service(),

  // only admins can write a post
  canWrite: Ember.computed('user.admin', function() {
    return this.get('user.admin');
  })
});
