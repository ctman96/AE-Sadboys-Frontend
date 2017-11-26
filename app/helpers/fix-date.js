import Ember from 'ember';

export default Ember.Helper.helper(function([time]) {
  time += '';
  return time.substring(0,10);
});
